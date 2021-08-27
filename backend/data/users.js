import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin_Anudeep',
    email: 'admin@cube-kart.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Niteesh',
    email: 'niteesh@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jaswanth',
    email: 'jaswanth@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
