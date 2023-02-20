const User = require("../models/user");

exports.register = async (req, res, next) => {
  try {
    const email = req.body.email;
    console.log(req.body);
    User.findOne({ email: email }).then((userDoc) => {
      if (userDoc) {
        return res.status(201).json("false");
      }

      const user = new User(req.body);

      user.save();
      return res.status(200).json(user);
    });
  } catch (err) {
    next(err);
  }
};
exports.singIn = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(201).json("faile");
      }
      if (user.password === password) {
        return res.status(200).json(user);
      }
    });
  } catch (err) {
    next(err);
  }
};
