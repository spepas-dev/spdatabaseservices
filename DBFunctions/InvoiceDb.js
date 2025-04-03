
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus,INVOICE_STATUS } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};



ussd.addInvoice = async (inoice) => {
    try {
        
        const newContinent = await prisma.invoice.create({
            data: inoice
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error creating invoice record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};



ussd.updateInvoice = async (invoice) => {
    try {
        const updatedContinent = await prisma.invoice.update({
            where:{
                invoice_id: invoice.invoice_id
            },
            data: invoice
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating invoice record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.InvoiceDetails = async (invoice_id) => {
    try {
        const user = await prisma.invoice.findFirst({
            where: {
                invoice_id: invoice_id
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





ussd.InvoiceDetailsFull = async (invoice_id) => {
    try {
        const user = await prisma.invoice.findFirst({
            where: {
                invoice_id: invoice_id
            },
            include:{
                address: true,
                user: true,
                gopa: true,
                items:{
                    include:{
                        cart:{
                            bid:{
                                include:{
                                    seller:true,
                                    images:true,
                                    gopa: {
                                        select:{
                                            User_ID: true,
                                            name: true
                                        }
                                    },
                                    assigner:{
                                        select:{
                                            User_ID: true,
                                            name: true
                                        }
                                    },
                                    orderRequest:{
                                        include:{
                                            requester:{
                                               select:{
                                                User_ID: true,
                                                name: true
                                               }
                                            },
                                            creater:{
                                               select:{
                                                User_ID: true,
                                                name: true
                                               }
                                            },
                                            sparePart:{
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
                                            }
                                        }
                                    }
                                    
                                }
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





ussd.UserInvoicesByStatus = async (user_id, status) => {
    try {
        const user = await prisma.invoice.findMany({
            where: {
                User_ID: user_id,
                status: status
            },
            orderBy:{
                createdAt: 'desc',
            },
            include:{
                address: true,
                user: true,
                gopa: true,
                items:{
                    include:{
                        cart:{
                            bid:{
                                include:{
                                    seller:true,
                                    images:true,
                                    gopa: {
                                        select:{
                                            User_ID: true,
                                            name: true
                                        }
                                    },
                                    assigner:{
                                        select:{
                                            User_ID: true,
                                            name: true
                                        }
                                    },
                                    orderRequest:{
                                        include:{
                                            requester:{
                                               select:{
                                                User_ID: true,
                                                name: true
                                               }
                                            },
                                            creater:{
                                               select:{
                                                User_ID: true,
                                                name: true
                                               }
                                            },
                                            sparePart:{
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
                                            }
                                        }
                                    }
                                    
                                }
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







ussd.PendingInvoiceForGopa = async () => {
    try {
        const user = await prisma.invoice.findMany({
            where: {
                status: INVOICE_STATUS.PENDING,
                aggregate: 1,
            },
            orderBy:{
                createdAt: 'desc',
            },
            include:{
                address: true,
                user: true,
                gopa: true,
                items:{
                    include:{
                        cart:{
                            bid:{
                                include:{
                                    seller:true,
                                    images:true,
                                    gopa: {
                                        select:{
                                            User_ID: true,
                                            name: true
                                        }
                                    },
                                    assigner:{
                                        select:{
                                            User_ID: true,
                                            name: true
                                        }
                                    },
                                    orderRequest:{
                                        include:{
                                            requester:{
                                               select:{
                                                User_ID: true,
                                                name: true
                                               }
                                            },
                                            creater:{
                                               select:{
                                                User_ID: true,
                                                name: true
                                               }
                                            },
                                            sparePart:{
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
                                            }
                                        }
                                    }
                                    
                                }
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





ussd.GopaAcceptedInvoices = async (gopa_user_id) => {
    try {
        const user = await prisma.invoice.findMany({
            where: {
                gopa_user_id: gopa_user_id,
            },
            orderBy:{
                createdAt: 'desc',
            },
            include:{
                address: true,
                user: true,
                gopa: true,
                items:{
                    include:{
                        cart:{
                            bid:{
                                include:{
                                    seller:true,
                                    images:true,
                                    gopa: {
                                        select:{
                                            User_ID: true,
                                            name: true
                                        }
                                    },
                                    assigner:{
                                        select:{
                                            User_ID: true,
                                            name: true
                                        }
                                    },
                                    orderRequest:{
                                        include:{
                                            requester:{
                                               select:{
                                                User_ID: true,
                                                name: true
                                               }
                                            },
                                            creater:{
                                               select:{
                                                User_ID: true,
                                                name: true
                                               }
                                            },
                                            sparePart:{
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
                                            }
                                        }
                                    }
                                    
                                }
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







ussd.InvoiceReadyForPickUpByDelivery = async () => {
    try {
        const user = await prisma.invoice.findMany({
            where: {
                status: INVOICE_STATUS.READY_TO_BE_SHIPPED,
                aggregate: 1,
            },
            orderBy:{
                createdAt: 'desc',
            },
            include:{
                address: true,
                user: true,
                gopa: true,
                items:{
                    include:{
                        cart:{
                            bid:{
                                include:{
                                    seller:true,
                                    images:true,
                                    gopa: {
                                        select:{
                                            User_ID: true,
                                            name: true
                                        }
                                    },
                                    assigner:{
                                        select:{
                                            User_ID: true,
                                            name: true
                                        }
                                    },
                                    orderRequest:{
                                        include:{
                                            requester:{
                                               select:{
                                                User_ID: true,
                                                name: true
                                               }
                                            },
                                            creater:{
                                               select:{
                                                User_ID: true,
                                                name: true
                                               }
                                            },
                                            sparePart:{
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
                                            }
                                        }
                                    }
                                    
                                }
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




  //Invoice Items management


ussd.addInvoiceItem = async (inoicItem) => {
    try {
        
        const newContinent = await prisma.invoice_Item.create({
            data: inoicItem
          });
          
        return newContinent;
    } catch (error) {
        console.error("Error creating invoice item record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};



ussd.updateInvoiceItem = async (invoiceItem) => {
    try {
        const updatedContinent = await prisma.invoice_Item.update({
            where:{
                item_id: invoiceItem.item_id
            },
            data: invoiceItem
          });
          
        return updatedContinent;
    } catch (error) {
        console.error("Error updating invoice item record:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};





ussd.InvoiceItemDetails = async (item_id) => {
    try {
        const user = await prisma.invoice_Item.findFirst({
            where: {
                item_id: item_id
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





ussd.InvoiceItemDetailsFull = async (item_id) => {
    try {
        const user = await prisma.invoice_Item.findFirst({
            where: {
                item_id: item_id
            },
          
            include:{
                invoice: true,
                cart:{
                    bid:{
                        include:{
                            seller:true,
                            images:true,
                            gopa: {
                                select:{
                                    User_ID: true,
                                    name: true
                                }
                            },
                            assigner:{
                                select:{
                                    User_ID: true,
                                    name: true
                                }
                            },
                            orderRequest:{
                                include:{
                                    requester:{
                                       select:{
                                        User_ID: true,
                                        name: true
                                       }
                                    },
                                    creater:{
                                       select:{
                                        User_ID: true,
                                        name: true
                                       }
                                    },
                                    sparePart:{
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
                                    }
                                }
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





  //this is the function to call when delivery person goes to seller for the Item
  //seller has to scan the QR code the delivery person will provide
  ussd.InvoiceItemBySellerIDandQR = async (seller_id, qr_value) => {
    try {
        const user = await prisma.invoice_Item.findFirst({
            where: {
                qr_value: qr_value,
                cart: {
                    bid: {
                        Seller_ID: seller_id // Ensure the seller_id is part of the where clause
                    }
                }
            },
          
            include:{
                invoice: true,
                cart:{
                    bid:{
                        include:{
                            seller:true,
                            images:true,
                            gopa: {
                                select:{
                                    User_ID: true,
                                    name: true
                                }
                            },
                            assigner:{
                                select:{
                                    User_ID: true,
                                    name: true
                                }
                            },
                            orderRequest:{
                                include:{
                                    requester:{
                                       select:{
                                        User_ID: true,
                                        name: true
                                       }
                                    },
                                    creater:{
                                       select:{
                                        User_ID: true,
                                        name: true
                                       }
                                    },
                                    sparePart:{
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
                                    }
                                }
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






ussd.GetUnAssaignedInvoiceItemsForDelivery = async () => {
    try {
        const user = await prisma.invoice_Item.findFirst({
            where: {
                status: INVOICE_STATUS.PENDING,
                aggregate: 0
            },
          
            include:{
                invoice: true,
                cart:{
                    bid:{
                        include:{
                            seller:true,
                            images:true,
                            gopa: {
                                select:{
                                    User_ID: true,
                                    name: true
                                }
                            },
                            assigner:{
                                select:{
                                    User_ID: true,
                                    name: true
                                }
                            },
                            orderRequest:{
                                include:{
                                    requester:{
                                       select:{
                                        User_ID: true,
                                        name: true
                                       }
                                    },
                                    creater:{
                                       select:{
                                        User_ID: true,
                                        name: true
                                       }
                                    },
                                    sparePart:{
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
                                    }
                                }
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