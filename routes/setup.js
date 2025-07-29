const express = require("express");
const router = express.Router();

//TEST CONTROLLER
const {
    TestController
 } = require("../controllers/test");
 

 const {
    REGISTER,
    LOGIN,
    USER_BY_EMAIL,
    USER_BY_PHONE,
    USER_BY_ID,
    UPDATE,
    GOPA_AND_SELLERS,
    USER_BY_SELLERS,
    ALL_ADMIN,
    USER_BY_ID_FULL,
    ALL_GOPAS,
    ALL_MEPAS,
    ALL_BUYERS,
    ALL_SELLERS,
    ALL_RIDERS
 } = require("../controllers/UserController");
 

 const {
   CREATEOTP,
   DETAILS
} = require("../controllers/OTPManagerController");


const {
   ADD_APPLICATION,
   UPDATE_APPLICATION,
   APPLICATION_BY_ID,
   ALL_APPLICATION,
   ADD_APPLICATION_MENUS
} = require("../controllers/AppController");





const {
   ADD_GROUP,
   GROUP_APPLICATIONS,
   ADD_GROUP_APPLICATION_MENUS,
   GROUP_MENUS,
   ALL_GROUPS,
   ADD_USER_GROUPS
} = require("../controllers/GroupController");

 




const {
   ADD_PERMISSION,
   ALL_PERMISSIONS
} = require("../controllers/PermissionController");





const {
   PROFILE_SELLER,
   SELLER_DETAILS,
   UPDATE_SELLER,
   GOPA_SELLERS
} = require("../controllers/SellerController");





const {
   ADD_ROLE,
   ADD_ROLE_PERMISSIONS,
   ALL_ROLES
} = require("../controllers/RoleController");

 
 

const {
   ADD_IDENTIFICATION,
   USER_IDENTIFICATIONS
} = require("../controllers/IdentificationController");

 


 

const {
   PROFILE_GOPA
} = require("../controllers/GopaController");

 
const {
   PROFILE_MEPA
} = require("../controllers/MepaController");




 
const {
   ADD_PAYMENT_ACCOUNT
} = require("../controllers/PaymentAccountController");




const {
   PROFILE_DELIVER,
   DELIVER_DETAILS,
   UPDATE_DELIVER,

   PROFILE_DELIVER_VEHICLE,
   DELIVER_VEHICLE_DETAILS,
   UPDATE_DELIVER_VEHICLE,
   DELIVER_VEHICLES
} = require("../controllers/DeliverController");




const {
   ADD_MANUFACTURER,
   ADD_BRAND,
   ADD_MODEL,
   ADD_IMAGE,
   ADD_SPARE_PART,
   ALL_MODELS,
   ALL_BRANDS,
   ALL_MANUFATURERS,
   ALL_SPARE_PART,
   ADD_SPARE_PART_SINGLE,
   SPARE_PART_DETAILS,
   SPARE_PART_DETAILS_BY_CODE
} = require("../controllers/ProductController");









const {
   ADD_ORDER_REQUEST,
   REQUEST_DETAILS,
   REQUEST_FULL_DETAILS,
   USER_ACTIVE_REQUESTS,
   USER_REQUESTS_HISTORY,
   UPDATE_REQUEST,
   GOPA_SELLERS_FOR_BID_ASSIGNMENT,
   USER_REQUEST_OFFERS
} = require("../controllers/OrderRequestController");







const {
   ADD_BIDDING,
   BIDDING_DETAILS,
   BIDDING_FULL_DETAILS,
   UPDATE_BIDDING,
   REQUEST_BIDDINGS,
   SELLER_ACTIVE_BIDDINGS,
   SELLER_BIDDING_HISTORY,
   GOPA_ACTIVE_ASSIGNED_BIDDINGS,
   GOPA_ASSIGNED_BIDDING_HISTORY,
   GOPA_ACTIVE_BIDDINGS,
   GOPA_BIDDING_HISTORY,
   ADD_BDDING_IMAGE
} = require("../controllers/BiddingController");



