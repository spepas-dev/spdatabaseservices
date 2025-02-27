
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};



ussd.add = async (data) => {
    try {
        const newContinent = await prisma.bidding.createMany({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error adding bidding details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};





ussd.addImage = async (data) => {
    try {
        const newContinent = await prisma.biddingImage.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error adding bidding image details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.details = async (bidding_id) => {
    try {
        const user = await prisma.bidding.findFirst({
            where: {
                bidding_ID: bidding_id
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




  ussd.update = async (bidding_id, bid) => {
    try {
   
        const updatedContinent = await prisma.bidding.update({
            where:{
                bidding_ID: bidding_id
            },
            data: bid
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating bidding details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};






ussd.fullDetails = async (bidding_id) => {
    try {
        const user = await prisma.bidding.findFirst({
            where: {
                bidding_ID: bidding_id
            },
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




  

ussd.requestBiddings = async (request_id) => {
    try {
        const schools = await prisma.bidding.findMany({
           
            where: {
                request_ID: request_id
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
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
  



    

ussd.sellerActiveBiddings = async (seller_id) => {
    try {
        const schools = await prisma.bidding.findMany({
           
            where: {
                Seller_ID: seller_id,
                status: 0
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
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
  




  ussd.sellerBiddingHistory = async (seller_id) => {
    try {
        const schools = await prisma.bidding.findMany({
           
            where: {
                Seller_ID: seller_id
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
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






ussd.gopaActiveAssignBiddings = async (user_id) => {
    try {
        const schools = await prisma.bidding.findMany({
           
            where: {
                assigned_by: user_id,
                status: 0
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
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
  



ussd.gopaAssignBiddingHistory = async (user_id) => {
    try {
        const schools = await prisma.bidding.findMany({
           
            where: {
                assigned_by: user_id,
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
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
  











      

ussd.gopaActiveBiddings = async (user_id) => {
    try {
        const schools = await prisma.bidding.findMany({
           
            where: {
                gopa_user_ID: user_id,
                status: 0
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
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
  




  ussd.gopaBiddingHistory = async (user_id) => {
    try {
        const schools = await prisma.bidding.findMany({
           
            where: {
                gopa_user_ID: user_id,
            },
            orderBy: {
                createdAt: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
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