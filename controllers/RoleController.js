const asynHandler = require("../middleware/async");
const roleModel = require("../DBFunctions/RoleDb");
const UtilityHelper = require("../helper/utilfunc");
const { v4: uuidv4 } = require('uuid');
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");



exports.ADD_ROLE = asynHandler(async (req, res, next) => {

  
    let role  = req.body;
 
  
 
    let newJob = await roleModel.addRole(role)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add role"
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




 exports.ADD_ROLE_PERMISSIONS= asynHandler(async (req, res, next) => {

  
    let permissions = req.body;
 
  
 
    let newJob = await roleModel.AddRolePermissions(permissions)
 
 
 
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
 



 exports.ALL_ROLES = asynHandler(async (req, res, next) => {

  
  
    let newJob = await roleModel.all()
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to retrieve roles"
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
 
