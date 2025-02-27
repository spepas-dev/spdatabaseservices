
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};




ussd.add = async (data) => {
    try {
        data.status = 1;
        const newContinent = await prisma.mepa.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving mepa details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};










module.exports = ussd