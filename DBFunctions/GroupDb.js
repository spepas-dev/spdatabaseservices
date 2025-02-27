
require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};


ussd.addGroup = async (group) => {
    try {
     
        const newGroup = await prisma.group.create({
            data: {
                title: group.title,
                added_by: group.added_by,
             
              // Create associated applications
              group_applications: {
                create: group.group_applications.map(application => ({
                    application: {
                    connect: { application_id: application.application_id },  // Connect to existing group
                  },
                  inputter:{

                    connect:{User_ID: application.added_by}
                  }
                })),
              },
            },
          });
          


        return newGroup;
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



ussd.approveGroupApplication = async (groupApplications) => {
    try {
      // Iterate through the list of users to update them individually
      const updateResults = await Promise.all(
        groupApplications.map(async (groupApplicarion) => {
          const { groupApplicationID, ...userAppData } = groupApplicarion;
          return prisma.groupApplication.update({
            where: { groupApplicationID },
            data: userAppData,
          });
        })
      );
  
      return updateResults;
    } catch (error) {
      console.error("Error updating applications:", error);
      if (typeof logger !== 'undefined') {
        logger.error(error);
      }
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  };






ussd.pendingGroupApplications = async () => {
    try {
        const schools = await prisma.groupApplication.findMany({
         
            include: {
                group: true
            },
            include: {
                application: {
                  select: {
                    application_id: true,
                    date_added: true,
                    name: true
                  }
                }
            },
            where: {
              status: 0
            },
            orderBy: {
                date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
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
  



  ussd.groupApplications = async (group_id) => {
    try {
      const applications = await prisma.groupApplication.findMany({
        where: {
          group_id: group_id, // Group ID is 1
          status: {
            not: ProcessStatus.BLOCKED, // Status is not equal to 100
          },
        },
        include: {
          application: true, // Include the related application
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







  ussd.addGroupApplicationMenu = async (menus) => {
    try {
     
      const upserts = menus.map(menu => {
        return prisma.groupApplicationMenu.upsert({
          where: {
            group_id_menuID: { // Use the composite unique constraint
              group_id: menu.group_id,
              menuID: menu.menuID,
            },
          },
          update: {
            status: menu.status !== null ? menu.status : 1,  // Example field to update
            added_by: menu.added_by,
          },
          create: {
            menuID: menu.menuID,
            group_id: menu.group_id,
            added_by: menu.added_by,
          },
        });
      });
    
      await Promise.all(upserts);
        return upserts;
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
  







  ussd.groupMenu = async (group_id) => {
    try {
      const applications = await prisma.groupApplicationMenu.findMany({
        where: {
          group_id: group_id, // Group ID is 1
          status: {
            not: ProcessStatus.BLOCKED, // Status is not equal to 100
          },
        },
        include: {
          menu: {
            include: {
              application: true
            }
          }, // Include the related application
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





  ussd.allGroups = async () => {
    try {
      const applications = await prisma.group.findMany({
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






  ussd.pendingGroupMenu = async () => {
    try {
        const schools = await prisma.groupApplicationMenu.findMany({
         
            include: {
              group: true
            },
            include: {
              menu: {
                include:{
                  application: true
                }
              }
            },
            where: {
              status: 0
            },
            orderBy: {
              date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
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
  




  ussd.approveGroupMenu = async (groupMenus) => {
    try {
      // Iterate through the list of users to update them individually
      const updateResults = await Promise.all(
        groupMenus.map(async (groupApplicarion) => {
          const { group_application_menu_id, ...userAppData } = groupApplicarion;
          return prisma.groupApplicationMenu.update({
            where: { group_application_menu_id },
            data: userAppData,
          });
        })
      );
  
      return updateResults;
    } catch (error) {
      console.error("Error updating applications:", error);
      if (typeof logger !== 'undefined') {
        logger.error(error);
      }
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  };











  ussd.pendingUserGroup = async () => {
    try {
        const schools = await prisma.userGroup.findMany({
         
            include: {
              group: true
            },
            include: {
              user: true
            },
            where: {
              status: 0
            },
            orderBy: {
              date_added: 'desc', // Ensure your field is correct (createdAt or date_added)
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
  





  ussd.approveUserGroups = async (userGroups) => {
    try {
      // Iterate through the list of users to update them individually
      const updateResults = await Promise.all(
        userGroups.map(async (groupApplicarion) => {
          const { user_group_id, ...userAppData } = groupApplicarion;
          return prisma.userGroup.update({
            where: { user_group_id },
            data: userAppData,
          });
        })
      );
  
      return updateResults;
    } catch (error) {
      console.error("Error updating applications:", error);
      if (typeof logger !== 'undefined') {
        logger.error(error);
      }
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  };








   //@@unique([user_id, group_id])

   ussd.addUserGroup = async (groupes) => {
    try {
     
      const upserts = groupes.map(group => {
        return prisma.userGroup.upsert({
          where: {
            User_ID_group_id: { // Use the composite unique constraint
                User_ID: group.user_id,
              group_id: group.group_id,
            },
          },
          update: {
            status: group.status !== null ? group.status : 1, 
            added_by: group.added_by,
          },
          create: {
            User_ID: group.user_id,
            group_id: group.group_id,
            added_by: group.added_by,
          },
        });
      });
    
      await Promise.all(upserts);
        return upserts;
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