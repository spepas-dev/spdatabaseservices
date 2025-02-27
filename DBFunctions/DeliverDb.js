
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};





ussd.add = async (data) => {
    try {
        const newContinent = await prisma.deliver.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving deliver details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};


ussd.details = async (Deliver_ID) => {
    try {
        const user = await prisma.deliver.findFirst({
            where: {
                Deliver_ID: Deliver_ID
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


  ussd.update = async (Deliver_ID, deliver) => {
    try {
   
        const updatedContinent = await prisma.deliver.update({
            where:{
                Deliver_ID: Deliver_ID
            },
            data: deliver
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating delivery details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};










ussd.addVehicle = async (data) => {
    try {
        const newContinent = await prisma.deliverVehicle.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving deliver vehicle details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.vehicleDetails = async (Vehicle_ID) => {
    try {
        const user = await prisma.deliverVehicle.findFirst({
            where: {
                Vehicle_ID: Vehicle_ID
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





  ussd.updateVehicle = async (Vehicle_ID, vehicle) => {
    try {
   
        const updatedContinent = await prisma.deliverVehicle.update({
            where:{
                Vehicle_ID: Vehicle_ID
            },
            data: vehicle
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating delivery vehicle details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};





ussd.deliveryVehicles = async (Deliver_ID) => {
    try {
        const schools = await prisma.deliverVehicle.findMany({
         
            
            include: {
                user: {
                    select: {
                        User_ID: true,
                        name: true,
                        email: true,
                        phoneNumber: true,
                        verificationStatus: true,
                        status: true,
                        user_type: true

                    },
                }
             
            },
            where: {
              status: 1,
              Deliver_ID: Deliver_ID
            },
            orderBy: {
                date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
            }
        });
  
            return schools;
    } catch (error) {
        console.error("Error retrieving vehicle list:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
  };
  

module.exports = ussd