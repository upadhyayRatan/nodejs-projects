require('../task-manager/src/db/mongoose.js')
const User=require('../task-manager/src/models/users')

// User.findByIdAndUpdate('63a52b6913f17c5fd75d7ac4',{age:26})
// .then((response)=>{
//     console.log(response)
//     return User.countDocuments({age:26})
// })
// .then((countAges)=>console.log(countAges))
// .catch((err)=>console.log(err))

const updateAgeAndCount=async(id,age)=>{
    const user=await User.findByIdAndUpdate(id,{age});
    const count =await User.countDocuments({age});
    return count;
}

updateAgeAndCount('63a52b6913f17c5fd75d7ac4',25)
.then((count)=>console.log(count))
.catch((err)=>console.log(err))