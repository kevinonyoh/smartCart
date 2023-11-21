import logger from "../utils/logger.js";

 function logs(req, res, next) { 
	logger.info('Requests Information', {
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body
    })
	next();
}

export default logs;
