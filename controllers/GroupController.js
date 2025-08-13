const asynHandler = require("../middleware/async");
const groupModel = require("../DBFunctions/GroupDb");
const UtilityHelper = require("../helper/utilfunc");
const { v4: uuidv4 } = require('uuid');
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");




exports.ADD_GROUP = asynHandler(async (req, res, next) => {

  
    let group  = req.body;
 
  
 
    let newJob = await groupModel.addGroup(group)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add group"
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
 



 exports.GROUP_APPLICATIONS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {group_id} = req.params;

    
    let newJob = await groupModel.groupApplications(group_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Group does not exist"
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
 



 exports.ADD_GROUP_APPLICATION_MENUS = asynHandler(async (req, res, next) => {

  
    let group  = req.body;
 
  
 
    let newJob = await groupModel.addGroupApplicationMenu(group)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add menus"
             };
             return UtilityHelper.sendResponse(res, 200, resp.message, resp);
         }
 
    var resp = {
        status : RESPONSE_CODES.SUCCESS,
        message : "Success"
    };
 
    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
 
 })
 





 exports.GROUP_MENUS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {group_id} = req.params;

    
    let newJob = await groupModel.groupMenu(group_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Group does not exist"
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
 






 exports.GROUP_DETAILS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {group_id} = req.params;

    
    let newJob = await groupModel.group_details(group_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Group does not exist"
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
 





 exports.ALL_GROUPS = asynHandler(async (req, res, next) => {

  
    // console.log(session);


    
    let newJob = await groupModel.allGroups();
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to retrieve groups"
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
 





 exports.ADD_USER_GROUPS = asynHandler(async (req, res, next) => {

  
    let group  = req.body;
 
  
 
    let newJob = await groupModel.addUserGroup(group)
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to user to groups"
             };
             return UtilityHelper.sendResponse(res, 200, resp.message, resp);
         }
 
    var resp = {
        status : RESPONSE_CODES.SUCCESS,
        message : "Success"
    };
 
    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
 
 })
 
