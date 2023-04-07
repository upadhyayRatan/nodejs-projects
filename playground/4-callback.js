const geoCode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0,
    };
    callback(data);
  }, 2000);
};

geoCode("India", (data) => {
  console.log(data);
});

const add=(a,b,callback)=>{
    setTimeout(()=>{
        let sum=a+b;
        callback(sum)
    },2000)
}

add(2,3,(sum)=>{
    console.log("Sum is ",sum)
})