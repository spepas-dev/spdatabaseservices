
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};




ussd.add = async (application) => {
    try {
        
        const newContinent = await prisma.application.create({
            data: application
          });
          
        return newContinent;
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



ussd.update = async (application_id, aplication) => {
    try {
        const updatedContinent = await prisma.application.update({
            where:{
                application_id: application_id
            },
            data: aplication
          });
          
        return updatedContinent;
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




ussd.details = async (application_id) => {
    try {
        const user = await prisma.application.findFirst({
            where: {
              application_id: application_id
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
  



ussd.all = async () => {
    try {
        const schools = await prisma.application.findMany({
            select:{
             name: true,
             status: true,
             application_id: true,
             menus: true,
            },
            where: {
              status: 1
            },
            orderBy: {
                name: 'asc', // Ensure your field is correct (createdAt or date_added)
            }
        });
  
            return schools;
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
  










ussd.addApplicationMenus = async (applicationManus) => {
    try {
     

        const result = await prisma.applicationMenu.createMany({
            data: applicationManus,
          });
     
        /*
      const upserts = applicationManus.map(appMenu => {
        return prisma.applicationMenu.upsert({
          where: {
            menuID: appMenu.menuID,
          },
          update: {
            status: 1,
            title: appMenu.title,
            added_by:  appMenu.added_by
          },
          create: {
            title: appMenu.title,
            added_by:  appMenu.added_by,
            application_id: appMenu.application_id
          },
        });
      });
    */
        return result;
    } catch (error) {
        console.error("Error adding Application menu:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
  };
  





module.exports = ussd