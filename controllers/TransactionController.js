const asynHandler = require("../middleware/async");
const tranasctionModel = require("../DBFunctions/TransactionDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");


exports.ADD_TRANSACTIONS = asynHandler(async (req, res, next) => {

  
    let transactions  = req.body;

  
    let newJob = await tranasctionModel.addTransactions(transactions);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add transaction list"
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
 

