const asynHandler = require("../middleware/async");
const userModel = require("../DBFunctions/UserDb");
const UtilityHelper = require("../helper/utilfunc");
const { v4: uuidv4 } = require('uuid');
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");




exports.REGISTER = asynHandler(async (req, res, next) => {

    console.log("###########################");
   let user  = req.body;

   if(user.password)
    {
        user.password = UtilityHelper.sha256Encrypt(user.password);
    }
   
  //user.role = "BUYER";
   user.phoneNumber = UtilityHelper.formatPhone(user.phoneNumber);
   //user.User_ID = uuidv4();


    console.log("###########################");
    console.log(user);

   let newJob = await userModel.register(user);



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to register user"
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



exports.LOGIN = asynHandler(async (req, res, next) => {

  
   // console.log(session);
   console.log("XXXXXXXX")
   let {email, password} = req.body;



   password = UtilityHelper.sha256Encrypt(password);
 





   let newJob = await userModel.login(email,password);



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Invalid username/password"
            };
            return UtilityHelper.sendResponse(res, 200, resp.message, resp);
        }

   var resp = {
       status : RESPONSE_CODES.SUCCESS,
       message : "Success",
       data : newJob
   };

   console.log("XXXXXXXXQQQQQ")
   return UtilityHelper.sendResponse(res, 200, resp.message, resp);

})





exports.USER_BY_EMAIL = asynHandler(async (req, res, next) => {

    console.log("########################### user by email started");
    // console.log(session);
    let {email} = req.params;
 
 
 
 
 
 
    let newJob = await userModel.userByEmail(email);
 
    console.log("########################### user by email ended");
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Email does not exist"
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
 



exports.USER_BY_PHONE = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {phoneNumber} = req.params;
 
    phoneNumber = UtilityHelper.formatPhone(phoneNumber);
 
 
 
 
    let newJob = await userModel.userByPhone(phoneNumber);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Email does not exist"
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
 




exports.USER_BY_ID = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    let newJob = await userModel.userByID(user_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "User does not exist"
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




 exports.USER_BY_ID_FULL = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id} = req.params;

    let newJob = await userModel.userByIDFull(user_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "User does not exist"
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


 

exports.USER_BY_SELLERS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    //let {sellerIDs} = req.body;

    let newJob = await userModel.UserBySellers(req.body);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Email does not exist"
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
 






exports.UPDATE = asynHandler(async (req, res, next) => {


   let user  = req.body;


   console.log("user details received here:  ")
   console.log(user);

   let newJob = await userModel.update(user.User_ID, user);



       if(!newJob)
        {
            var resp = {
                status : RESPONSE_CODES.FAILED,
                message : "Failed to update user"
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





exports.GOPA_AND_SELLERS = asynHandler(async (req, res, next) => {

  
    // console.log(session);

    let newJob = await userModel.gopaAndSeller();
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Email does not exist"
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
 


exports.ALL_ADMIN = asynHandler(async (req, res, next) => {

  
    // console.log(session);

    console.log("================== call user types")
    let newJob = await userModel.usersByType('ADMIN');
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Email does not exist"
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
 



 exports.ALL_GOPAS = asynHandler(async (req, res, next) => {

  
    // console.log(session);

    console.log("================== call user types")
    let newJob = await userModel.Gopas();
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Email does not exist"
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


 exports.ALL_MEPAS = asynHandler(async (req, res, next) => {

  
    // console.log(session);

    console.log("================== call user types")
    let newJob = await userModel.Mepas();
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Email does not exist"
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




exports.ALL_BUYERS = asynHandler(async (req, res, next) => {

  
    // console.log(session);

    console.log("================== call user types")
    let newJob = await userModel.usersByType('BUYER');
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Email does not exist"
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
 
 
 exports.ALL_SELLERS = asynHandler(async (req, res, next) => {

  
    // console.log(session);

    console.log("================== call user types")
    let newJob = await userModel.Sellers();
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Email does not exist"
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
 

 exports.ALL_RIDERS = asynHandler(async (req, res, next) => {

  
    // console.log(session);

    console.log("================== call user types")
    let newJob = await userModel.Riders();
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Email does not exist"
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

