const asynHandler = require("../middleware/async");
const biddingModel = require("../DBFunctions/BiddingDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");



exports.ADD_BIDDING = asynHandler(async (req, res, next) => {

  
    let biddingd  = req.body;

  
    let newJob = await biddingModel.add(biddingd);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add bidding details"
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
 




exports.ADD_BDDING_IMAGE = asynHandler(async (req, res, next) => {

  
    let image  = req.body;

  
    let newJob = await biddingModel.addImage(image);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add bidding details"
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
 



 exports.BIDDING_DETAILS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {bidding_id} = req.params;

    let newJob = await biddingModel.details(bidding_id);
 
 
 
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
 





 exports.BIDDING_FULL_DETAILS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {bidding_id} = req.params;

    let newJob = await biddingModel.fullDetails(bidding_id);
 
 
 
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
 





 exports.UPDATE_BIDDING = asynHandler(async (req, res, next) => {

  
    let biddingDetails  = req.body;

  
    let newJob = await biddingModel.update(biddingDetails.bidding_ID, biddingDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to update bidding details"
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
 





 exports.REQUEST_BIDDINGS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {request_id} = req.params;

    let newJob = await biddingModel.requestBiddings(request_id);
 
 
 
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
 






 exports.SELLER_ACTIVE_BIDDINGS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {seller_id} = req.params;

    let newJob = await biddingModel.sellerActiveBiddings(seller_id);
 
 
 
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
 



 exports.SELLER_BIDDING_HISTORY = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {seller_id} = req.params;

    let newJob = await biddingModel.sellerBiddingHistory(seller_id);
 
 
 
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






 exports.GOPA_ACTIVE_ASSIGNED_BIDDINGS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    let newJob = await biddingModel.gopaActiveAssignBiddings(user_id);
 
 
 
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





 exports.GOPA_ASSIGNED_BIDDING_HISTORY = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    let newJob = await biddingModel.gopaAssignBiddingHistory(user_id);
 
 
 
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







 exports.GOPA_ACTIVE_BIDDINGS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    let newJob = await biddingModel.gopaActiveBiddings(user_id);
 
 
 
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
 



 exports.GOPA_BIDDING_HISTORY = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    let newJob = await biddingModel.gopaBiddingHistory(user_id);
 
 
 
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

