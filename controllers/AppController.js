const asynHandler = require("../middleware/async");
const applicationModel = require("../DBFunctions/ApplicationDb");
const UtilityHelper = require("../helper/utilfunc");
const { v4: uuidv4 } = require('uuid');
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");



exports.ADD_APPLICATION = asynHandler(async (req, res, next) => {

  
    let application  = req.body;
 
  
 
    let newJob = await applicationModel.add(application)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add application"
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
 



 exports.UPDATE_APPLICATION = asynHandler(async (req, res, next) => {

  
    let application  = req.body;
 
  
 
    let newJob = await applicationModel.update(application.application_id, application)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to update application"
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
 

 exports.APPLICATION_BY_ID = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {application_id} = req.params;

    let newJob = await applicationModel.details(application_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Application does not exist"
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
 




 exports.ALL_APPLICATION = asynHandler(async (req, res, next) => {

  
    // console.log(session);

    let newJob = await applicationModel.all();
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Unable to retrieve applications"
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
 

 exports.ADD_APPLICATION_MENUS = asynHandler(async (req, res, next) => {

  
    let menus  = req.body;
 
  
 
    let newJob = await applicationModel.addApplicationMenus(menus)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add application menus"
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
 