const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const email = req.body.email;
    const fullname = req.body.fullname;
    const phone = req.body.phone;
    const password = req.body.password;

    User.findOne({ email: email }).then((userDoc) => {
      if (userDoc) {
        return res.status(201).json("false");
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          fullname: fullname,
          phone: phone,
          password: hashedPassword,
        });
        user.save();
      });
      return res.status(200).json("true");
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
        return res.status(201).json("false");
      }
      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          const cookie = req.session;

          const data = { user: user, sesesion: cookie };
          return res.status(200).json(data);
        }
      });
    });
  } catch (err) {
    next(err);
  }
};
exports.postLogout = async (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.json("ok");
  });
};
exports.singInAdmin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log("ok");
    User.findOne({ email: email, role: "admin" }).then((user) => {
      if (!user) {
        return res.status(201).json("false");
      }
      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          return res.status(200).json(user);
        }
      });
    });
  } catch (err) {
    next(err);
  }
};
