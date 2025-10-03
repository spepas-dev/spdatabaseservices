
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");


let ussd = {};


ussd.login = async (email, password) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            },
            include:{
                gopa:true,
                mepa: true,
                sellerDetails: true,
                deliver: {
                    include:{
                        vehicles: true
                    }
                },
                paymentAccounts: true,
                user_groups:{
                    include:{
                        group: true
                    }
                },
                user_roles:{
                    include:{
                        role:{
                            include: {
                                rolePermissions:{
                                    include:{
                                        permision: true
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





  ussd.userByIDFull = async (User_ID) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                User_ID: User_ID
            },

            include:{
                gopa:true,
                mepa: true,
                sellerDetails: true,
                deliver: {
                    include:{
                        vehicles: true
                    }
                },
                paymentAccounts: true,
                user_groups:{
                    include:{
                        group: true
                    }
                },
                user_roles:{
                    include:{
                        role:{
                            include: {
                                rolePermissions:{
                                    include:{
                                        permision: true
                                    }
                                }
                            }
                        }
                    }
                }

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



  ussd.userByEmail = async (email) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email
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



  ussd.userByPhone = async (phoneNumber) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                phoneNumber: phoneNumber
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



  ussd.userByPhoneFull = async (phoneNumber) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                phoneNumber: phoneNumber
            },
            include:{
                gopa:true,
                mepa: true,
                sellerDetails: true,
                deliver: {
                    include:{
                        vehicles: true
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


  


  ussd.userByID = async (User_ID) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                User_ID: User_ID
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



ussd.register = async (user) => {
    try {
        const newContinent = await prisma.user.create({
            data: user
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error registering user:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};





ussd.update = async (User_ID, user) => {
    try {
        console.log("XXXXXXXXXXXXXXXXX updating user now")
        console.log(user)
        const updatedContinent = await prisma.user.update({
            where:{
                User_ID: User_ID
            },
            data: user
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating user details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};







ussd.gopaAndSeller = async () => {
    try {
        const schools = await prisma.user.findMany({
           
            where: {
                OR:[
                    { user_type: "GOPA" },
                    { user_type: "SELLER",  
                    sellerDetails: {
                        gopa: null, 
                      }}
                ]
            },
            orderBy: {
                createdAt: 'asc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                gopa: true,
                sellerDetails: true
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






ussd.UserBySellers = async (sellerIDs) => {
    try {
        const schools = await prisma.user.findMany({
           
            where: {
                Seller_ID: { in: sellerIDs }, // Check if Seller_ID is in the provided list
               status: 1, // Ensure the status is 1
            },
            orderBy: {
                createdAt: 'asc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                sellerDetails: true,
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
  




  ussd.usersByType = async (type) => {
    try {
        const schools = await prisma.user.findMany({
           
            where:{
                user_type: type
            },
            orderBy: {
                createdAt: 'asc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                gopa: true,
                sellerDetails: true
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




  ussd.Gopas = async () => {
    try {
        const schools = await prisma.user.findMany({
            where: {
                gopa: {
                    isNot: null
                }
            },
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                gopa: true,
                sellerDetails: true
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




ussd.Mepas = async () => {
    try {
        const schools = await prisma.user.findMany({
            where: {
                mepa: {
                    isNot: null
                }
            },
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                gopa: true,
                sellerDetails: true
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


ussd.Sellers = async () => {
    try {
        const schools = await prisma.user.findMany({
            where: {
                sellerDetails: {
                    isNot: null
                }
            },
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                gopa: true,
                sellerDetails: true
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


ussd.Riders = async () => {
    try {
        const schools = await prisma.user.findMany({
            where: {
                deliver: {
                    isNot: null
                }
            },
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                gopa: true,
                sellerDetails: true
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