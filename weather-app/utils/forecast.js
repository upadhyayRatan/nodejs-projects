const axios = require("axios");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=87c647205912c1ebc5d905eaadcb2540&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
    console.log(url);
  axios
    .get(url)
    .then(({data}) => {
      if (data.error) {
        callback("Please provide valid location details", undefined);
      } else {
        let weatherData = data.current;
        callback(
          undefined,
          "It is " +
            weatherData.temperature +
            " degree celcius and feels like " +
            weatherData.feelslike +
            " degree celcius"
        );
      }
    })
    .catch((error) => {
      callback("Unable to reach weather services", undefined);
    });
};

module.exports=forecast;