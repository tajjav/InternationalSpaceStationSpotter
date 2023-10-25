const request = require("request");
/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error,null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error,null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error,null);
        }
        callback(null, nextPasses);
      });
    });
  });
}





/**
 * fetchMyIP function definition
 * @param {Function} callback
 */
const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const ip = data.ip;
    // if no ip then throw error
    if (JSON.stringify(data) === "{}") {
      callback("IP not found", null);
    } else {
      callback(null, ip);
    }

  });

}




/**
 * fetchCoordsByIP function definition
 * @param {string} ip 
 * @param {Function} callback 
 */
const fetchCoordsByIP = function (ip, callback) {
  request(`http://ipwho.is/${ip}`, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const lat = data.latitude;
    const long = data.longitude;
    const latlongObj = { lat, long };
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    } else {
      callback(null, latlongObj)
    }
  });
}

/**
 * fetchISSFlyOverTimes function definition
 * @param {Object} coord 
 * @param {Function} callback 
 */
const fetchISSFlyOverTimes = function (coord, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coord.lat}&lon=${coord.long}`, (err, response, JSONbody) => {
    if (err) {
      callback(err, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover pass. Response: ${JSONbody}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(JSONbody);
    const flyOverData = data.response;
    if (data.message !== 'success') {
      const output = `Server message says: ${data.message}, when fetching ISS fly over times for lat${latitude} long${longitude}.`;
      callback(Error(output), null);
      return;
    } else {
      callback(null, flyOverData);
    }
  });

}

module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};