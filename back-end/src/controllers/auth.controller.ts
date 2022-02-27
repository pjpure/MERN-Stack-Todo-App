import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function validateToken(req: Request, res: Response, next: NextFunction) {
    let user = await UserModel.findById(req.body.decoded.id).exec();
    if (!user) {
        return res.status(400).send("User Not Found");
    }
    user = {
        id: user.id,
        username: user.username
    }
    return res.status(200).send({
        data: user,
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
            id: user.id,
            username: user.username
        }
        jwt.sign(payload, "" + process.env.JWT_SECRET, { expiresIn: '365d' }, (err, token) => {
            if (err) {
                return res.status(500).send({
                    message: err.message,
                    error: err
                });
            }
            return res.status(200).send({ ...payload, token });
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
