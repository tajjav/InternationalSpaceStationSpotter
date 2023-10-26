const request = require("request-promise-native");

/* 
 * Input: None
 * Returns: Promise for fly over data for users location
 */
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
          .then(fetchCoordsByIP)
          .then(fetchISSFlyOverTimes)
          .then((body) => {
            const {response} = JSON.parse(body);
            return response;
          });
}

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};


/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`)
};


/**
 * fetchISSFlyOverTimes function definition using promise
 * @param {JSON} body 
 * @returns Promise of request for array of objects with fly over times
 */
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

/** 
 * Input: 
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns: 
 *   undefined
 * Sideffect: 
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
   const datetime = new Date(0);
   datetime.setUTCSeconds(pass.risetime);
   const duration = pass.duration;
   console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
 };
module.exports = { nextISSTimesForMyLocation, printPassTimes };