const asyncHandler = require("../middlewares/async");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return res.status(401).json({
      success: false,
      message: "Not authorize to access to this route ... !",
    });
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorize to access to this route ... !",
    });
  }
  next();
});
