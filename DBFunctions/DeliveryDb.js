
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus,INVOICE_STATUS } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};


ussd.add = async (delivery) => {
    try {
        
        const newContinent = await prisma.delivery.create({
            data: delivery
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error creating delivery record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};



ussd.updateInvoice = async (delivery) => {
    try {
        const updatedContinent = await prisma.delivery.update({
            where:{
                delivery_id: delivery.delivery_id
            },
            data: delivery
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating delivery record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.details = async (delivery_id) => {
    try {
        const user = await prisma.delivery.findFirst({
            where: {
                delivery_id: delivery_id
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