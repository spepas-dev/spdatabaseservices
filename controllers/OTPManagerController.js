const asynHandler = require("../middleware/async");
const otpModel = require("../DBFunctions/OTPManagerDb");
const UtilityHelper = require("../helper/utilfunc");
const { v4: uuidv4 } = require('uuid');
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");




exports.CREATEOTP = asynHandler(async (req, res, next) => {

  
   let otp  = req.body;

 

   let newJob = await otpModel.add(otp)



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to generate OTP"
            };
            return UtilityHelper.sendResponse(res, 200, resp.message, resp);
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : newJob.otpID
   };

   return UtilityHelper.sendResponse(res, 200, resp.message, resp);

})






exports.DETAILS = asynHandler(async (req, res, next) => {

  
   let {otpID,otpHarshed} = req.body;
 
  
 
    let newJob = await otpModel.otpManagerDetails(otpID, otpHarshed)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid OTP"
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
 