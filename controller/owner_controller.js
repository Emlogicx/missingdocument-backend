const Owners = require("../model/owner_model");


// this method is to create a new Owner
exports.create = (req, res) => {
  console.log(req.body);
    const owners = new Owners({
      email: req.body.email,
      name: req.body.name,
      location: req.body.location,
      // isActive: req.body.isActive,
      type: req.body.type,
    });
  
  
    owners.save().then((data) => {
      res.send(data);
    }).catch((er) => {
      console.log(er)
      res.status(500).send({
  
        message: "Some Errors While Creating This Owner"
      })
    })
  }

//   Fine All Owners

  exports.findAllOwner = async (req, res) => {
      Owners.find()
        .sort({ updatedAt: -1 })
        .then((user) => {
          res.status(200).send(user)
        })
        .catch((er) => {
          res.status(500).send({
            message: er.message || "Error Occured"
          })
      })
  }