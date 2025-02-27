const asynHandler = require("../middleware/async");
const paymentModel = require("../DBFunctions/PaymentAccountDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");
const { parseISO } = require('date-fns');


exports.ADD_PAYMENT_ACCOUNT= asynHandler(async (req, res, next) => {

  
    let pAccount  = req.body;

    let newJob = await paymentModel.add(pAccount)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add payment account details"
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
 