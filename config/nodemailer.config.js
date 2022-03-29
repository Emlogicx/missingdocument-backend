const nodemailer = require("nodemailer");
const config = require("./auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});


module.exports.sendNewDocumentEmail = (type, maillist) => {
    console.log("Check");
    transport
      .sendMail({
        from: user,
        to: maillist,
        subject: `New ${type} has been found`,
        html: `
          <h1>Hello</h1>
          <p>Please head over to our website by clicking the link below to check if the documment belongs to you thanks.</p>
          <a href="https://www.missingdocument.cm/">https://www.missingdocument.cm/</a>
          </div>`,
      })
      .catch((err) => {
        console.log("There was an error sending email");
        console.log(err);
      });
};


module.exports.sendClaimEmail = (claimData) => {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: "awadonalcien12@gmail.com",
      subject: `New claim request has been submited`,
      html: `
        <h1>Hello Admin</h1>
        <p>A new claim request has been submited on your website by <br/> Name: ${claimData.claimerName} <br/>           Phone: ${claimData.claimerPhone} <br/> and this document was found by <br/> Founder Name: ${claimData.founderName} <br/> Founder Phone: ${claimData.founderPhone} </p>
        <a href="https://www.missingdocument.cm/">https://www.missingdocument.cm/</a>
        </div>`,
    })
    .catch((err) => {
      console.log("There was an error sending email");
      console.log(err);
    });
};
