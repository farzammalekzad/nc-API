const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {pageTitle: 'خوش آمدید'});
})





module.exports = router;