const {
   ADD_CART,
   CART_DETAILS,
   CART_DETAILS_FULL,
   USER_CART,
   USER_CART_FULL
} = require("../controllers/CartController");








const {
   SERVICE_CHARGE_ADD,
   SERVICE_CHARGE_UPDATE,
   SERVICE_CHARGE_BY_ID,
   SERVICE_CHARGE_BY_TYPE
} = require("../controllers/ServiceChargeController");







const {
   WALLET_ADD,
   WALLET_UPDATE,
   WALLET_BY_ID,
   WALLET_BY_WALLET_NUMBER,
   WALLET_BY_USER_ID,
   WALLET_SYSTEM_WALLETS
} = require("../controllers/WalletController");





const {
   ADD_ADDRESS,
   UPDATE_ADDRESS,
   ADDRESS_DETAILS,
   USER_ADDRESSES
} = require("../controllers/AddressController");







const {
   ADD_INVOICE,
   INVOICE_DEATAILS,
   UPDATE_INVOICE,
   INVOICE_DEATAILS_FULL,
   USER_INVOICES,
   GOPA_PENDING_INVOICES,
   GOPA_ACCEPTED_INVOICES,
   INVOICE_READY_FOR_PICK_UP,
   ADD_INVOICE_ITEM,
   UPDATE_INVOICE_ITEM,
   INVOICE_ITEM_DEATAILS,
   INVOICE_ITEM_DEATAILS_FULL,
   ADD_INVOICE_WITH_ITEMS,
   INVOICE_DEATAILS_BY_QR,
   INVOICE_ITEM_DETAILS_BY_QR
} = require("../controllers/InvoiceController");




const {
   ADD_TRANSACTIONS
} = require("../controllers/TransactionController");





//test routes link
router.route("/testapi").get(TestController);



//user routes
router.route("/user/register").post(REGISTER);
router.route("/user/login").post(LOGIN);
router.route("/user/update").post(UPDATE);
router.route("/user/by-email/:email").get(USER_BY_EMAIL);
router.route("/user/by-phone/:phoneNumber").get(USER_BY_PHONE);
router.route("/user/by-id/:user_id").get(USER_BY_ID);
router.route("/user/by-id-full/:user_id").get(USER_BY_ID_FULL);
router.route("/user/gopa_sellers").get(GOPA_AND_SELLERS);
router.route("/user/users-by-sellers").post(USER_BY_SELLERS);
router.route("/user/all-admin-users").get(ALL_ADMIN);
router.route("/user/all-gopas").get(ALL_GOPAS);
router.route("/user/all-mepas").get(ALL_MEPAS);
router.route("/user/all-buyers").get(ALL_BUYERS);
router.route("/user/all-sellers").get(ALL_SELLERS);
router.route("/user/all-riders").get(ALL_RIDERS);





//otp routesx
router.route("/otp/create").post(CREATEOTP);
router.route("/otp/details").post(DETAILS);


//application
router.route("/application/add").post(ADD_APPLICATION);
router.route("/application/update").post(UPDATE_APPLICATION);
router.route("/application/by-id/:application_id").get(APPLICATION_BY_ID);
router.route("/application/all").get(ALL_APPLICATION);
router.route("/application/add-menus").post(ADD_APPLICATION_MENUS);



//Group
router.route("/group/add").post(ADD_GROUP);
router.route("/group/applications/:group_id").get(GROUP_APPLICATIONS);
router.route("/group/add-groupApplication-menus").post(ADD_GROUP_APPLICATION_MENUS);
router.route("/group/menus/:group_id").get(GROUP_MENUS);
router.route("/group/all").get(ALL_GROUPS);
router.route("/group/add-users-groups").post(ADD_USER_GROUPS);


