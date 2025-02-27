
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};





ussd.add = async (data, bidding_ID) => {
    try {
        const cart = await prisma.cart.upsert({
            where: {
              bidding_ID_User_ID: 
              { 
                bidding_ID, 
                User_ID: data.User_ID

             }, // Ensures uniqueness constraint
            },
            update: {
              status: data.status ?? 0, // Update the status if the cart already exists
              createdAt: new Date()
            },
            create: {
              bidding_ID: bidding_ID, // Create new cart if it doesn't exist
              User_ID: data.User_ID,
            },
          });
          


        return cart;
    } catch (error) {
        console.error("Error saving deliver details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};





ussd.details = async (cart_ID) => {
    try {
        const user = await prisma.cart.findFirst({
            where: {
                cart_ID: cart_ID
            },
          });
  
        return user;
    } catch (error) {
        console.error("Error retrieving record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
  };





ussd.fullDetails = async (cart_ID) => {
    try {
        const user = await prisma.cart.findFirst({
            where: {
                cart_ID: cart_ID,
            },
            include:{
                user:{
                    select:{
                        id: true,
                        User_ID: true,
                        name: true,
                        email: true,
                        phoneNumber: true,
                        verificationStatus: true,
                        status: true,
                        user_type: true,
                        Seller_ID: true,
                        referral_Code: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
                bid:{
                    include:{
                        seller:true,
                        images:true,
                        gopa: {
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
                        assigner:{
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
                        orderRequest:{
                            include:{
                                requester:{
                                   select:{
                                    User_ID: true,
                                    name: true
                                   }
                                },
                                creater:{
                                   select:{
                                    User_ID: true,
                                    name: true
                                   }
                                },
                                sparePart:{
                                    include:{
                                        images: true,
                                        carModel:{
                                            include:{
                                                carBrand:{
                                                    include:{
                                                        manufacturer: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                    }
                }

            }
            
          });
  
        return user;
    } catch (error) {
        console.error("Error retrieving record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
  };






  ussd.userCarts = async (user_ID) => {
    try {
        console.log(user_ID)
        const user = await prisma.cart.findMany({
            where: {
                User_ID: user_ID,
                status: 0,
                bid:{
                    status: 1 // to be sure seller hasnt opted out from bid
                }
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            }
           
            
          });
  
        return user;
    } catch (error) {
        console.error("Error retrieving record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
  };






ussd.userCartsFull = async (user_ID) => {
    try {
        const user = await prisma.cart.findMany({
            where: {
                User_ID: user_ID,
                status: 0,
                bid:{
                    status: 1 // to be sure seller hasnt opted out from bid
                }
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                user:{
                    select:{
                        id: true,
                        User_ID: true,
                        name: true,
                        email: true,
                        phoneNumber: true,
                        verificationStatus: true,
                        status: true,
                        user_type: true,
                        Seller_ID: true,
                        referral_Code: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
                bid:{
                    include:{
                        seller:true,
                        images:true,
                        gopa: {
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
                        assigner:{
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
                        orderRequest:{
                            include:{
                                requester:{
                                   select:{
                                    User_ID: true,
                                    name: true
                                   }
                                },
                                creater:{
                                   select:{
                                    User_ID: true,
                                    name: true
                                   }
                                },
                                sparePart:{
                                    include:{
                                        images: true,
                                        carModel:{
                                            include:{
                                                carBrand:{
                                                    include:{
                                                        manufacturer: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                    }
                }

            }
            
          });
  
        return user;
    } catch (error) {
        console.error("Error retrieving record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
  };

















module.exports = ussd