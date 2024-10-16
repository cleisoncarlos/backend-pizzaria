import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import  jwt from 'jsonwebtoken';

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });
  return user;
};

const authenticateUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
    return token;
  }
  throw new Error('Invalid credentials');
};

export  { createUser, authenticateUser };
