function validateFormData(req, res, next) {
    const { fname, lname, age, email } = req.body;
    let errors = {};

    if (!fname || fname.length < 2) errors.fname = 'First name must be at least 2 characters long.';
    if (!lname || lname.length < 2) errors.lname = 'Last name must be at least 2 characters long.';
    if (!age || new Date(age) > new Date()) {
        errors.age = 'Birth date must be in the past.';
    } else {
        const birthDate = new Date(age);
        const today = new Date();
        let ageDifference = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            ageDifference--;
        }

        if (ageDifference < 18) {
            errors.age = 'You must be at least 18 years old.';
        }
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email address.';

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }
    next();
}

module.exports = validateFormData;
