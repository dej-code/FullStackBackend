const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      error: {
        message: err.message || 'Something went wrong on the server',
      },
    });
  };
  
  module.exports = errorHandler;
  