const request = require("request");

/**
 * fetchMyIP function definition
 * @param {Function} callback
 */
const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (err,response,body) => {
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
      callback("IP not found",null);
    } else {
    callback(null,ip);
    }
    
  });
  
}




/**
 * fetchCoordsByIP function definition
 * @param {string} ip 
 * @param {Function} callback 
 */
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.i/${ip}`, (err,response,body) => {
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
    const latlongObj = {lat,long};
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    } else {
      callback(null,latlongObj)
    }    
  });
}

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};