//Permissions
router.route("/permission/add").post(ADD_PERMISSION);
router.route("/permission/all").get(ALL_PERMISSIONS);



//Role
router.route("/role/add").post(ADD_ROLE);
router.route("/role/add-role-permissions").post(ADD_ROLE_PERMISSIONS);
router.route("/role/all").get(ALL_ROLES);



//Identification
router.route("/identification/add").post(ADD_IDENTIFICATION);
router.route("/identification/user-identifications/:user_id").get(USER_IDENTIFICATIONS);



//Gopa
router.route("/gopa/add").post(PROFILE_GOPA);



//Seller
router.route("/seller/add").post(PROFILE_SELLER);
router.route("/seller/details/:seller_id").get(SELLER_DETAILS);
router.route("/seller/update").post(UPDATE_SELLER);
router.route("/seller/gopa-sellers/:gopa_id").get(GOPA_SELLERS);




//Mepa
router.route("/mepa/add").post(PROFILE_MEPA);


//Deliver
router.route("/deliver/add").post(PROFILE_DELIVER);
router.route("/deliver/details/:deliver_id").get(DELIVER_DETAILS);
router.route("/deliver/update").post(UPDATE_DELIVER);

router.route("/deliver/add-vehicle").post(PROFILE_DELIVER_VEHICLE);
router.route("/deliver/vehicle-details/:vehicle_id").get(DELIVER_VEHICLE_DETAILS);
router.route("/deliver/update-vehicle").post(UPDATE_DELIVER_VEHICLE);
router.route("/deliver/vehicles/:deliver_id").get(DELIVER_VEHICLES);




//payment account
router.route("/payment-account/add").post(ADD_PAYMENT_ACCOUNT);



//product 
router.route("/product/add-manufacturer").post(ADD_MANUFACTURER);
router.route("/product/add-brand").post(ADD_BRAND);
router.route("/product/add-model").post(ADD_MODEL);
router.route("/product/add-spare-part").post(ADD_SPARE_PART);
router.route("/product/add-image").post(ADD_IMAGE);
router.route("/product/all-models").get(ALL_MODELS);
router.route("/product/all-brandes").get(ALL_BRANDS);
router.route("/product/all-manufacturers").get(ALL_MANUFATURERS);
router.route("/product/all-spare-parts").get(ALL_SPARE_PART);
router.route("/product/add-spare-part_single").post(ADD_SPARE_PART_SINGLE);
router.route("/product/spare-part-details/:spare_part_id").get(SPARE_PART_DETAILS);
router.route("/product/spare-part-details-by-code/:spare_part_code").get(SPARE_PART_DETAILS_BY_CODE);





//order request
router.route("/order-request/add").post(ADD_ORDER_REQUEST);
router.route("/order-request/details/:request_id").get(REQUEST_DETAILS);
router.route("/order-request/full-details/:request_id").get(REQUEST_FULL_DETAILS);
router.route("/order-request/user-active-requests/:user_id").get(USER_ACTIVE_REQUESTS);
router.route("/order-request/user-requests-history/:user_id").get(USER_REQUESTS_HISTORY);
router.route("/order-request/update").post(UPDATE_REQUEST);
router.route("/order-request/gopa-sellers-for-bidding/:gopa_id/:request_id").get(GOPA_SELLERS_FOR_BID_ASSIGNMENT);
router.route("/order-request/user-request-offers/:user_id").get(USER_REQUEST_OFFERS);





