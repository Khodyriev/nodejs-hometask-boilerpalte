const { user } = require('../models/user');
const userService = require("../services/userService");
const { responseMiddleware: middleware } = require("../middlewares/response.middleware");



const minPassLength = 3;
const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    const newUser = req.body;
    const userKeys = Object.keys(user);
    const newUserKeys = Object.keys(newUser);
    const identicalKeys = newUserKeys.every((key) => userKeys.includes(key)); 
    const { email, phoneNumber, password } = newUser;

    if (!identicalKeys || newUserKeys.length !== 5) {
        res.status(400);
        res.err = "Invalid input of properties for new user!";
        return middleware(req, res, next);
    }

    if (newUserKeys.length === 0) {
        res.status(400);
        res.err = "Properties for new user are missing!";
        return middleware(req, res, next);
    }

    if (!email.includes("@gmail")) {
        res.status(400);
        res.err = "Only gmail adresses are permissible";
        return middleware(req, res, next);
    }

    if (
        phoneNumber.slice(0, 4) !== "+380" ||
        phoneNumber.length !== 13
    ) {
        res.status(400);
        res.err = "Should be only +380xxxxxxxxx format.";
        return middleware(req, res, next);
    }

    if (password.length < minPassLength) {
        res.status(400);
        res.err = `The password must be at least ${minPassLength} characters long`;
        return middleware(req, res, next);
    }

    const users = userService.getUsers();
    users.map((user) => {
        if (user.email.toLowerCase() === email.toLowerCase()) {
            res.status(400);
            res.err = "A user with this email address already exists! Please, login or create a user with differen email.";
            return middleware(req, res, next);
        }
        if (user.phoneNumber.toLowerCase() === phoneNumber.toLowerCase()) {
            res.status(400);
            res.err = "A user with this phone number already exists! Please, login or create a user with different phone number.";
            return middleware(req, res, next);
        }
    });
    next();
};

const updateUserValid = (req, res, next) => {

    const { id } = req.params;
    const newUser = req.body;
    const userKeys = Object.keys(user);
    const newUserKeys = Object.keys(newUser);
    const identicalKeys = newUserKeys.every((key) => userKeys.includes(key));
    const { email, phoneNumber, password } = newUser;

    if (!identicalKeys) {
        res.status(400);
        res.err = "Invalid input of properties!";
        return middleware(req, res, next);
    }

    if (newUserKeys.length === 0) {
        res.status(400);
        res.err = "User properties not found";
        return middleware(req, res, next);
    }

    if (email && !email.includes("@gmail")) {
        res.status(400);
        res.err = "Only gmail adresses are permissible";
        return middleware(req, res, next);
    }

    if (
        (phoneNumber && phoneNumber.slice(0, 4) !== "+380") ||
        (phoneNumber && phoneNumber.length !== 13)
    ) {
        res.status(400);
        res.err = "Should be only +380xxxxxxxxx format.";
        return middleware(req, res, next);
    }

    if (password && password.length < pswdLength) {
        res.status(400);
        res.err = `The password must be at least ${minPassLength} characters long`;
        return middleware(req, res, next);
    }

    const users = userService.getUsers();
    users
        .filter((user) => user.id !== id)
        .map((user) => {
            if (
                email &&
                user.email.toLowerCase() === email.toLowerCase()
            ) {
                res.status(400);
                res.err = "A user with this email address already exists! Please, login or create a user with differen email.";
                return middleware(req, res, next);
            }
            if (
                phoneNumber &&
                user.phoneNumber.toLowerCase() === phoneNumber.toLowerCase()
            ) {
                res.status(400);
                res.err = "A user with this phone number already exists! Please, login or create a user with different phone number.";
                return middleware(req, res, next);
            }
        });

    // TODO: Implement validatior for user entity during update

    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;