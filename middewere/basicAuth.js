const User = require("../models/user");
exports.basicAuth = async (req, res, next) => {
  try {
    //const id = req.params.id;
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(403).json("You need sign in!");
    }
    const role = user.role;
    console.log(role);
    if (role !== "admin") {
      return res.status(401).json("You dont have permission");
    }
    console.log("ok");
    next();
  } catch (err) {
    next(err);
  }
};
