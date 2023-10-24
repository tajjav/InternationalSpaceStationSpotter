const { fetchMyIP, fetchCoordsByIP } = require('./iss');

let myIP = fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  return ip;
});


// fetchCoordsByIP('68.145.56.148', (error, coordinates) => {
//   if (error) {
//     console.log("Coord fetch error! ", error);
//     return;
//   }
//   console.log("Coord fetched successfully! ", coordinates);
// });