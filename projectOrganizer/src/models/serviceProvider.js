'use strict';
var dbConn = require('./../../config/dbConfig');
//Client object create
var ServiceProviders = function (client) {
  this.companyName = serviceprovider.companyName;
  this.tel = serviceprovider.tel;
  this.email = serviceprovider.email;
  this.address = serviceprovider.address;
  this.ownerName = serviceprovider.ownerName;
  this.ownerIdNo = serviceprovider.ownerIdNo;
  this.websiteLink = serviceprovider.websiteLink;
  this.description = serviceprovider.description;
  this.isWedding = serviceprovider.isWedding;
  this.isBirthdayParty = serviceprovider.isBirthdayParty;
  this.isOfficeParty = serviceprovider.isOfficeParty;

  /* this.phone = client.phone;
  this.organization = client.organization;
  this.designation = client.designation;
  this.salary = client.salary;
  this.status = client.status ? employee.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date(); */
};
ServiceProviders.create = function (newSer, result) {
  dbConn.query("INSERT INTO serviceproviders set ?", newSer, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
ServiceProviders.findById = function (id, result) {
  dbConn.query("Select * from serviceproviders where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};
ServiceProviders.findAll = function (result) {
  dbConn.query("Select * from serviceproviders", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('serviceprovider : ', res);
      result(null, res);
    }
  });
};
ServiceProviders.update = function (id, client, result) {
  dbConn.query("UPDATE serviceproviders SET companyName=?, tel=?, email=?, address=?, ownerName=?, "+
                " ownerIdNo=?, websiteLink=?,  description=?, isWedding=?, isBirthdayParty=?, isOfficeParty=? WHERE id = ?",
    [   serviceprovider.companyName, serviceprovider.tel, serviceprovider.email, 
        serviceprovider.address, serviceprovider.ownerName, serviceprovider.ownerIdNo, 
        serviceprovider.websiteLink, serviceprovider.description, serviceprovider.isWedding,
        serviceprovider.isBirthdayParty, serviceprovider.isOfficeParty, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
ServiceProviders.delete = function (id, result) {
  dbConn.query("DELETE FROM serviceproviders WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};
module.exports = ServiceProviders;