const express = require('express');

const router = new express.Router();
const ErrorsLog = require('../../models/ErrorsLog');

router.route('/add')
    .post((req, res) => {
        const errorsLog = new ErrorsLog();

        errorsLog.user = req.body.user;
        errorsLog.error = req.body.error;
        errorsLog.date = req.body.date;

        errorsLog.save((err) => {
            if (err) {
                res.send(err);
                return;
            }
            res.send('Error successfully added!');
        });
    });

router.get('/users', (req, res) => {
    ErrorsLog.aggregate([{ $group: { _id: '$user' } }], (err, errorsLog) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(errorsLog);
    });
});

router.get('/users/errors', (req, res) => {
    ErrorsLog.aggregate([{ $group: { _id: '$error' } }], (err, errorsLog) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(errorsLog);
    });
});

router.get('/users/errors/:user', (req, res) => {
    ErrorsLog.find({ user: req.params.user }, (err, errorsLog) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(errorsLog);
    });
});

module.exports = router;
