
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};





ussd.add = async (data) => {
    try {
        const newContinent = await prisma.serviceCharges.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving service charge details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.update = async (serviceCharge) => {
    try {
   
        const updatedContinent = await prisma.serviceCharges.update({
            where:{
                chargeID: serviceCharge.chargeID
            },
            data: serviceCharge
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating service charge details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};





ussd.detailsByID = async (chargeID) => {
    try {
        const user = await prisma.serviceCharges.findFirst({
            where: {
                chargeID: chargeID
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




ussd.detailsByType = async (charge_type) => {
    try {
        const user = await prisma.serviceCharges.findFirst({
            where: {
                charge_type: charge_type
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