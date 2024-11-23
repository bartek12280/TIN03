function validateFormData(req, res, next) {
    const { fname, lname, age, email } = req.body;

    let errors = [];

    if (!fname || fname.length < 2) {
        errors.push('First name must be at least 2 characters long.');
    }

    if (!lname || lname.length < 2) {
        errors.push('Last name must be at least 2 characters long.');
    }

    if (!age || new Date(age) > new Date()) {
        errors.push('Birth date must be in the past.');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Email is invalid.');
    }

    if (errors.length > 0) {
        return res.render('error', { errors });
    }

    next();
}

module.exports = validateFormData;
