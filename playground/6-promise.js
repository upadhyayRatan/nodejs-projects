
// const doWorkPromise= new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve([1,2,3])
//         reject("got Error ")
//     },2000)
// })

// doWorkPromise.then((res)=>{console.log(res)}).catch((err)=>console.log(err))
// console.log(doWorkPromise)

const add=(a,b)=>new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(a+b)
    },2000)
})

//nested promise
add(1,2)
.then((sum)=>{
    add(sum,2)
    .then((sum)=>console.log(sum))
    .catch((err)=>console.log(err))  
})
.catch((err)=>console.log(err))

//promise chaining solves nested problem

add(1,2)
.then((sum)=>{
    return add(sum,3)
})
.then((sum)=>{
    console.log(sum)
})
.catch((err)=>console.log(err))