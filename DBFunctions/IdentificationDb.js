
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};



ussd.add = async (data) => {
    try {
        const newContinent = await prisma.userIdentification.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving Identification details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};



ussd.userIdentifications = async (userID) => {
    try {
        const schools = await prisma.userIdentification.findMany({
         
            
            include: {
                user: {
                    select: {
                        User_ID: true,
                        name: true,
                        email: true,
                        phoneNumber: true,
                        verificationStatus: true,
                        status: true,
                        user_type: true

                    },
                }
             
            },
            where: {
              status: 1,
              User_ID: userID
            },
            orderBy: {
                date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
            }
        });
  
            return schools;
    } catch (error) {
        console.error("Error retrieving identification list:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
  };
  









module.exports = ussd