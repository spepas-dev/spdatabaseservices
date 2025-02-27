
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};



ussd.add = async (data) => {
    try {
        const newContinent = await prisma.paymentAccount.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving payment details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};















module.exports = ussd