const axios = require("axios");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");
const yargs = require("yargs");

const address = process.argv[2];
if (!address) {
  console.log("PLease provide address");
} else {
  geoCode(process.argv[2], (error, {latitude,longitude}={}) => {
    if (error) {
      return console.log(error);
    }
    forecast(latitude,longitude, (error, forecastData) => {
      if (error) {
        console.log(error);
      } else {
        console.log(forecastData);
      }
    });
  });
}

// yargs.command({
//     command:"location",
//     describe:"Gives weather data of the location",
//     builder:{
//         location:{
//             describe:"Weather location",
//             demandOption:true,
//             type:"string"
//         }
//     },
//     handler:(argv)=>{
//         geoCode
//     }

// })

// axios.get('http://api.weatherstack.com/current?access_key=87c647205912c1ebc5d905eaadcb2540&query=37.8267,-122.4233&units=f')
// .then((res)=>{
//     if(res.data.error){
//         console.log("Please provide valid location details")
//     }else{
//         let weatherData=res.data.current;
//         console.log("It is "+weatherData.temperature+" degree celcius and feels like "+weatherData.feelslike+" degree celcius")
//     }
// })
// .catch((error)=>{

//     console.error("Unable to reach weather services")
// })

// axios.get('http://api.positionstack.com/v1/forward?access_key=8ce590ec778bd735b5525fc75689215d&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC&limit=1')
// .then((res)=>{
//  //   console.log(res.data.data[0].longitude)
//  if(res.data.error){
//     console.log("Please provide valid location details")
// }else{
//     console.log("Latitude is "+res.data.data[0].latitude+" Longitude is"+res.data.data[0].longitude)
// }
// })
// .catch((err)=>{
//     if(err.response){
//         console.log("Please provide valid location details")
//     }else{
//         console.log("Unable to reach location services")
//     }

// })
