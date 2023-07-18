const express = require('express');
const router = express.Router();
const {loadClientCommand} = require('../utils/whatsapp/command');

/* GET home page. */
router.get('/', function(req, res, next) {
    // Load Command
    const commands = loadClientCommand("Fikri");

    res.render('dashboard/index', { 
        title: 'Dashboard',
        commands,
    });
});

module.exports = router;
