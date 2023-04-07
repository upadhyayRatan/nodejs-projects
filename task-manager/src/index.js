const app= require('./app')

const port = process.env.PORT ;

app.listen(port, () => {
  console.log("Server is up on port", port);
});

// const test=async()=>{
//   const task=await Task.findById('63c00a2ebcf908a90479eb96')
//   await task.populate([{path:'owner'}])
//   console.log(task.owner);
//   const user=await User.findById('63c0097fdea444fd4de4ab85')
//   await user.populate('tasks')
//   console.log("User",user.tasks);
// }
// test()
