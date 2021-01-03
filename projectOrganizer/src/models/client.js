'use strict';
var dbConn = require('./../../config/dbConfig');
//Client object create
var Client = function (client) {
  this.name = client.name;
  this.email = client.email;
  this.googleId = client.googleId;

  this.setWeddingBudgetDate = client.setWeddingBudgetDate;
  this.finalizeGuestListDate = client.finalizeGuestListDate;
  this.selectBridesmaidDate = client.selectBridesmaidDate;
  this.chooseVenueDate = client.chooseVenueDate;
  this.weddingRegistryDate = client.weddingRegistryDate;
  this.weddingDressDate = client.weddingDressDate;
  this.preweddingEventsDate = client.preweddingEventsDate;
  this.sendWeddingInvitationsDate = client.sendWeddingInvitationsDate;
  this.bookingSalonsDate = client.bookingSalonsDate;
  this.buyJewelerriesDate = client.buyJewelerriesDate;
  this.makeOrdersForWeddingCakesDate = client.makeOrdersForWeddingCakesDate;
  this.honeyMoonDate = client.honeyMoonDate;
  this.finalizeFoodMenuDate = client.finalizeFoodMenuDate;

  this.setaPartyBudgetDate = client.setaPartyBudgetDate;
  this.finalizeTheGuestListDate = client.finalizeTheGuestListDate;
  this.birthdayCakeOrdersDate = client.birthdayCakeOrdersDate;
  this.setPartyInvitationsDate = client.setPartyInvitationsDate;
  this.chooseAndBookTheVenueDate = client.chooseAndBookTheVenueDate;
  this.buyBirthdayGiftsDate = client.buyBirthdayGiftsDate;
  this.finalizeBirthdayFoodMenuDate = client.finalizeBirthdayFoodMenuDate;

  this.setOfficePartyBudgetDate = client.setOfficePartyBudgetDate;
  this.finalizeOfficePartyGuestListDate = client.finalizeOfficePartyGuestListDate;
  this.officePartyCakeOrdersDate = client.officePartyOrdersDate;
  this.setOfficePartyInvitationsDate = client.setOfficePartyInvitationsDate;
  this.officeBookTheVenueDate = client.officeBookTheVenueDate;
  this.finalizeOfficeFoodMenuDate = client.finalizeOfficeFoodMenuDate;
  this.buyOfficeGiftsDate = client.buyOfficeGiftsDate;
  this.officePartyDecorations = client.officePartyDecorations;


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
Client.findById = function (googleId, result) {
  dbConn.query("Select * from clients where googleId= ? ", [googleId], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log('client clientjs: ', res);
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
Client.update = function (googleId, client, result) {
  console.log(client);
  dbConn.query(" UPDATE clients SET name=?, email=? , setWeddingBudgetDate=?  ,finalizeGuestListDate=?, selectBridesmaidDate=? ,chooseVenueDate=?, " +
                " weddingRegistryDate=? ,weddingDressDate=?, preweddingEventsDate=? ,sendWeddingInvitationsDate=?, bookingSalonsDate=? ,buyJewelerriesDate=?, "+
                " makeOrdersForWeddingCakesDate=? ,honeyMoonDate=?, finalizeFoodMenuDate=?, setaPartyBudgetDate=?, finalizeTheGuestListDate=? ,birthdayCakeOrdersDate=?, "+
                " setPartyInvitationsDate=? ,chooseAndBookTheVenueDate=?, buyBirthdayGiftsDate=?, finalizeBirthdayFoodMenuDate=? ," +
                " setOfficePartyBudgetDate=? , finalizeOfficePartyGuestListDate=? ,  officePartyCakeOrdersDate=? , setOfficePartyInvitationsDate=? , " +  
                " officeBookTheVenueDate=? ,finalizeOfficeFoodMenuDate=? ,buyOfficeGiftsDate=? , officePartyDecorations=? WHERE googleId = ? ",
    [ client.name, client.email, 
      client.setWeddingBudgetDate, client.finalizeGuestListDate, client.selectBridesmaidDate, client.chooseVenueDate, 
      client.weddingRegistryDate , client.weddingDressDate, client.preweddingEventsDate, client.sendWeddingInvitationsDate,
      client.bookingSalonsDate,  client.buyJewelerriesDate,   client.makeOrdersForWeddingCakesDate,   client.honeyMoonDate,  client.finalizeFoodMenuDate,
      client.setaPartyBudgetDate, client.finalizeTheGuestListDate, client.birthdayCakeOrdersDate, client.setPartyInvitationsDate, 
      client.chooseAndBookTheVenueDate , client.buyBirthdayGiftsDate, client.finalizeBirthdayFoodMenuDate,
      client.setOfficePartyBudgetDate, client.finalizeOfficePartyGuestListDate,  client.officePartyCakeOrdersDate, client.setOfficePartyInvitationsDate, client.officeBookTheVenueDate,
      client.finalizeOfficeFoodMenuDate,  client.buyOfficeGiftsDate, client.officePartyDecorations, googleId ], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Client.delete = function (googleId, result) {
  dbConn.query("DELETE FROM clients WHERE googleId = ?", [googleId], function (err, res) {
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