const User = require('./../models/User');
const bcrypt = require('bcryptjs');

// get all users
exports.getAllUsers = async (req, res) => {
    // find all users form the database and assign it to a variable
    const users = await User.find();

    // send response along with the users array
    res.status(200).json({
        messagae: 'Success',
        users
    });
}

// get single user
exports.getUser = async (req, res) => {
    // find a particular user by passing the user ID through URL parameter and assign the user to a variable
    const user = await User.findById(req.params.id);

    // send response along with the user
    res.status(201).json({
        messagae: 'Success',
        user
    });
}

// add a user
exports.addUser = async (req, res) => {
    if (req.body.password.length < 8) { // checking for password length
        console.log('Password length is not strong');
    } else if (req.body.password != req.body.confirmPassword) { // checking for password match
        console.log('Passwords do not match');
    } else {
        // hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                const user = new User();

                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.userType = req.body.userType;
                user.password = hash;

                // save to database
                await user.save();

                // send response along with the added user
                res.status(201).json({
                    message: 'Success',
                    user
                });
            });
        });
    }
}

// update a user
exports.updateUser = async (req, res) => {
    if (req.body.password.length < 8) { // checking for password length
        console.log('Password length is not strong');
    } else if (req.body.password != req.body.confirmPassword) { // checking for password match
        console.log('Passwords do not match');
    } else {
        // hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                req.body.password = hash;

                // update user and save to database
                const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runValidators: true
                });

                // send response along with the added user
                res.status(200).json({
                    messagae: 'Success',
                    updatedUser
                })
            });
        });
    }
}

// delete a user
exports.deleteUser = async (req, res) => {
    // find user using the user ID passed through URL parameter and delete user
    await User.findByIdAndDelete(req.params.id);

    // send response
    res.status(200).json({
        messagae: 'Success',
        data: null
    });
}