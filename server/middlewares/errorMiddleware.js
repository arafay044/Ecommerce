class ErrorHandler extends Error {
    constructor(statusCode, message ) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.code === '11000') {
        const message = "Duplicate field value entered";
        err = new ErrorHandler(400, message);
    }

    if(err.name === 'JsonWebTokenError') {
        const message = "JSON Web Token is invalid, try again";
        err = new ErrorHandler(400, message);
    }

    if(err.name === 'TokenExpiredError') {
        const message = "JSON Web Token is expired, try again";
        err = new ErrorHandler(400, message);
    }

    // ✅ FIXED LINE
    const errorMessage = err.errors
        ? Object.values(err.errors).map(error => error.message).join(" ")
        : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    });
};

export default ErrorHandler;
