

module.exports = (req, res, next) => {
//const isNurse = (req, res, next) => {
    if (req.user.role !== 'nurse') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
  };