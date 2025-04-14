
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


ussd.addInvoiceWithItems = async (invoice, invoiceItems) => {
    try {
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        console.log(invoice)
        console.log(invoiceItems)
        const newInvoice = await prisma.invoice.create({
            data: {
                ...invoice,
                items: {
                    create: invoiceItems.map(item => ({
                        ...item
                    }))
                }
            },
            include: {
                items: true // Optional: include the created items in response
            }
        });

        return newInvoice;
    } catch (error) {
        console.error("Error creating invoice with items:", error);
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
                           include:{
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



ussd.InvoiceDetailsByQR = async (qr_value) => {
    try {
        const user = await prisma.invoice.findFirst({
            where: {
                qr_value: qr_value
            },
            include:{
                address: true,
                user: true,
                gopa: true,
                items:{
                    include:{
                        cart:{
                           include:{
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
                ...(status && {
                    status: {
                      equals: status
                    }
                  })
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
                           include:{
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
                gopa_user_id: null,
                paymentStatus: 1 //ensure payment is successful before assigned
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
                            include:{
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
                paymentStatus: 1
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
                            include:{
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
                paymentStatus: 1
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
                          include:{
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


ussd.addInvoiceItems = async (invoiceItem) => {
    try {
        
        const newContinent = await prisma.invoice_Item.create({
            data: invoiceItem
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
                    include:{
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






ussd.InvoiceItemDetailsByQR = async (qr_value) => {
    try {
        const user = await prisma.invoice_Item.findFirst({
            where: {
                qr_value: qr_value
            },
          
            include:{
                invoice: true,
                cart:{
                    include:{
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






  ussd.InvoiceItems = async (invoice_id, status) => {
    try {
        const user = await prisma.invoice_Item.findMany({
            where: {
                ...(status && {
                    status: {
                      equals: status
                    }
                  }),
                  ...(status && {
                    status: {
                      equals: status
                    }
                  })
            },
            orderBy:{
                createdAt: 'desc',
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