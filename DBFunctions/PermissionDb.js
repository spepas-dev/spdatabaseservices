
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};





ussd.addPermissions = async (permissions) => {
    try {
     

        const result = await prisma.permission.createMany({
            data: permissions,
          });
        return result;
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






ussd.allPermissions = async () => {
    try {
      const applications = await prisma.permission.findMany({
        where: {
          status: {
            not: ProcessStatus.BLOCKED, // Status is not equal to 100
          },
        },
        orderBy: {
          date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
      }
      });
  
      return applications;
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