
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};





ussd.add = async (address) => {
    try {
        
        const newContinent = await prisma.userAddress.create({
            data: address
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error creating address record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};


ussd.update = async (address) => {
    try {
        const updatedContinent = await prisma.userAddress.update({
            where:{
                address_id: address.address_id
            },
            data: address
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating address record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};



ussd.details = async (address_id) => {
    try {
        const user = await prisma.userAddress.findFirst({
            where: {
                address_id: address_id
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
  


  ussd.userAddress = async (user_id) => {
    try {
        const user = await prisma.userAddress.findMany({
            where: {
                User_ID: user_id
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
  






















module.exports = ussd