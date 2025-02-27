const asynHandler = require("../middleware/async");
const permissionModel = require("../DBFunctions/PermissionDb");
const UtilityHelper = require("../helper/utilfunc");
const { v4: uuidv4 } = require('uuid');
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");




exports.ADD_PERMISSION = asynHandler(async (req, res, next) => {

  
    let permission  = req.body;
 
  
 
    let newJob = await permissionModel.addPermissions(permission)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add permission"
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
 




exports.ALL_PERMISSIONS = asynHandler(async (req, res, next) => {

  
  
 
    let newJob = await permissionModel.allPermissions()
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to retrieve permissions"
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
 
