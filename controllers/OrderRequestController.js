const asynHandler = require("../middleware/async");
const orderRequestModel = require("../DBFunctions/OrderRequestDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");



exports.ADD_ORDER_REQUEST = asynHandler(async (req, res, next) => {

  
    let requestDetails  = req.body;

  
    let newJob = await orderRequestModel.add(requestDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to request details"
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
 







exports.REQUEST_DETAILS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {request_id} = req.params;

    let newJob = await orderRequestModel.details(request_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid request ID"
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
 





exports.REQUEST_FULL_DETAILS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {request_id} = req.params;

    let newJob = await orderRequestModel.fullDetails(request_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid request ID"
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






exports.USER_ACTIVE_REQUESTS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    let newJob = await orderRequestModel.userActiveRequest(user_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid user ID"
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




 exports.USER_REQUESTS_HISTORY = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    let newJob = await orderRequestModel.userRequestHistory(user_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid user ID"
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


 


 exports.UPDATE_REQUEST = asynHandler(async (req, res, next) => {

  
    let requestDetails  = req.body;

  
    let newJob = await orderRequestModel.update(requestDetails.request_ID, requestDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to update request details"
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
 



exports.GOPA_SELLERS_FOR_BID_ASSIGNMENT = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {gopa_id,request_id} = req.params;
    
    let newJob = await orderRequestModel.GopaSellerForBiddingAssignment(gopa_id, request_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid request ID"
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






exports.USER_REQUEST_OFFERS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    let newJob = await orderRequestModel.UserActiveRequestOffer(user_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid request ID"
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
