import jwt from 'jsonwebtoken';
import { catchAsyncError } from './catchAsyncError.js';
import errorHandler from './errorMiddleware.js';
import database from '../database/db.js';

export const isAuthenticated = catchAsyncError(async(req, res, next) => {
    const { token } = req.cookies;
    if(!token) {
        return next(new errorHandler(401, "Please login to access this resource"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await database.query(`SELECT * FROM users WHERE id = $1 LIMIT 1`, [decoded.id]);
    if(user.rows.length === 0) {
        return next(new errorHandler(401, "User not found, please login again"));
    }
    req.user = user.rows[0];
    next();
});


export const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new errorHandler(403, `Role: ${req.user.role} is not allowed to access this resource`));
        }
        next();
    }
}