const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const nodeConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'xavier.batz@ethereal.email',
        pass: 'sMEedShSWt1F11QcFv'
    }
};

const transporter = nodemailer.createTransport(nodeConfig);

const Mailgenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js"
    }
});

const registerMail = async (req, res) => {
    try {
        const { username, userEmail, text, subject } = req.body;

        const email = {
            body: {
                name: username,
                intro: text || "Hey, welcome!",
                outro: "Need help? Reach out to us."
            }
        };

        const emailBody = Mailgenerator.generate(email);

        const message = {
            from: process.env.Username,
            to: userEmail,
            subject: subject || "Signup Successful",
            html: emailBody
        };

        await transporter.sendMail(message);
        return res.status(200).send({ msg: "You should receive an email from us" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Failed to send email" });
    }
};

module.exports = registerMail;
