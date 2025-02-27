const asynHandler = require("../middleware/async");
const mepaModel = require("../DBFunctions/MepaDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");
const { parseISO } = require('date-fns');


exports.PROFILE_MEPA = asynHandler(async (req, res, next) => {

  
    let mepaDetails  = req.body;

  
    let newJob = await mepaModel.add(mepaDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add mepa details"
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
 

