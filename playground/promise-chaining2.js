require('../task-manager/src/db/mongoose.js')
const Task=require('../task-manager/src/models/task')

// Task.findByIdAndDelete('63a939c4ee1e5bfad5bc2fe9')
// .then((response)=>{
//     console.log(response)
//     return Task.countDocuments({completed:false})
// })
// .then((countIncomplete)=>console.log(countIncomplete))
// .catch((err)=>console.log(err))

const deleteAndCoutIncomplete=async(id,completed)=>{
    const task=await Task.findByIdAndDelete(id);
    const countIncomplete=await Task.countDocuments({completed})
    return countIncomplete;
}

deleteAndCoutIncomplete('63a99c4760a04e0e22c1247f',false)
.then((count)=>console.log(count))
.catch((err)=>console.log(err))