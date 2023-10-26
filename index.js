const { /*fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes,*/ nextISSTimesForMyLocation, printPassTimes } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.error("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });


// let exampleIP = '68.145.56.148';
// fetchCoordsByIP(exampleIP, (error, coordinates) => {
//   if (error) {
//     console.error("Coord fetch error! ", error);
//     return;
//   }
//   console.log("Coord fetched successfully! ", coordinates);
// });


// let exampleCoord = {lat: 51.105690, long: -113.926012 };
// fetchISSFlyOverTimes(exampleCoord, (error, flyOverDetails) => {
//   if (error) {
//     console.error("ISSFlyOverFetch error: ", error);
//     return;
//   }

//   console.log("ISSFlyOverDetails: ", flyOverDetails);

// })