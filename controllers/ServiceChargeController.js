const asynHandler = require("../middleware/async");
const serviceModel = require("../DBFunctions/ServiceChargeDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");


exports.SERVICE_CHARGE_ADD = asynHandler(async (req, res, next) => {

  
    let chargeDetails  = req.body;

  
    let newJob = await serviceModel.add(chargeDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add charge details"
             };
             return UtilityHelper.sendResponse(res, 200, resp.message, resp);
         }
 
    var resp = {
        status : RESPONSE_CODES.SUCCESS,
        message : "Success",
        data : newJob
    };
 
    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
 
 })
 
 
exports.SERVICE_CHARGE_UPDATE = asynHandler(async (req, res, next) => {

  
    let chargeDetails  = req.body;

  
    let newJob = await serviceModel.update(chargeDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to update charge details"
             };
             return UtilityHelper.sendResponse(res, 200, resp.message, resp);
         }
 
    var resp = {
        status : RESPONSE_CODES.SUCCESS,
        message : "Success",
        data : newJob
    };
 
    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
 
 })
 

exports.SERVICE_CHARGE_BY_ID = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {chargeID} = req.params;

    let newJob = await serviceModel.detailsByID(chargeID);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid charge ID"
             };
             return UtilityHelper.sendResponse(res, 200, resp.message, resp);
         }
 
    var resp = {
        status : RESPONSE_CODES.SUCCESS,
        message : "Success",
        data : newJob
    };
 
    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
 
 })
 



 exports.SERVICE_CHARGE_BY_TYPE = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {charge_type} = req.params;

    let newJob = await serviceModel.detailsByType(charge_type);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid charge ID"
             };
             return UtilityHelper.sendResponse(res, 200, resp.message, resp);
         }
 
    var resp = {
        status : RESPONSE_CODES.SUCCESS,
        message : "Success",
        data : newJob
    };
 
    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
 
 })
 