const celciusToFahreneit=(temp)=>{
    return (temp*1.8)+32;
}

const add=(a,b)=>new Promise((resolve,reject)=>{
    setTimeout(()=>{
        if(a<0||b<0){
            return reject("Numbers must be positive")
        }
        resolve(a+b)
    },2000)
})

module.exports={celciusToFahreneit,add}