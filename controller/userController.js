const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ _id: -1 });
        res.send(users);
    } catch (err) {
        res.status(500).send({
        message: err.message,
        });
    }
};

const getUserById = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (err) {
        res.status(500).send({
        message: err.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name;
            user.email = req.body.email;
            user.isAdmin = req.body.isAdmin;

            await user.save();
            res.send({ message: 'User Updated Successfully!' });
        }
    } catch (err) {
        res.status(404).send({ message: 'User not found!' });
    }
}
