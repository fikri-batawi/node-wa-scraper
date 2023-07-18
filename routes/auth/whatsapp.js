const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

const client = require('../../client');

router.get('/qrcode', async (req, res, next) => {
    client.getState().then(data => {
        if(!data){
            client.on('qr', (qr) => {
                QRCode.toDataURL(qr, (err, url) => {
                    res.render('auth/qrcode', {url})
                })
            })
        }else{
            res.redirect('/dashboard')
        }
    })

})

router.get('/logout', async (req, res, next) => {
    client.logout()
    res.redirect('/auth/qrcode')
})

module.exports = router;