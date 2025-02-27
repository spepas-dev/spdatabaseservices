const asynHandler = require("../middleware/async");
const identificationModel = require("../DBFunctions/IdentificationDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");
const { parseISO } = require('date-fns');


exports.ADD_IDENTIFICATION = asynHandler(async (req, res, next) => {

  
    let identification  = req.body;

    identification.issue_date = parseISO(`${identification.issue_date}T00:00:00Z`); // Add time component
    identification.expiry_date = identification.expiry_date ? parseISO(`${identification.expiry_date}T00:00:00Z`) : null;
 
    let newJob = await identificationModel.add(identification)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add identification details"
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
 



 exports.USER_IDENTIFICATIONS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    
    let newJob = await identificationModel.userIdentifications(user_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "User identification does not exist"
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