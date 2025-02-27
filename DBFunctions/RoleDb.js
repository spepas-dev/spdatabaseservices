require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};



ussd.addRole = async (role) => {
    try {
     
        const newGroup = await prisma.role.create({
            data: {
                role_name: role.role_name,
                added_by: role.added_by,
             
              // Create associated applications
              rolePermissions: {
                create: role.rolePermissions.map(permission => ({
                    permision: {
                    connect: { permissionID: permission.permissionID },  // Connect to existing group
                  },
                  inputter:{

                    connect:{User_ID: permission.added_by}
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



ussd.AddRolePermissions = async (permissions) => {
    try {
     

        const result = await prisma.rolePermission.createMany({
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





ussd.all = async () => {
    try {
      const roles = await prisma.role.findMany({
        where: {
          status: 1,
        },
        select: {
          role_name: true,
          status: true,
          date_added: true,
          role_id: true,
          rolePermissions: {
            select: {
              permision: {
                select: {
                  permissionID: true,
                  title: true,
                },
              },
            },
          },
        },
        orderBy: {
          role_name: 'asc', // Ensure this is the correct field for sorting
        },
      });
  
      // Transforming the result to simplify the permissions list
      const rolesWithPermissions = roles.map(role => ({
        role_name: role.role_name,
        status: role.status,
        role_id: role.role_id,
        date_added: role.date_added,
        permissions: role.rolePermissions.map(rp => rp.permision),
      }));
  
      return rolesWithPermissions;
    } catch (error) {
      console.error("Error retrieving roles and permissions:", error);
      if (typeof logger !== 'undefined') {
        logger.error(error);
      }
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  };








module.exports = ussd