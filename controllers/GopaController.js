const asynHandler = require("../middleware/async");
const gopaModel = require("../DBFunctions/GopaDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");
const { parseISO } = require('date-fns');



exports.PROFILE_GOPA = asynHandler(async (req, res, next) => {

  
    let gopaDetails  = req.body;

  
    let newJob = await gopaModel.add(gopaDetails)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add gopa details"
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
 