
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};



ussd.addManufacturer = async (data) => {
    try {
        const newContinent = await prisma.manufacturer.createMany({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving manufacturer details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};





ussd.addBrand = async (data) => {
    try {
        const newContinent = await prisma.carBrand.createMany({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving car brand details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};



ussd.addModel = async (data) => {
    try {
        const newContinent = await prisma.carModel.createMany({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving car model details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.addSparePart = async (data) => {
    try {
        const newContinent = await prisma.sparePart.createMany({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving spare part details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};






ussd.addSparePartSingle = async (data) => {
    try {
        const newContinent = await prisma.sparePart.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving spare part details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};


ussd.addImage = async (data) => {
    try {
        const newContinent = await prisma.sparePartImage.create({
            data: data
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error saving image details:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};





ussd.allModels = async () => {
    try {
        const schools = await prisma.carModel.findMany({
           
            where: {
              status: 1
            },
            orderBy: {
                name: 'asc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                spareParts: {
                    where: {
                        status: 1
                      },
                      orderBy: {
                        name: 'asc', 
                    },
                    include:{
                        images: true
                    }
                },
                carBrand:{
                    include:{
                        manufacturer: true
                    }
                }
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
  







ussd.AllBrands = async () => {
    try {
        const schools = await prisma.carBrand.findMany({
           
            where: {
              status: 1
            },
            orderBy: {
                name: 'asc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                manufacturer: true,
                models:{
                    orderBy: {
                        name: 'asc', 
                    },
                    where: {
                        status: 1
                      },
                      include:{
                        spareParts:{
                            where: {
                                status: 1
                              },
                              orderBy: {
                                name: 'asc', 
                            },
                            include:{
                                images: true
                            }
                        }
                      }
                }
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
  





ussd.AllManufacturers = async () => {
    try {
        const schools = await prisma.manufacturer.findMany({
           
            where: {
              status: 1
            },
            orderBy: {
                name: 'asc', // Ensure your field is correct (createdAt or date_added)
            },

            include:{
                brands:{
                    include:{
                        models:{
                            orderBy: {
                                name: 'asc', 
                            },
                            where: {
                                status: 1
                              },
                              include:{
                                spareParts:{
                                    where: {
                                        status: 1
                                      },
                                      orderBy: {
                                        name: 'asc', 
                                    },
                                    include:{
                                        images: true
                                    }
                                }
                              }
                        }
                    }
        
                }
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
  







  ussd.AllSpareParts = async () => {
    try {
        const schools = await prisma.sparePart.findMany({
           
            where: {
              status: 1
            },
            orderBy: {
                name: 'asc', // Ensure your field is correct (createdAt or date_added)
            },
            include:{
                images: true,
                carModel:{
                    include:{
                        carBrand:{
                            include:{
                                manufacturer: true
                            }
                        }
                    }
                }
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
  





ussd.SparePartDetails = async (spare_part_ID) => {
    try {
        const user = await prisma.sparePart.findFirst({
            where: {
                SparePart_ID: spare_part_ID
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




  ussd.SparePartByCode = async (id) => {
    try {
        const user = await prisma.sparePart.findFirst({
            where: {
                id: Number(id)
            },
            include:{
                images: true,
                carModel:{
                    include:{
                        carBrand:{
                            include:{
                                manufacturer: true
                            }
                        }
                    }
                }
            }
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