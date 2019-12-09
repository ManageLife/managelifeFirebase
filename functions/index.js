const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const cors = require("cors")({
  origin: true
});

exports.emailMessage = functions.https.onRequest((req, res) => {
  const {
    email,
    username,
    phoneNumber,
    property,
    item,
    address,
    room,
    time,
    description
  } = req.body;
  return cors(req, res, () => {
    var text = `
        <div>
        <h3>New Service Request</h4>
            <h4>
                User Info:
            </h4>
            <ul>
                <li>
                    <p><b>Name - </b>${username}</p>
                </li>
                <li>
                  <p><b>Phone Number - </b>${phoneNumber}</p>
                </li>
                <li>
                    <p><b>Email - </b>${email}</p>
                </li>
                <li>
                    <p><b>Address - </b>${address}</p>
                </li>
            </ul>
            <br/>
            <h4>
                Request Info:
            </h4>
            <ul>
                <li>
                    <p><b>Item - </b>${item}</p>
                </li>
                <li>
                    <p><b>Property - </b>${property}</p>
                </li>
                <li>
                    <p><b>Room - </b>${room}</p>
                </li>
                <li>
                    <p><b>Request Description - </b>${description}</p>
                </li>
                <li>
                    <p><b>Preferred Time - </b>${time}</p>
                </li>
            </ul>
        </div>
    `;

    var sesAccessKey = "managelifedev@gmail.com";
    var sesSecretKey = "M@nageL1fe2019";

    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        auth: {
          user: sesAccessKey,
          pass: sesSecretKey
        }
      })
    );
    const mailOptions = {
      to: sesAccessKey,
      from: email,
      subject: `ManageLife Service Request - ${property} - ${address}`,
      text: text,
      html: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error.message);
      } else {
        res.status(200).send({
          message: "success"
        });
      }
    });
  });
});
