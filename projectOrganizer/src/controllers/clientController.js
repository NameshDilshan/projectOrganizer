'use strict';
const Client = require('../models/client');
exports.findAll = function (req, res) {
    Client.findAll(function (err, client) {
        console.log('controller')
        if (err){
            res.send(err);
        }else{
            res.json(client);
        }
    });
};
exports.create = function (req, res) {
    const new_client = new Client(req.body);
    console.log("new_client : " + JSON.stringify(new_client))
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Client.create(new_client, function (err, client) {
            if (err){
                res.send(err);
            }else{
                res.send(client);
            }
        });
    }
};
exports.findById = function (req, res) {
    Client.findById(req.params.googleId, function (err, client) {
        if (err){
            res.send(err);
        }else{
            res.status(200).json(client);
        }
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        var googleId = req.params.googleId;
        const update_client = new Client(req.body);
        Client.update(googleId, update_client, function (err, client) {
            if (err){
                res.send(err);
            }else{
                res.json(client);
            }
    });
    }
};
exports.delete = function (req, res) {
    Client.delete(req.params.googleId, function (err, client) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Client successfully deleted' });
    });
};

exports.findOrCreate = function (req, res) {
    Client.findById(req.body.googleId, function (err, client) {
        if (err){
            res.send(err);
        }else{
            if(client === undefined || client.length == 0){
                console.log("new client");
                var result = exports.create(req, res);
                res.send(result);
            }else{
                console.log(" already exists "  + JSON.stringify(client));
            }
        }
    });
};