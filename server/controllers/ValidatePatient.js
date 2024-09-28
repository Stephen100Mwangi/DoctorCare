import Patient from '../models/Patient.js';
import bcrypt from 'bcrypt';

const loginUser = async (req, res) => {
  const {email, password} = req.body;
  if (!email) {
    return res.status (400).json ({message: 'You must provide an email'});
  }
  if (!password) {
    return res.status (400).json ({message: 'You must provide a password'});
  }

  const userExists = await Patient.findOne ({email});
  if (!userExists) {
    return res.status (400).json ({message: 'User does not exist'});
  }

  const passwordMatch = await bcrypt.compare (password, userExists.password);

  if (!passwordMatch) {
    return res.status (400).json ({message: 'Invalid email OR password'});
  }

  return res.status (200).json ({
    message: 'User log in successful',
    user: {
      id: userExists._id,
      username: userExists.username,
      email: userExists.email,
    },
  });
};

export default loginUser;
