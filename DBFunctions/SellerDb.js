
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};




ussd.add = async (data) => {
    try {
        const newContinent = await prisma.seller.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving seller details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.details = async (seller_id) => {
    try {
        const user = await prisma.seller.findFirst({
            where: {
                Seller_ID: seller_id
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




  ussd.update = async (seller_id, seller) => {
    try {
   
        const updatedContinent = await prisma.seller.update({
            where:{
                Seller_ID: seller_id
            },
            data: seller
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating seller details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};






ussd.gopaSellers = async (gopa_id) => {
    try {
        const schools = await prisma.seller.findMany({
           
            where: {
                Gopa_ID: gopa_id,
                status: 1
            },
            orderBy: {
                date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                users:{
                    select:{
                        User_ID: true,
                        name: true,
                        email: true,
                        phoneNumber: true,
                        verificationStatus: true,
                        user_type:true
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