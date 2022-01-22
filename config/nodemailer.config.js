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
    transport.sendMail({
      from: user,
      to: maillist,
      subject: `New ${type} has been found`,
      html: `
          <h1>Hello</h1>
          <p>Please head over to our website by clicking the link below to check if the documment belongs to you thanks.</p>
          <a href=http://localhost:8070"> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};
