// import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { hashPassword } from '../helpers/authHelper.js';

export const registerUser = async (req, res) => {
    try{
        const {email, password} =req.body;

        // Check if user with the email exists already
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'Email already exists'});
        }

        // Hash the password 
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const newUser = new User({email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({success: true, message: 'User registered successfully', newUser})
    }
    catch (error) {
        console.log('Error creating user', error);
        res.status(500).json({message: 'Error creating user'})
    }
};