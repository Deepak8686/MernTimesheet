const register = require('../models/RegisterModel');
const nodemailer = require('nodemailer');
const Verification = require('../models/VerificationModal');
require('dotenv').config();
const twilio = require('twilio');
var springedge = require('springedge');
const fast2sms = require('fast-two-sms');

const mail_subject_verify = "OTP: For Email Verification";
const message_subject_verify = (otp) => {
    return (`Dear User, <br/>`
        + 'OTP for your email verification is : <br/><br/>'
        + `<b>${otp} </b><br/><br/>`
        + 'This is a auto-generated email. Please do not reply to this email.<br/>'
        + 'Regards<br/>'
        + 'Login Team'
    );
};
const mail_subject_changepassword = "OTP : For Change Password";
const message_subject_changepassword = (otp) => {
    return (
        `Dear User, <br/>`
        + 'OTP for your change password is : <br/><br/>'
        + `<b>${otp} </b><br/><br/>`
        + 'This is a auto-generated email. Please do not reply to this email.<br/>'
        + 'Regards<br/>'
        + 'Login Team'
    )
}

const MailVerification = async (req, res) => {

    try {
        const { Email_Id, type } = req.body;
        const existingUser = await register.findOne({ Email_Id });

        if (existingUser && type == "VERIFICATION") return res.status(400).json({ error: "User already registered" });
        if (type != "VERIFICATION" && !existingUser) return res.status(400).json({ error: "User not exists" });

        let email_Subject, email_Message;
        const otp = Math.floor(100000 + Math.random() * 900000);
        if (type == "VERIFICATION") {
            email_Message = message_subject_verify(otp);
            email_Subject = mail_subject_verify;
        } else if (type == "CHANGE_PASSWORD") {
            email_Message = message_subject_changepassword(otp);
            email_Subject = mail_subject_changepassword;
        }
        else return response.status(400).send({ error: "Unknown Error" });

        let transport = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASSWORD
            }
        });

        let mailOption = {
            from: process.env.USER_MAIL,
            to: `${Email_Id}`,
            subject: email_Subject,
            html: `<p>${email_Message}</p>`
        };

        transport.verify();
        transport.sendMail(mailOption)


        const exists = await Verification.findOne({ id: Email_Id });
        if (exists) {
            const existingEmail = await Verification.findOneAndUpdate({ id: Email_Id }, { otp, expiredAt: Date.now() });
            return res.status(200).json({ status: 'upadated' });
        } else if (!exists) {
            const data = await Verification.create({ id: Email_Id, otp, expiredAt: Date.now() });
            return res.status(200).json({ status: 'created' });
        } else {
            return res.status(400).json({ error: "otp not send" });
        }

    }
    catch (error) {
        return res.status(400).json({ error: "Network Error" });
    }
}

const PhoneVerification = async (req, res) => {

    try {
        // const accountSid = ACcde657f0a69f4371687389a8c315f0fc
        // const authToken = c9156985f826c6e5a3821d906a798d35
        // const client = new twilio(accountSid, authToken);

        // await client.messages
        //     .create({
        //         body: 'Hello from Node',
        //         to: '+918825724239',
        //         from: '+17817981840'
        //     })
        //     .then((message) => {
        //         res.status(200).json({ message: "success" })
        //     })

        //     .catch((error) => console.log("Error Occured"));

        var options = {
            authorization:
                "mKw7Y2S1IiuBzJFjTfp9FFAaRTMHH2MUElmVPulfWIhXQXoRwTLfjtlG0vuH",
            message: 'this is otp for your verfication, otp: 568923',
            numbers: ["+918825724239"],
        };

        // fast2sms.verify();
        fast2sms.sendMessage(options)
            .then((response) => {
                res.status(200).json({ success: "SMS OTP Code Sent Successfully" })
            })
            .catch((error) => {
                res.status(400).json({ error: "Some error taken place" })
            });

        // springedge.messages.send(params, 6000, function (err, response) {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     console.log(response);
        // });
    } catch (error) {
        return res.status(400).json({ error: "Network Error" });
    }

}

const VerifyOtp = async (req, res) => {
    try {
        const { id, otp } = req.body;

        const existEmail = await Verification.findOne({ id, otp });

        if (!existEmail) return res.status(400).json({ error: "Validaton time out" });

        return res.status(200).json({ success: "Verified" });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

module.exports = {
    MailVerification,
    PhoneVerification,
    VerifyOtp
}