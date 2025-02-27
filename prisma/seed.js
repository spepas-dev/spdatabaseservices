const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');


async function main() {
    const roles = [
      { role_id: uuidv4(), role_name: 'Inputer', status: 1 },
      { role_id: uuidv4(), role_name: 'Reviewer', status: 1 },
      { role_id: uuidv4(), role_name: 'Authorizer', status: 1 },
      { role_id: uuidv4(), role_name: 'Viewer', status: 1 }
    ];
  
    for (const role of roles) {
      await prisma.role.upsert({
        where: { role_id: role.role_id },
        update: {},
        create: {
          role_id: role.role_id,
          role_name: role.role_name,
          status: role.status
        },
      });
    }
  


    const permissions = [
        { permissionID: uuidv4(), title: 'Write', status: 1 },
        { permissionID: uuidv4(), title: 'View', status: 1 },
        { permissionID: uuidv4(), title: 'Update', status: 1 },
        { permissionID: uuidv4(), title: 'Delete', status: 1 }
      ];
    

    
      for (const permission of permissions) {
        await prisma.permission.upsert({
          where: { permissionID: permission.permissionID },
          update: {},
          create: {
            permissionID: permission.permissionID,
            title: permission.title,
            status: permission.status
          },
        });
      }
    

    console.log('Default roles added to the Role table');
  }
  
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });