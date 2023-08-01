const users = [];

const addUser = ({ id, username, room }) => {
  //clean the data
  username = username.trim().toLowerCase();
  console.log(typeof room)
  room = room.trim().toLowerCase();

  //validate the data
  if (!username || !room) {
    return {
      error: "Username or room is required",
    };
  }

  //check for existing user]
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  if (existingUser) {
    return {
      error: "User already exists!",
    };
  }
  //store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => {
    return user.id === id;
  });
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id)=>{
    const user = users.find((user)=>user.id===id);
    return user;
}

const getUsersInRoom= (room)=>{
    const rooms = users.filter((user)=>{
        return user.room === room 
    });
    return rooms;
}


module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
