'use strict';
var dbConn = require('./../../config/dbConfig');
//Client object create
var Client = function (client) {
  this.name = client.name;
  this.email = client.email;
  this.setWeddingBudget = client.setWeddingBudget;
  this.finalizeGuestList = client.finalizeGuestList;
  this.selectBridesmaid = client.selectBridesmaid;
  this.chooseVenue = client.chooseVenue;
  this.weddingRegistry = client.weddingRegistry;
  this.weddingDress = client.weddingDress;
  this.preweddingEvents = client.preweddingEvents;
  this.sendWeddingInvitations = client.sendWeddingInvitations;
  this.bookingSalons = client.bookingSalons;
  this.buyJewelerries = client.buyJewelerries;
  this.makeOrdersForWeddingCakes = client.makeOrdersForWeddingCakes;
  this.honeyMoon = client.honeyMoon;
  this.finalizeFoodMenu = client.finalizeFoodMenu;


  /* this.phone = client.phone;
  this.organization = client.organization;
  this.designation = client.designation;
  this.salary = client.salary;
  this.status = client.status ? employee.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date(); */
};
Client.create = function (newCli, result) {
  dbConn.query("INSERT INTO clients set ?", newCli, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res.insertId);
    }
  });
};
Client.findById = function (id, result) {
  dbConn.query("Select * from clients where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};
Client.findAll = function (result) {
  dbConn.query("Select * from clients", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('client : ', res);
      result(null, res);
    }
  });
};
Client.update = function (id, client, result) {
  dbConn.query(" UPDATE clients SET name=?, email=? , setWeddingBudget=?  ,finalizeGuestList=?, selectBridesmaid=? ,chooseVenue=?, " +
                " weddingRegistry=? ,weddingDress=?, preweddingEvents=? ,sendWeddingInvitations=?, bookingSalons=? ,buyJewelerries=?, "+
                " makeOrdersForWeddingCakes=? ,honeyMoon=?, finalizeFoodMenu=?  WHERE id = ? ",
    [ client.name, client.email, client.setWeddingBudget, client.finalizeGuestList, client.selectBridesmaid, client.chooseVenue, 
      client.weddingRegistry , client.weddingDress, client.weddingDress,  client.preweddingEvents, client.sendWeddingInvitations,
      client.bookingSalons,  client.buyJewelerries,   client.makeOrdersForWeddingCakes,   client.honeyMoon,  client.finalizeFoodMenu,
       id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Client.delete = function (id, result) {
  dbConn.query("DELETE FROM clients WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};
module.exports = Client;