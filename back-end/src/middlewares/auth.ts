import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

//extract JWT
const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).send("no token , authorization denied");
        }
        jwt.verify(token, "" + process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send("invalid token");
            }
            req.body.decoded = decoded;
            next();
        });


    } catch (err: any) {
        return res.status(401).send({
            message: err.message,
            error: err
        });
    }

};

export default auth;