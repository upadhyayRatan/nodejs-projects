const mongoose = require("mongoose");
try {
  const mongo=process.env.DATABASE_URL;
  mongoose.connect(process.env.DATABASE_URL, async (error, client) => {
    if (error) {
      return console.log("Unable to connect to DB!");
    }
  });
} catch (error) {
  handleError(error);
}

// const Task=mongoose.model('task',{
//     description:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     completed:{
//         default:false,
//         type:Boolean
//     }
// })

// const task=new Task({
//     description:"Add numbers",
//     completed:false
// })

//task.save().then((task)=>console.log(task)).catch((err)=>console.log("Error",err));
