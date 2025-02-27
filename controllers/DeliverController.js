const asynHandler = require("../middleware/async");
const deliverModel = require("../DBFunctions/DeliverDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");





exports.PROFILE_DELIVER = asynHandler(async (req, res, next) => {

  
    let deliver  = req.body;

  
    let newJob = await deliverModel.add(deliver);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add deliver details"
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
 





exports.DELIVER_DETAILS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {deliver_id} = req.params;

    let newJob = await deliverModel.details(deliver_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid deliver ID"
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
 




 exports.UPDATE_DELIVER = asynHandler(async (req, res, next) => {

  
    let deliverDetails  = req.body;

  
    let newJob = await deliverModel.update(deliverDetails.Deliver_ID, deliverDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to update delivery details"
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
 








exports.PROFILE_DELIVER_VEHICLE = asynHandler(async (req, res, next) => {

  
    let vehicle  = req.body;

  
    let newJob = await deliverModel.addVehicle(vehicle);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add deliver vehicle details"
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
 




exports.DELIVER_VEHICLE_DETAILS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {vehicle_id} = req.params;

    let newJob = await deliverModel.vehicleDetails(vehicle_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid vehicle ID"
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
 



 exports.UPDATE_DELIVER_VEHICLE = asynHandler(async (req, res, next) => {

  
    let deliverDetails  = req.body;

  
    let newJob = await deliverModel.updateVehicle(deliverDetails.Vehicle_ID, deliverDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to update delivery vehicle details"
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
 


exports.DELIVER_VEHICLES = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {deliver_id} = req.params;

    let newJob = await deliverModel.deliveryVehicles(deliver_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid deliver ID"
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