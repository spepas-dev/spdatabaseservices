const asynHandler = require("../middleware/async");
const sellerModel = require("../DBFunctions/SellerDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");



exports.PROFILE_SELLER = asynHandler(async (req, res, next) => {

  
    let sellerDetails  = req.body;

  
    let newJob = await sellerModel.add(sellerDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add seller details"
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
 



exports.SELLER_DETAILS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {seller_id} = req.params;

    let newJob = await sellerModel.details(seller_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid seller ID"
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
 




 exports.UPDATE_SELLER = asynHandler(async (req, res, next) => {

  
    let sellerDetails  = req.body;

  
    let newJob = await sellerModel.update(sellerDetails.Seller_ID, sellerDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to update seller details"
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
 




exports.GOPA_SELLERS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {gopa_id} = req.params;

    let newJob = await sellerModel.gopaSellers(gopa_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid gopa ID"
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
 