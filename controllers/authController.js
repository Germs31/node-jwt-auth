const User = require('../models/User')

const handleErrors = err => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    if(err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    if(err.message.inculdes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors;
}


module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    console.log(email,password);

    try {
        const user = await User.create({email, password});
        res.status(201).json(user)
    } catch (error) {
        const errors = handleErrors(eror)
        res.status(400).jason({errors})
    }

    res.render('new signup')
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    console.log(email,password);

    res.render('user login')
}