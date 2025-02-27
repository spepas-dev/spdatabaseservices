
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};




ussd.add = async (data) => {
    try {
        const newContinent = await prisma.orderRequest.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error order request:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.userActiveRequest = async (userID) => {
    try {
        const schools = await prisma.orderRequest.findMany({
           
            where: {
              status: 0,
              User_ID: userID
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                bidings:{
                    where:{
                     status:1
                    },
                    include:{
                        images: true,
                        assigner: true,
                        seller: true
                    },
                    orderBy: {
                        createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
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
        });
  
            return schools;
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
  






ussd.userRequestHistory = async (userID) => {
    try {
        const schools = await prisma.orderRequest.findMany({
           
            where: {
              User_ID: userID
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                bidings:{
                   include:{
                    images: true,
                    assigner: true,
                    seller: true
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
        });
  
            return schools;
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
  




ussd.details = async (request_id) => {
    try {
        const user = await prisma.orderRequest.findFirst({
            where: {
                request_ID: request_id
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





ussd.fullDetails = async (request_id) => {
    try {
        const user = await prisma.orderRequest.findFirst({
            where: {
                request_ID: request_id
            },
            include:{
                bidings:{
                   include:{
                    images: true,
                    assigner: true,
                    seller: true
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
                },
                requester:{
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





  ussd.update = async (request_id, request) => {
    try {
   
        const updatedContinent = await prisma.orderRequest.update({
            where:{
                request_ID: request_id
            },
            data: request
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating request details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};









ussd.GopaSellerForBiddingAssignment = async (gopa_id, request_id) => {
    try {
        const schools = await prisma.seller.findMany({
           
            where: {
                Gopa_ID: gopa_id,
                AND:{
                    biddings:{
                        none:{
                            request_ID: request_id
                        }
                    }
                }
            },
            orderBy: {
                date_added: 'asc', // Ensure your field is correct (createdAt or date_added)
            }
           
        });
  
            return schools;
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
  







ussd.UserActiveRequestOffer = async (user_id) => {
    try {
        const schools = await prisma.orderRequest.findMany({
           
            where: {
                status: 0,
                User_ID: user_id
               
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                bidings:{
                    where:{
                        status: 1
                    },
                    include:{
                        images: true,
                        seller: true,
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
                },



            }
           
        });
  
            return schools;
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