// backend/mockDb.js
const mockUsers = [
  { username: 'Taylien', password: 'password123', phone: '1234567890', dob: '2000-01-01' },
  { username: 'Caedrel', password: 'password123', phone: 'password123', dob: '2000-01-01' },
  { username: 'shroud', password: 'password123', phone: 'password123', dob: '2000-01-01' }
];

module.exports = {
  getUsers: () => mockUsers,
  addUser: (user) => {
    mockUsers.push(user);
    return user;
  },
  findUser: (username) => mockUsers.find(u => u.username.toLowerCase() === username.toLowerCase())
};
