
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






  ussd.PendingInvoicesToBeCompleted = async (invoice_ids) => {
    try {
        const invoices = await prisma.invoice.findMany({
            where: {
                invoice_id: {
                    in: invoice_ids
                }
            },
            include: {
                items: true
            }
        });

        // Filter invoices that only have items with status 1 or 100
        const filteredInvoices = invoices.filter(invoice => {
            return invoice.items.every(item => item.status === INVOICE_STATUS.DELIVERED || item.status === INVOICE_STATUS.CANCELLED);
        });

        // Transform the results to separate items by status
        const result = filteredInvoices.map(invoice => {
            const successList = invoice.items.filter(item => item.status === 1);
            const cancelledList = invoice.items.filter(item => item.status === 100);
            
            // Remove the original items array and add the separated lists
            const { items, ...invoiceWithoutItems } = invoice;
            
            // Update invoice status based on successList
            const updatedInvoice = {
                ...invoiceWithoutItems,
                status: successList.length > 0 ? INVOICE_STATUS.DELIVERED : INVOICE_STATUS.CANCELLED
            };
            
            return updatedInvoice;
        });

        return result;
    } catch (error) {
        console.error("Error retrieving records:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};






ussd.bulkUpdateInvoice= async (invoices) => {
    try {
        const updatedItems = await prisma.$transaction(
            invoices.map(invoice => 
                prisma.invoice.update({
                    where: {
                        invoice_id: invoice.invoice_id
                    },
                    data: invoice
                })
            )
        );
          
        return updatedItems;
    } catch (error) {
        console.error("Error updating invoice items records:", error);
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
                        tracker:true,
                        rider:{
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
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
                        rider:{
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
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
                        tracker: true,
                        rider:{
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
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




  ussd.SellerInvoicesByStatus = async (seller_id, status) => {
    try {
        const invoices = await prisma.invoice.findMany({
            where: {
                
                AND: [
                    {
                        paymentStatus: 1
                    },
                    {
                        status: {
                            not: 101
                        }
                    }
                ] ,

                // Filter invoices that have at least one item belonging to this seller
                items: {
                    some: {
                        ...(status && {
                            status: {
                                equals: status
                            }
                        }),
                        cart: {
                            bid: {
                                Seller_ID: seller_id
                            }
                        }
                    }
                }
            },
            orderBy:{
                createdAt: 'desc',
            },
            include:{
                address: true,
                user: true,
                gopa: true,
                items:{
                    where: {
                        ...(status && {
                            status: {
                                equals: status
                            }
                        }),
                        // Only include items that belong to this seller
                        cart: {
                            bid: {
                                Seller_ID: seller_id
                            }
                        }
                    },
                    include:{
                        tracker: true,
                        rider:{
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
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
  

        // Filter out invoices that have no items after our filtering
        const filteredInvoices = invoices.filter(invoice => invoice.items && invoice.items.length > 0);
       
        return filteredInvoices;
    } catch (error) {
        console.error("Error retrieving seller invoices:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};




ussd.addInvoiceItemTracker = async (trackers) => {
    try {
        
        const newTrackers = await prisma.invoice_Item_Tracker.createMany({
            data: trackers
        });
          
        return newTrackers;
    } catch (error) {
        console.error("Error creating tracker records:", error);
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
                        rider:{
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
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




ussd.bulkUpdateInvoiceItems = async (invoiceItems) => {
    try {
        const updatedItems = await prisma.$transaction(
            invoiceItems.map(invoiceItem => 
                prisma.invoice_Item.update({
                    where: {
                        item_id: invoiceItem.item_id
                    },
                    data: invoiceItem
                })
            )
        );
          
        return updatedItems;
    } catch (error) {
        console.error("Error updating invoice items records:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};







/*
ussd.bulkAcceptInvoiceItemsByRider = async (invoiceItems) => {
    try {
        const updatedItems = await prisma.$transaction(
            invoiceItems.map(invoiceItem => 
                prisma.invoice_Item.update({
                    where: {
                        AND:[
                            {
                        
                                item_id: invoiceItem.item_id
                            },
                            {
                        
                                riderAccepted: 0
                            }
                        ]
                      
                    },
                    data: invoiceItem
                })
            )
        );
          
        return updatedItems;
    } catch (error) {
        console.error("Error updating invoice items records:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
*/




// Fixed version with atomic update to prevent race conditions
ussd.bulkAcceptInvoiceItemsByRider = async (invoiceItems) => {
    try {
        const updatedItems = [];
        const failedUpdates = [];

        // Process each item individually to handle race conditions
        const updatePromises = invoiceItems.map(async (invoiceItem) => {
            try {
                const updatedItem = await prisma.invoice_Item.update({
                    where: {
                        item_id: invoiceItem.item_id,
                        riderAccepted: 0  // Atomic check: only update if still unaccepted
                    },
                    data: invoiceItem
                });
                return { success: true, item: updatedItem };
            } catch (error) {
                // If update fails, it means the item was already accepted by another rider
                if (error.code === 'P2025') { // Record not found - already accepted
                    return { 
                        success: false, 
                        item_id: invoiceItem.item_id, 
                        reason: 'Already accepted by another rider' 
                    };
                }
                throw error; // Re-throw unexpected errors
            }
        });

        const results = await Promise.all(updatePromises);
        
        results.forEach(result => {
            if (result.success) {
                updatedItems.push(result.item);
            } else {
                failedUpdates.push(result);
            }
        });

        return {
            updatedItems,
            failedUpdates,
            totalAttempted: invoiceItems.length,
            successCount: updatedItems.length,
            failureCount: failedUpdates.length
        };

    } catch (error) {
        console.error("Error updating invoice items records:", error);
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
                rider:{
                    select:{
                        User_ID: true,
                        name: true
                    }
                },
                invoice: true,
                tracker:true,
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
                rider:{
                    select:{
                        User_ID: true,
                        name: true
                    }
                },
                tracker:true,
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




  ussd.InvoiceItemDetailList = async (invoice_ids) => {
    try {
        console.log("XXXXXXXXXXXXXXXXXXXXXXX");
        console.log(invoice_ids);
        const invoices = await prisma.invoice_Item.findMany({
            where: {
                item_id: {
                    in: invoice_ids
                }
            },
        });

        console.log("XXXXXXXXXXXXXXXXXXXXXXX 2");
        console.log(invoices);
        return invoices;
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






ussd.InvoicesForRidersToAccept = async () => {
    try {
        // Query invoices with the specified conditions
        const invoices = await prisma.invoice.findMany({
            where: {
                AND: [
                    {
                        status: 0  // Invoice status is 0
                    },
                    {
                        paymentStatus: 1
                    },
                    {
                        items: {
                            some: {
                                AND:[
                                    {
                                        status: {
                                            in: [0, 3]  // Only include items with status 0 or 3
                                        }
                                    },
                                    {
                                        riderAccepted: 0
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            include: {
                items: {
                    where: {
                        AND:[
                            {
                                status: {
                                    in: [0, 3]  // Only include items with status 0 or 3
                                }
                            },{
                                riderAccepted: 0
                            }
                        ]
                       
                    },
                    include:{
                        tracker:true,
                        rider:{
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
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

                },
                address: true,
                user: true,
                gopa: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log("XXXXXXXXXXXXXXXX touble shooting")
        // Process and structure the data as requested
        const processedInvoices = invoices.map(invoice => {
            // Separate items by aggregate value
            console.log("XXXXXXXXXXXXXXXX List items")
            console.log(invoice.items)

            const aggregateItems = invoice.items.filter(item => item.aggregate === 1);
            const singleItems = invoice.items.filter(item => item.aggregate === 0);
            
            // Group aggregate items by expectedDeliveryDate
            const groupedByDate = aggregateItems.reduce((groups, item) => {
                const deliveryDate = item.expectedDeliveryDate 
                    ? item.expectedDeliveryDate.toISOString().split('T')[0]  // Convert to YYYY-MM-DD
                    : null;  // Handle null dates
                
                if (!groups[deliveryDate]) {
                    groups[deliveryDate] = [];
                }
                groups[deliveryDate].push(item);
                return groups;
            }, {});

            // Convert grouped object to array format
            const aggregatedDeliveries = Object.entries(groupedByDate).map(([date, items]) => ({
                date: date === 'null' ? null : date,
                items: items
            }));

            // Create the final structure (remove items from invoice object)
            const { items, ...invoiceWithoutItems } = invoice;

            return {
                invoice: invoiceWithoutItems,
                aggregatedDeliveries,
                SingleDeliveries: singleItems
            };
        });

        return processedInvoices;
    } catch (error) {
        console.error("Error retrieving invoices with structured items:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};






ussd.RiderInvoicesPendingPickups = async (rider_user_id) => {
    try {
        // Query invoices with the specified conditions
        const invoices = await prisma.invoice.findMany({
            where: {
                AND: [
                    {
                        status: 0  // Invoice status is 0
                    },
                    {
                        paymentStatus: 1
                    },
                    {
                        items: {
                            some: {
                                AND:[
                                    {
                                        status: {
                                            in: [3]  // Only include items ready for pickup
                                        }
                                    },
                                    {
                                        riderAccepted: 1
                                    },
                                    {
                                        rider_user_id: rider_user_id
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            include: {
                items: {
                    where: {
                        AND:[
                            {
                                status: {
                                    in: [0, 3]  // Include both items ready for pickup and ones pending for UI decision
                                }
                            },{
                                riderAccepted: 1
                            },
                            {
                                rider_user_id: rider_user_id
                            }
                        ]
                       
                    },
                    include:{
                        tracker:true,
                        rider:{
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
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
                },
                address: true,
                user: true,
                gopa: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log("XXXXXXXXXXXXXXXX touble shooting")
        // Process and structure the data as requested
        const processedInvoices = invoices.map(invoice => {
            // Separate items by aggregate value
            console.log("XXXXXXXXXXXXXXXX List items")
            console.log(invoice.items)

            const aggregateItems = invoice.items.filter(item => item.aggregate === 1);
            const singleItems = invoice.items.filter(item => item.aggregate === 0);
            
            // Group aggregate items by expectedDeliveryDate
            const groupedByDate = aggregateItems.reduce((groups, item) => {
                const deliveryDate = item.expectedDeliveryDate 
                    ? item.expectedDeliveryDate.toISOString().split('T')[0]  // Convert to YYYY-MM-DD
                    : null;  // Handle null dates
                
                if (!groups[deliveryDate]) {
                    groups[deliveryDate] = [];
                }
                groups[deliveryDate].push(item);
                return groups;
            }, {});

            // Convert grouped object to array format
            const aggregatedDeliveries = Object.entries(groupedByDate).map(([date, items]) => ({
                date: date === 'null' ? null : date,
                items: items
            }));

            // Create the final structure (remove items from invoice object)
            const { items, ...invoiceWithoutItems } = invoice;

            return {
                invoice: invoiceWithoutItems,
                aggregatedDeliveries,
                SingleDeliveries: singleItems
            };
        });

        return processedInvoices;
    } catch (error) {
        console.error("Error retrieving invoices with structured items:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};








ussd.RiderInvoicesToBeShipped = async (rider_user_id) => {
    try {
        // Query invoices with the specified conditions
        const invoices = await prisma.invoice.findMany({
            where: {
                AND: [
                    {
                        status: 0  // Invoice status is 0
                    },
                    {
                        paymentStatus: 1
                    },
                    {
                        items: {
                            some: {
                                AND:[
                                    {
                                        status: {
                                            in: [3, 4, 5]  //ready for pickup, ready to be shipped, Shipped
                                        }
                                    },
                                    {
                                        riderAccepted: 1
                                    },
                                    {
                                        rider_user_id: rider_user_id
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            include: {
                items: {
                    where: {
                        AND:[
                            {
                                status: {
                                    in: [3, 4, 5]  //ready for pickup, ready to be shipped, Shipped
                                }
                            },{
                                riderAccepted: 1
                            },
                            {
                                rider_user_id: rider_user_id
                            }
                        ]
                       
                    },
                    include:{
                        tracker:true,
                        rider:{
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
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
                },
                address: true,
                user: true,
                gopa: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log("XXXXXXXXXXXXXXXX touble shooting")
        // Process and structure the data as requested
        const processedInvoices = invoices.map(invoice => {
            // Separate items by aggregate value
            console.log("XXXXXXXXXXXXXXXX List items")
            console.log(invoice.items)

            const aggregateItems = invoice.items.filter(item => item.aggregate === 1);
            const singleItems = invoice.items.filter(item => item.aggregate === 0);
            
            // Group aggregate items by expectedDeliveryDate
            const groupedByDate = aggregateItems.reduce((groups, item) => {
                const deliveryDate = item.expectedDeliveryDate 
                    ? item.expectedDeliveryDate.toISOString().split('T')[0]  // Convert to YYYY-MM-DD
                    : null;  // Handle null dates
                
                if (!groups[deliveryDate]) {
                    groups[deliveryDate] = [];
                }
                groups[deliveryDate].push(item);
                return groups;
            }, {});

            // Convert grouped object to array format
            const aggregatedDeliveries = Object.entries(groupedByDate).map(([date, items]) => ({
                date: date === 'null' ? null : date,
                items: items
            }));

            // Create the final structure (remove items from invoice object)
            const { items, ...invoiceWithoutItems } = invoice;

            return {
                invoice: invoiceWithoutItems,
                aggregatedDeliveries,
                SingleDeliveries: singleItems
            };
        });

        return processedInvoices;
    } catch (error) {
        console.error("Error retrieving invoices with structured items:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};



















ussd.RiderInvoicesDelivered = async (rider_user_id) => {
    try {
        // Query invoices with the specified conditions
        const invoices = await prisma.invoice.findMany({
            where: {
                AND: [
                    {
                        paymentStatus: 1
                    },
                    {
                        items: {
                            some: {
                                AND:[
                                    {
                                        status: {
                                            in: [1]  //ready for pickup, ready to be shipped, Shipped
                                        }
                                    },
                                    {
                                        rider_user_id: rider_user_id
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            include: {
                items: {
                    where: {
                        AND:[
                            {
                                status: {
                                    in: [1]  //ready for pickup, ready to be shipped, Shipped
                                }
                            },
                            {
                                rider_user_id: rider_user_id
                            }
                        ]
                       
                    },
                    include:{
                        tracker:true,
                        rider:{
                            select:{
                                User_ID: true,
                                name: true
                            }
                        },
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
                },
                address: true,
                user: true,
                gopa: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log("XXXXXXXXXXXXXXXX touble shooting")
        // Process and structure the data as requested
        const processedInvoices = invoices.map(invoice => {
            // Separate items by aggregate value
            console.log("XXXXXXXXXXXXXXXX List items")
            console.log(invoice.items)

            const aggregateItems = invoice.items.filter(item => item.aggregate === 1);
            const singleItems = invoice.items.filter(item => item.aggregate === 0);
            
            // Group aggregate items by expectedDeliveryDate
            const groupedByDate = aggregateItems.reduce((groups, item) => {
                const deliveryDate = item.expectedDeliveryDate 
                    ? item.expectedDeliveryDate.toISOString().split('T')[0]  // Convert to YYYY-MM-DD
                    : null;  // Handle null dates
                
                if (!groups[deliveryDate]) {
                    groups[deliveryDate] = [];
                }
                groups[deliveryDate].push(item);
                return groups;
            }, {});

            // Convert grouped object to array format
            const aggregatedDeliveries = Object.entries(groupedByDate).map(([date, items]) => ({
                date: date === 'null' ? null : date,
                items: items
            }));

            // Create the final structure (remove items from invoice object)
            const { items, ...invoiceWithoutItems } = invoice;

            return {
                invoice: invoiceWithoutItems,
                aggregatedDeliveries,
                SingleDeliveries: singleItems
            };
        });

        return processedInvoices;
    } catch (error) {
        console.error("Error retrieving invoices with structured items:", error);
        if (typeof logger !== 'undefined') {
            logger.error(error);
        }
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = ussd