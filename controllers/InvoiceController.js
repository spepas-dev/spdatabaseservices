const asynHandler = require("../middleware/async");
const invoiceModel = require("../DBFunctions/InvoiceDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");


exports.ADD_INVOICE = asynHandler(async (req, res, next) => {

  
    let address  = req.body;

  
    let newJob = await invoiceModel.addInvoice(address);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add invoice details"
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
 


 exports.ADD_INVOICE_WITH_ITEMS = asynHandler(async (req, res, next) => {

  
    let address  = req.body;

  
    let newJob = await invoiceModel.addInvoiceWithItems(address.invoice,address.invoiceItems);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add invoice details"
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
 


exports.UPDATE_INVOICE = asynHandler(async (req, res, next) => {

  
    let address  = req.body;

  
    let newJob = await invoiceModel.updateInvoice(address);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to update invoice details"
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
 




 exports.INVOICE_DEATAILS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {invoice_id} = req.params;

    let newJob = await invoiceModel.InvoiceDetails(invoice_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid invoice ID"
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




 exports.INVOICE_DEATAILS_FULL = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {invoice_id} = req.params;

    let newJob = await invoiceModel.InvoiceDetailsFull(invoice_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid invoice ID"
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



 exports.INVOICE_DEATAILS_BY_QR = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {qr_value} = req.params;

    let newJob = await invoiceModel.InvoiceDetailsByQR(qr_value);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid QR"
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


//set status to empty to spool user invoices
 exports.USER_INVOICES = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {user_id, status} = req.params;

    if(status)
        {
            status = Number(status)
        }

    let newJob = await invoiceModel.UserInvoicesByStatus(user_id,status);
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid invoice ID"
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




 //to list all invoices available to gopa to accept. these are invoices which is aggregated
 exports.GOPA_PENDING_INVOICES = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    //let {user_id, status} = req.params;

    let newJob = await invoiceModel.PendingInvoiceForGopa();
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid invoice ID"
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




 exports.GOPA_ACCEPTED_INVOICES = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {gopa_user_id} = req.params;

    let newJob = await invoiceModel.GopaAcceptedInvoices(gopa_user_id);
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid invoice ID"
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




 exports.INVOICE_READY_FOR_PICK_UP = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    //let {gopa_user_id} = req.params;

    let newJob = await invoiceModel.InvoiceReadyForPickUpByDelivery();
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid invoice ID"
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






 //Invoice items management
 exports.ADD_INVOICE_ITEM = asynHandler(async (req, res, next) => {

  
    let address  = req.body;

  
    let newJob = await invoiceModel.addInvoiceItem(address);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to add invoice item details"
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
 





 exports.UPDATE_INVOICE_ITEM = asynHandler(async (req, res, next) => {

  
    let address  = req.body;

  
    let newJob = await invoiceModel.updateInvoiceItem(address);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Failed to update invoice item details"
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
 



 exports.INVOICE_ITEM_DEATAILS = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {item_id} = req.params;

    let newJob = await invoiceModel.InvoiceItemDetails(item_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid invoice ID"
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







 exports.INVOICE_ITEM_DEATAILS_FULL = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {item_id} = req.params;

    let newJob = await invoiceModel.InvoiceItemDetailsFull(item_id);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid invoice ID"
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




 exports.INVOICE_ITEM_DETAILS_BY_QR = asynHandler(async (req, res, next) => {

  
    // console.log(session);
    let {qr_value} = req.params;

    let newJob = await invoiceModel.InvoiceItemDetailsByQR(qr_value);
 
 
 
        if(!newJob)
         {
             var resp = {
                 status : RESPONSE_CODES.FAILED,
                 message : "Invalid QR"
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


 //invoice item management