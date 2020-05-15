const users = [];

const addUser = ({ id, create, name, room, pass }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if(!name || !room || !pass) return { error: 'All fields are required !!' };

  var usersInRoom = getUsersInRoom(room);

  if(create.localeCompare('false')) { // if create == true
    if(usersInRoom.length) {
      return { error: 'Room ' + room + ' already exists !!' }; 
    }
  }
  else { // if create == false
    if(!usersInRoom.length) {
      return { error: 'Room ' + room + ' dosent exist !!' }; 
    }
  }

  const existingUser = users.find((user) => user.room === room && user.name === name);
  if(existingUser) return { error: 'Username is taken !!' };

  if(usersInRoom.length) {
    if(usersInRoom[0].pass !== pass) return { error : 'Incorrect Password !!'}; 
  }

  const user = { id, name, room, pass };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };