const express = require('express');
const router = express.Router();
const validateFormData = require('../middleware/validateData');

const submissions = [];

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

router.post('/submit', validateFormData, (req, res) => {
    const { fname, lname, age, email } = req.body;

    const birthDate = new Date(age);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
    }

    submissions.push({ fname, lname, calculatedAge, email });

    res.render('result', { fname, lname, calculatedAge, email });
});

router.get('/submissions', (req, res) => {
    res.render('submissions', { submissions });
});

module.exports = router;
