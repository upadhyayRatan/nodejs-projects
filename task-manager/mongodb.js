const { MongoClient, ObjectId } = require("mongodb");
//const MongoClient = mongodb.MongoClient;
const connectionUrl = "mongodb://localhost:27017";
const dataBaseName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  async (error, client) => {
    if (error) {
      return console.log("Unable to connect to DB!");
    }
    const db = client.db(dataBaseName);
 
  }
)

 //   const updatePromise = db.collection("userCollection").updateOne(
  //     { _id: new ObjectId("63a342f279615ff2df47b41a") },
  //     {
  //       $set: {
  //         name: "Ram",
  //         age: 26,
  //       },
  //     }
  //   );
  //   updatePromise.then((res)=>console.log(res)).catch((err)=>console.log(err))
  // },
  // db.collection('taskCollection').updateMany(
  //   {
  //   completed:"false"
  // },{
  //   $set:{
  //     completed:"true"
  //   }
  // })
  // .then(res=>console.log(res))
  // .catch(err=>console.log(err))
  // db.collection('taskCollection').deleteOne({
  //   description:'Add number'
  // })
  // .then(res=>console.log(res))
  // .catch(err=>console.log(err))

// console.log(await db.collection('userCollection').findOne({name:"Ratan"}))
//     const inCompleteTask=await db.collection("taskCollection").find({description: "remove number",completed: "false"}).toArray();
//     console.log(inCompleteTask)

// const objectId=new ObjectId();
// console.log(objectId.id)
// console.log(objectId.getTimestamp());

// db.collection("userCollection").insertOne(
//   {
//     name: "Ratan",
//     age: "24",
//   },
//   (error, result) => {
//     if (error) {
//       return console.log("Unable to onsert user");
//     }
//     console.log(result.insertedId);
//   }
// );
// console.log("Coonnected to DB");
// const insertTask = await db.collection("taskCollection").insertMany([
//   { description: "Add number", completed: "true" },
//   { description: "remove number", completed: "false" },
// ]);
// console.log("Tasks", insertTask);
