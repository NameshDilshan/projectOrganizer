'use strict';
const ServiceProvider = require('../models/serviceProvider');
exports.findAll = function (req, res) {
    ServiceProvider.findAll(function (err, serviceProvider) {
        console.log('controller')
        if (err){
            res.send(err);
        }else{
            console.log('res', serviceProvider);
            res.send(serviceProvider);
        }
    });
};
exports.create = function (req, res) {
    const new_serviceprovider = new ServiceProvider(req.body);
    console.log("newService : " + JSON.stringify(new_serviceprovider))
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        ServiceProvider.create(new_serviceprovider, function (err, serviceprovider) {
            if (err){
                res.send(err);
            }else{
                res.status(200).json(serviceprovider);
            }
        });
    }
};
exports.findById = function (req, res) {
    ServiceProvider.findById(req.params.id, function (err, serviceprovider) {
        if (err)
            res.send(err);
        res.json(serviceprovider);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        ServiceProvider.update(req.params.id, new Client(req.body), function (err, serviceprovider) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'ServiceProvider successfully updated' });
        });
    }
};
exports.delete = function (req, res) {
    ServiceProvider.delete(req.params.id, function (err, serviceprovider) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'ServiceProvider successfully deleted' });
    });
};