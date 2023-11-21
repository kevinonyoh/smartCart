import logger from "../utils/logger.js";

function error( err, req, res, next ){
    const {statusCode, message = "internal server Error"} = err
    res.status(statusCode || 500).json({
        code: statusCode ? '00001' : '00002',
        error: true,
        message
    });
    logger.error('Error Occurred:', {
        statusCode,
        code: statusCode ? '00001' : '00002',
        error: true,
        message
    });
}

export default error;