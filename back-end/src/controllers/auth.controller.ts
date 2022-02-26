import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const validateToken = (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({
        message: 'Token(s) validated'
    });
};

async function signUp(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        let user = await UserModel.findOne({ username });
        if (user) {
            return res.status(400).send("User Already exists");
        }
        const salt = await bcrypt.genSalt(10);
        user = new UserModel({
            username,
            password,
        });
        user.password = await bcrypt.hash(password, salt);
        const newUser = await user.save();
        return res.status(201).send(newUser);
    } catch (err: any) {
        return res.status(500).send({
            message: err.message,
            error: err
        });
    }
}

async function signIn(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOneAndUpdate({ username }, { new: true });
        if (!user) {
            return res.status(400).send("User Not Found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid Password");
        }

        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        }
        jwt.sign(payload, "" + process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).send({
                    message: err.message,
                    error: err
                });
            }
            return res.status(200).send({ token, payload });
        });
    } catch (err: any) {
        return res.status(500).send({
            message: err.message,
            error: err
        });
    }
}


export default {
    signUp,
    signIn,
    validateToken
}
