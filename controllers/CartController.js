const asynHandler = require("../middleware/async");
const cartModel = require("../DBFunctions/CartDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");


exports.ADD_CART = asynHandler(async (req, res, next) => {

  
    let biddingd  = req.body;

  
    let newJob = await cartModel.add(biddingd, biddingd.bidding_ID);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add or update cart details"
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
 


 exports.CART_DETAILS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {cart_id} = req.params;

    let newJob = await cartModel.details(cart_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid cart_id ID"
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
 


 exports.CART_DETAILS_FULL = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {cart_id} = req.params;

    let newJob = await cartModel.fullDetails(cart_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid cart_id"
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
 


 exports.USER_CART = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    let newJob = await cartModel.userCarts(user_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid user_id"
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
 



 exports.USER_CART_FULL = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    let newJob = await cartModel.userCartsFull(user_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid user_id"
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
 