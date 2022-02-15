const User = require("../model/admin_model");
const Users = require("../model/users_model");

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).json({
        error: "Login failed! Check authentication credentials",
      });
    }
    const token = await user.generateAuthToken();

    res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      err: err,
    });
  }
};

exports.deleteDocument = async (req, res) => {
  Users.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user Not Found with id" + req.params.id,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((er) => {
      return res.status(500).send({
        message: "Could Not Delete A User",
      });
    });
};
