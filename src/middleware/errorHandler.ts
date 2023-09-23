import { ErrorRequestHandler } from 'express';
import { CustomAPIError } from '../errors';
import { StatusCodes } from 'http-status-codes';

type ErrorType = object & { message?: string; code?: number };

const errorHandler: ErrorRequestHandler = function (
    err: ErrorType,
    req,
    res,
    _next,
) {
    if (err instanceof CustomAPIError) {
        res.status(err.statusCode).json({ msg: err.message });
        return;
    }

    console.log(err.message);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: 'Something Went Wrong',
    });
};

export default errorHandler;
