require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};



ussd.Add = async (data) => {
    try {
     

        const result = await prisma.sliderImages.create({
            data: data,
          });
        return result;
    } catch (error) {
        console.error("Error creating record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};


ussd.details = async (sliderID) => {
    try {
        const user = await prisma.sliderImages.findFirst({
            where: {
                slider_id: sliderID
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





ussd.update = async (slider_id, slider) => {
    try {
     
        const updatedContinent = await prisma.sliderImages.update({
            where:{
                slider_id: slider_id
            },
            data: slider
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating details:", error);
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
        const schools = await prisma.sliderImages.findMany({
           
           
            orderBy: {
                date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                inputter: true
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








ussd.active = async () => {
    try {
        const schools = await prisma.sliderImages.findMany({
           
            where: {
                status:1
            },
            orderBy: {
                date_added: 'asc', // Ensure your field is correct (createdAt or date_added)
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










module.exports = ussd