//bidding
router.route("/bidding/add").post(ADD_BIDDING);
router.route("/bidding/details/:bidding_id").get(BIDDING_DETAILS);
router.route("/bidding/full-details/:bidding_id").get(BIDDING_FULL_DETAILS);
router.route("/bidding/update").post(UPDATE_BIDDING);
router.route("/bidding/request-biddings/:request_id").get(REQUEST_BIDDINGS);
router.route("/bidding/seller-active-biddings/:seller_id").get(SELLER_ACTIVE_BIDDINGS);
router.route("/bidding/seller-bidding-history/:seller_id").get(SELLER_BIDDING_HISTORY);
router.route("/bidding/gopa-active-assign-bidding/:user_id").get(GOPA_ACTIVE_ASSIGNED_BIDDINGS);
router.route("/bidding/gopa-assign-bidding-history/:user_id").get(GOPA_ASSIGNED_BIDDING_HISTORY);
router.route("/bidding/gopa-active-biddings/:user_id").get(GOPA_ACTIVE_BIDDINGS);
router.route("/bidding/gopa-biddings-history/:user_id").get(GOPA_BIDDING_HISTORY);
router.route("/bidding/add-image").post(ADD_BDDING_IMAGE);






router.route("/cart/add").post(ADD_CART);
router.route("/cart/details/:cart_id").get(CART_DETAILS);
router.route("/cart/full-details/:cart_id").get(CART_DETAILS_FULL);
router.route("/cart/user-carts/:user_id").get(USER_CART);
router.route("/cart/full-user-carts/:user_id").get(USER_CART_FULL);



//Service charge
router.route("/service-charge/add").post(SERVICE_CHARGE_ADD);
router.route("/service-charge/update").post(SERVICE_CHARGE_UPDATE);
router.route("/service-charge/details-by-charge-id/:chargeID").get(SERVICE_CHARGE_BY_ID);
router.route("/service-charge/details-by-charge-type/:charge_type").get(SERVICE_CHARGE_BY_TYPE);


//wallet
router.route("/wallet/add").post(WALLET_ADD);
router.route("/wallet/update").post(WALLET_UPDATE);
router.route("/wallet/details-by-id/:walletID").get(WALLET_BY_ID);
router.route("/wallet/details-by-wallet-number/:WalletNumber").get(WALLET_BY_WALLET_NUMBER);
router.route("/wallet/details-by-user-id/:User_ID").get(WALLET_BY_USER_ID);
router.route("/wallet/system-wallets").get(WALLET_SYSTEM_WALLETS);

//address
router.route("/address/add").post(ADD_ADDRESS);
router.route("/address/update").post(UPDATE_ADDRESS);
router.route("/address/details/:address_id").get(ADDRESS_DETAILS);
router.route("/address/user-address/:user_id").get(USER_ADDRESSES);






//Invoice and invoice items
router.route("/invoice/add").post(ADD_INVOICE);
router.route("/invoice/add-with-items").post(ADD_INVOICE_WITH_ITEMS);
router.route("/invoice/update").post(UPDATE_INVOICE);
router.route("/invoice/details/:invoice_id").get(INVOICE_DEATAILS);
router.route("/invoice/details-by-QR/:qr_value").get(INVOICE_DEATAILS_BY_QR);
router.route("/invoice/details-full/:invoice_id").get(INVOICE_DEATAILS_FULL);
router.route("/invoice/user-invoices/:user_id/:status?").get(USER_INVOICES);
router.route("/invoice/for-gopa-acceptance").get(GOPA_PENDING_INVOICES);
router.route("/invoice/gopa-accepted-invoices/:gopa_user_id").get(GOPA_ACCEPTED_INVOICES);
router.route("/invoice/ready-for-pick-up").get(INVOICE_READY_FOR_PICK_UP);
router.route("/invoice/add-item").post(ADD_INVOICE_ITEM);
router.route("/invoice/update-item").post(UPDATE_INVOICE_ITEM);
router.route("/invoice/item-details/:item_id").get(INVOICE_ITEM_DEATAILS);
router.route("/invoice/item-details-full/:item_id").get(INVOICE_ITEM_DEATAILS_FULL);
router.route("/invoice/item-details-by-QR/:qr_value").get(INVOICE_ITEM_DETAILS_BY_QR);







//Transactions
router.route("/transactions/add-many").post(ADD_TRANSACTIONS);






module.exports = router;