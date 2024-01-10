const User = require('../models/userSchema');
const FormDetail = require('../models/formSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const passCheck = await bcrypt.compare(password, user.password)

        if (user && passCheck) {
            const token = jwt.sign(
                { id: user.id, username: user.username, name: user.name, age: user.age },
                "jwtsecret",
                { expiresIn: "1h" },
            )
            user.token = token;
            user.password = undefined;

            //cookie section
            const options = {
                expires: new Date(
                    Date.now() + 90 * 24 * 60 * 60 * 1000 //90 days
                ),
                httpOnly: true,
            };
            // here option is used to set the cookie in the browser and if we want to change the name of the cookie we can do it here by changing the name of the cookie in the options and its code is below
            // const options = {
            //     expires: new Date(
            //         Date.now() + 90 * 24 * 60 * 60 * 1000 //90 days
            //     ),
            //     httpOnly: true,
            //     
            //  and if we want to delete cookie in logout api we can do it by setting the maxAge to 1 like below
            //     maxAge: 1
            // };


            res.status(200).cookie("jwt", token, options).json({ msg: 'User Logged In Successfully', token, user });
        } else {
            res.status(201).json({ msg: "Invalid Creds" })
        }

        // return res.status(200).json({ msg: 'User Logged In Successfully', user });
        // res.status(400).json({ msg: "Invalid Creds" })


    } catch (error) {
        console.log(error);
    }
};


exports.getUser = async (req, res, next) => {
    // console.log(req.user);
    let user
    if (req.user) {
        // console.log(req.user);
        user = await User.findOne({ username: req.user.username });
    }
    res.send(user);

};

exports.logout = async (req, res, next) => {
    res.clearCookie('jwt');
    res.json({ msg: "User Logged Out" });
};



exports.formSubmit = async (req, res, next) => {
    try {
        const { name, email, phoneNumber, carModelName, expectedPrice } = req.body;

        // Create a new FormDetail document
        const newFormDetail = new FormDetail({
            name,
            email,
            phoneNumber,
            carModelName,
            expectedPrice,
        });

        // Save the document to the database
        await newFormDetail.save();

        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.registerUser = async (req, res, next) => {
    try {
        const { name, username, password, phoneNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        let usernameC = await User.findOne({ username: username })
        if (!usernameC) {
            const user = await User.create({
                name: name,
                username: username,
                password: hashedPassword,
                phoneNumber: phoneNumber
            });

            const token = jwt.sign(
                { id: user.id, user },
                "jwtsecret",
                { expiresIn: "1h" },

            )
            // Save the new user to the database
            user.token = token;
            user.password = undefined;



            return res.status(200).json({ msg: 'User Added Successfully', user });
        }
        else {
            return res.status(202).json({ msg: " User Already Exist" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};
