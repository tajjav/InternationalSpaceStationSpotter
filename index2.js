const {nextISSTimesForMyLocation, printPassTimes} = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.error("It didn't work: ", error.message);
  });
  

