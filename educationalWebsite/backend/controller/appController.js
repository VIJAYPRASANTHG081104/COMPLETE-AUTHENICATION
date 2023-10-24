const Usermodel = require('../dataBase/models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');

const register = async (req, res) => {
    try {
        const { username, password, profile, email } = req.body;

        const existingUsername = await Usermodel.findOne({ username });
        const existingEmail = await Usermodel.findOne({ email });

        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new Usermodel({
            username: username,
            password: hashedPassword,
            profile: profile || ' ',
            email: email
        });

        await user.save();

        res.status(200).json({ msg: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const verifyUser = async (req, res, next) => {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;
        console.log(req.query)

        const exist = await Usermodel.findOne({ username })
        console.log(exist)
        if (!exist) return res.status(404).send({ error: "Can't find the user" })
        next()

    } catch (error) {
        return res.status(404).send({ error: "Auth error" })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Usermodel.findOne({ username })
        if (user) {
            const bpassword = await bcrypt.compare(password, user.password)
            if (!bpassword) {
                return res.status(500).send({ error: "Enter the password" })
            }
            else {
                const token = jwt.sign({
                    userId: user._id,
                    username: user.username,
                }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
                return res.status(200).send({
                    msg: "Login successfull",
                    username: user.username,
                    token
                })
            }
        }
        else {
            return res.status(500).send({ error: "Pasword does not match" })
        }
    } catch (error) {
        res.status(500).send({ error: "login failed" })
    }
}



//http://localhost:5000/api/user/example123
const getUser = async (req, res) => {
    const { username } = req.params;
    try {
        if (!username) return res.status(400).send({ error: "Invalid user" })
        const userExist = await Usermodel.findOne({ username })
        if (userExist) {
            const { password, ...rest } = userExist._doc
            return res.status(200).send(rest)
        }
        else {
            res.status(404).send({ err: "Can't find the user" })
        }

    } catch (error) {
        return res.status(404).send({ error: "Cannot find the user Data" })
    }
}

const updateUser = async (req, res) => {
    try {
        const { userId } = req.user;
        if (userId) {
            const body = req.body;
            const updateUser = await Usermodel.updateOne({ _id: userId }, body)
            if (updateUser) {
                return res.status(201).send({ mag: "Updated successfully" })
            }
            else {
                return res.status(401).send({ error: "Not updated " })
            }
        }
        else {
            return res.status(401).send({ error: "User not found" })
        }
    } catch (error) {
        res.status(402).send({ error })
    }
}

const generateOTP = async (req, res) => {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({ code: req.app.locals.OTP })
}

const verifyOTP = async (req, res) => {
    const { code } = req.query
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true
        return res.status(201).send({ msg: "Verify Successfully" })
    }
    else {
        return res.status(400).send({ error: "InvalidOTP" })
    }
}

const createResetSession = async (req, res) => {
    if (req.app.locals.resetSession) {
        return res.status(201).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).send({ error: "Session Expired" })
}

const resetPassword = async (req, res) => {
    console.log(req.body)
    try {
        // if(!req.app.locals.resetSession)return res.status(440).send({error:"Session expired"})
        const { username, password } = req.body;
        console.log(username)
        console.log(bcrypt.hash(password, 10))

        try {
            Usermodel.findOne({ username })
                .then(user => {
                    const hashedPassword = bcrypt.hash(password, 10)
                    if (hashedPassword) {
                        const userpassupdate = Usermodel.updateOne({ username: username }, { password: hashedPassword })
                        if (userpassupdate) {
                            req.app.locals.resetSession = false
                            return res.status(200).send({ msg: "Password updated successfully!" })
                        }
                        else {
                            return res.status(401).send("Can't find the username")
                        }
                    }
                    else{
                        return res.status(500).send({
                            error: "Enable to hashed password"
                        })
                    }
        })
    } catch (error) {
        // return res.status(500).send({error})
    }
} catch (error) {
    // res.status(401).send({error})
}
}

module.exports = {
    register,
    login,
    getUser,
    updateUser,
    generateOTP,
    verifyOTP,
    createResetSession,
    resetPassword,
    verifyUser
}