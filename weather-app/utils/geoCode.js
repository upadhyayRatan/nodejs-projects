const axios=require('axios')
const geoCode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=8ce590ec778bd735b5525fc75689215d&query=" +
    encodeURIComponent(address) +
    "&limit=1";
  console.log("URl is", url);
  axios
    .get(url)
    .then(({data}) => {
      //   console.log(res.data.data[0].longitude)
      if (data.error) {
        callback("Please provide valid location details", undefined);
      } else {
        callback(undefined, {
          latitude: data.data[0].latitude,
          longitude: data.data[0].longitude,
        });
      }
    })
    .catch((err) => {
      callback("Unable to reach location services", undefined);
    });
};
module.exports=geoCode;