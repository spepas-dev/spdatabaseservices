const asynHandler = require("../middleware/async");
const walletModel = require("../DBFunctions/WalletDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");


exports.WALLET_ADD = asynHandler(async (req, res, next) => {

  
    let chargeDetails  = req.body;

  
    let newJob = await walletModel.add(chargeDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add wallet details"
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
 
 
exports.WALLET_UPDATE = asynHandler(async (req, res, next) => {

  
    let chargeDetails  = req.body;

  
    let newJob = await walletModel.update(chargeDetails);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to update charge details"
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
 

exports.WALLET_BY_ID = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {walletID} = req.params;

    let newJob = await walletModel.detailsByID(walletID);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid wallet ID"
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
 



 exports.WALLET_BY_WALLET_NUMBER = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {WalletNumber} = req.params;

    let newJob = await walletModel.detailsByWalletNumber(WalletNumber);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid wallet number"
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
 





 exports.WALLET_BY_USER_ID = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {User_ID} = req.params;

    let newJob = await walletModel.detailsByUserID(User_ID);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid  user id"
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






 exports.WALLET_SYSTEM_WALLETS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
   // let {User_ID} = req.params;

    let newJob = await walletModel.systemAccounts();
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Unable to retrieve system wallets"
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