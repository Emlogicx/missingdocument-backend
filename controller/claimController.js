const nodemailer = require("../config/nodemailer.config");

exports.claimDoccument = (req, res) => {
  let claimerName = req.body.claimerName;
  let claimerPhone = req.body.claimerPhone;
  let founderName = req.body.founderName;
  let founderPhone = req.body.founderPhone;
  let claimData = {
    claimerName: claimerName,
    claimerPhone: claimerPhone,
    founderName: founderName,
    founderPhone: founderPhone,
  };
  try {
    // WRITE CODE TO SEND EMAIL TO ADMIN
    nodemailer.sendClaimEmail(claimData);
    return res.status(200).send({ message: "Claim Request Sent Successful" });
  } catch (error) {
    return res.status(400).send({ message: "There was an error" });
  }
};
