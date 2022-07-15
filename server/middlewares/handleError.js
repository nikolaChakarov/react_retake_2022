const handleError = (err, req, res, next) => {
    const errStatus = err.status || 500;
    const message = err.message || "Server Error";

    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message,
        stack: err.stack,
    });
};

module.exports = handleError;
