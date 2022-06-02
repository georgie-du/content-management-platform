import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const secret = 'test';

export const login = async (req, res) => {
  // console.log(req)
  const { email, password } = req.body;
  try {
    // find user in db
    const currentUser = await User.findOne({ email });
    if (!currentUser) return res.status(404).json({ message: "User doesn't exist!" });
    const isPasswordMatching = await bcrypt.compare(password, currentUser.password);

    if (!isPasswordMatching) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: currentUser.email, id: currentUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: currentUser, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const register = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const currentUser = await User.findOne({ email });

    if (currentUser) return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
}

