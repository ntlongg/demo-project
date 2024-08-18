const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
        error: true,
        success: false,
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      req.userId = decoded._id;
      next();
    } catch (err) {
      console.error(err); // Log lỗi cho mục đích debug
      return res.status(401).json({
        message: 'Invalid or expired token',
        error: true,
        success: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
