export function checkAuthAdmin (req, res, next) {
  if (!req.cookies.adminToken) {
    return res.status(401).json({ msg: "not authorized" });
  }

  next();
};
