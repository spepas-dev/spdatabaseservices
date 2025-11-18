
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};


ussd.add = async (data) => {
    try {
        const newContinent = await prisma.wallet.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving wallet details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.update = async (wallet) => {
    try {
   
        const updatedContinent = await prisma.wallet.update({
            where:{
                walletID: wallet.walletID
            },
            data: wallet
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating wallet details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};







ussd.detailsByIDMinor = async (walletID) => {
    try {
        const user = await prisma.wallet.findFirst({
            where: {
                walletID: walletID
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







ussd.detailsByID = async (walletID) => {
    try {
        const user = await prisma.wallet.findFirst({
            where: {
                walletID: walletID,
                status: 1
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




ussd.detailsByWalletNumber = async (WalletNumber) => {
    try {
        const user = await prisma.wallet.findFirst({
            where: {
                WalletNumber: WalletNumber,
                status: 1
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


  ussd.detailsByUserID = async (User_ID) => {
    try {
        const user = await prisma.wallet.findFirst({
            where: {
                User_ID: User_ID,
                status: 1
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






  ussd.systemAccounts = async () => {
    try {
        
        const user = await prisma.wallet.findMany({
            where: {
                status: 1,
                wallet_type: {
                    not: "USER"  // Correct syntax
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






