import logger from "./logger.js";

function responseHandler( res, data, message ){
    if( !data ){
        logger.info( 'Response Payload', {
            code: 1007,
            success: true,
            message
        } );
        return res.json({
            success: true,
            message
        });
    }
    
    logger.info( 'Response Payload', {
        data,
        count: data.length,
        code: 1007,
        success: true,
        message
    } );

    res.json({
        data,
        success: true,
        message
    });
}

export default responseHandler;