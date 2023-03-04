const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

require('dotenv').config;
const isAdminAuthentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please login!' });
  }
  const userToken = req.headers.authorization.split(' ')[1];
  jwt.verify(userToken, process.env.KEY, async function (err, decoded) {
    if (err) {
      return res.status(401).send('Please login again');
    }

    const userDetails = await UserModel.findOne({ email: decoded.email });
    if (userDetails.is_admin) {
      req.body.email = decoded.email;
      req.body.password = decoded.password;

      next();
    } else {
      return res
        .status(401)
        .send({ message: 'You are not authorized to post content' });
    }
  });
};

module.exports = isAdminAuthentication;
