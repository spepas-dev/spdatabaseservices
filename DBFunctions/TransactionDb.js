
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};




ussd.add = async (transaction) => {
    try {
        
        const newContinent = await prisma.transaction.create({
            data: transaction
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



ussd.addTransactions = async (transactions) => {
    try {
        const newRecords = await prisma.transaction.createMany({
            data: transactions
        });

        return newRecords;
    } catch (error) {
        console.error("Error creating transaction records:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};


module.exports = ussd