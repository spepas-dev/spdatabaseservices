const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
let ussd = {};


ussd.add = async (user) => {
    try {
        const newContinent = await prisma.oTPManager.create({
            data: user
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving OTP:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.otpManagerDetails = async (otpID, otp) => {
    try {
        const today = new Date();
        const user = await prisma.oTPManager.findFirst({
            where: {
                otpID: otpID,
                otpHarshed: otp,
                expiryDate: {
                  gte: today,
                },
            },
          });
  
        return user;
    } catch (error) {
        console.error("Error retrieving otp details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
  };

  module.exports = ussd