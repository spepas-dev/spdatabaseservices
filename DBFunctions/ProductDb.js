require("dotenv").config({ path: "./.env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { logger } = require("../logs/winston");
const { ProcessStatus } = require("../helper/vars");
const UtilityHelper = require("../helper/utilfunc");

let ussd = {};

ussd.addCategories = async (data) => {
  try {
    const newContinent = await prisma.category.createMany({
      data: data,
    });

    return newContinent;
  } catch (error) {
    console.error("Error saving manufacturer details:", error);
    if (typeof logger !== "undefined") {
      logger.error(error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};





ussd.CategoryDetailsByExternalID = async (externalID) => {
    try {
        return await prisma.category.findFirst({
            where: {
                externalID: parseInt(externalID)
            },
        });
    } catch (error) {
        console.error("Error retrieving category:", error);
        throw error;
    }
};





ussd.addManufacturer = async (data) => {
  try {
    const newContinent = await prisma.manufacturer.createMany({
      data: data,
    });

    return newContinent;
  } catch (error) {
    console.error("Error saving manufacturer details:", error);
    if (typeof logger !== "undefined") {
      logger.error(error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};


ussd.ManufacturerByExternalID = async (externalID) => {
    try {
        const user = await prisma.manufacturer.findFirst({
            where: {
                externalID: externalID
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






ussd.addBrand = async (data) => {
  try {
    const newContinent = await prisma.carBrand.createMany({
      data: data,
    });

    return newContinent;
  } catch (error) {
    console.error("Error saving car brand details:", error);
    if (typeof logger !== "undefined") {
      logger.error(error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};


ussd.BrandByExternalID = async (externalID) => {
    try {
        const user = await prisma.carBrand.findFirst({
            where: {
                externalID: externalID
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




ussd.addModel = async (data) => {
  try {
    const newContinent = await prisma.carModel.createMany({
      data: data,
    });

    return newContinent;
  } catch (error) {
    console.error("Error saving car model details:", error);
    if (typeof logger !== "undefined") {
      logger.error(error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};



ussd.ModelByExternalID = async (externalID) => {
    try {
        return await prisma.carModel.findFirst({
            where: {
                externalID: parseInt(externalID)
            },
        });
    } catch (error) {
        console.error("Error retrieving car model:", error);
        throw error;
    }
};





ussd.addSparePart = async (data) => {
  try {
    const newContinent = await prisma.sparePart.createMany({
      data: data,
    });

    return newContinent;
  } catch (error) {
    console.error("Error saving spare part details:", error);
    if (typeof logger !== "undefined") {
      logger.error(error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};


ussd.SparePartByExternalID = async (externalID) => {
    try {
        return await prisma.sparePart.findFirst({
            where: {
                externalID: parseInt(externalID) // Ensure it's a number
            },
        });
    } catch (error) {
        console.error("Error retrieving spare part:", error);
        throw error;
    }
    // DO NOT disconnect here - let connection pool manage it
};







ussd.addSparePartSingle = async (data) => {
  try {
    const newContinent = await prisma.sparePart.create({
      data: data,
    });

    return newContinent;
  } catch (error) {
    console.error("Error saving spare part details:", error);
    if (typeof logger !== "undefined") {
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
      data: data,
    });

    return newContinent;
  } catch (error) {
    console.error("Error saving image details:", error);
    if (typeof logger !== "undefined") {
      logger.error(error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

ussd.allModels = async (query) => {
  try {
    const { page = 1, limit = 10, search = "", startDate, endDate } = query;

    const startDateParam = startDate;
    const endDateParam = endDate;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build WHERE conditions dynamically
    const where = {};

    // Search across multiple fields
    // if (search) {
    //   where.OR = [
    //     { country: { contains: search, mode: 'insensitive' } },
    //     { city: { contains: search, mode: 'insensitive' } },
    //     { deviceType: { contains: search, mode: 'insensitive' } },
    //     { browserName: { contains: search, mode: 'insensitive' } }
    //   ];
    // }

    // // Filter by channel
    // if (channel) {
    //   where.channel = channel;
    // }

    // // Filter by statusCode
    // if (statusCode) {
    //   where.statusCode = Number(statusCode);
    // }

    // Date range filter
    if (startDateParam && endDateParam) {
      where.createdAt = {
        gte: new Date(startDateParam),
        lte: new Date(endDateParam),
      };
    }
    where.status = 1;
    const [carmodels, total] = await Promise.all([
      prisma.carModel.findMany({
        where,
        skip,
        take,
        orderBy: {
          name: "asc", // Ensure your field is correct (createdAt or date_added)
        },
        include: {
          spareParts: {
            where: {
              status: 1,
            },
            orderBy: {
              name: "asc",
            },
            include: {
              images: true,
            },
          },
          carBrand: {
            include: {
              manufacturer: true,
            },
          },
        },
      }),
      prisma.carModel.count({ where }),
    ]);
    const data = {
      carmodels,
      meta: {
        total: total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };

    return data;
  } catch (error) {
    console.error("Error retrieving record:", error);
    if (typeof logger !== "undefined") {
      logger.error(error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

ussd.AllBrands = async (query) => {
  try {
    const { page = 1, limit = 10, search = "", startDate, endDate } = query;

    const startDateParam = startDate;
    const endDateParam = endDate;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build WHERE conditions dynamically
    const where = {};

    // Search across multiple fields
    // if (search) {
    //   where.OR = [
    //     { country: { contains: search, mode: 'insensitive' } },
    //     { city: { contains: search, mode: 'insensitive' } },
    //     { deviceType: { contains: search, mode: 'insensitive' } },
    //     { browserName: { contains: search, mode: 'insensitive' } }
    //   ];
    // }

    // // Filter by channel
    // if (channel) {
    //   where.channel = channel;
    // }

    // // Filter by statusCode
    // if (statusCode) {
    //   where.statusCode = Number(statusCode);
    // }

    // Date range filter
    if (startDateParam && endDateParam) {
      where.createdAt = {
        gte: new Date(startDateParam),
        lte: new Date(endDateParam),
      };
    }
    where.status = 1;
    const [carbrands, total] = await Promise.all([
      prisma.carBrand.findMany({
        where,
        skip,
        take,
        orderBy: {
          name: "asc", // Ensure your field is correct (createdAt or date_added)
        },
        include: {
          manufacturer: true,
          models: {
            orderBy: {
              name: "asc",
            },
            where: {
              status: 1,
            },
            include: {
              spareParts: {
                where: {
                  status: 1,
                },
                orderBy: {
                  name: "asc",
                },
                include: {
                  images: true,
                },
              },
            },
          },
        },
      }),
      prisma.carBrand.count({ where }),
    ]);

    const data = {
      carbrands,
      meta: {
        total: total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };

    return data;
  } catch (error) {
    console.error("Error retrieving record:", error);
    if (typeof logger !== "undefined") {
      logger.error(error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

ussd.AllCategories = async () => {
  try {
    const schools = await prisma.category.findMany({
      orderBy: {
        name: "asc", // Ensure your field is correct (createdAt or date_added)
      },
    });

    return schools;
  } catch (error) {
    console.error("Error retrieving record:", error);
    if (typeof logger !== "undefined") {
      logger.error(error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

ussd.AllManufacturers = async (query) => {
  try {
    const { page = 1, limit = 10, search = "", startDate, endDate } = query;

    const startDateParam = startDate;
    const endDateParam = endDate;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build WHERE conditions dynamically
    const where = {};

    // Search across multiple fields
    // if (search) {
    //   where.OR = [
    //     { country: { contains: search, mode: 'insensitive' } },
    //     { city: { contains: search, mode: 'insensitive' } },
    //     { deviceType: { contains: search, mode: 'insensitive' } },
    //     { browserName: { contains: search, mode: 'insensitive' } }
    //   ];
    // }

    // // Filter by channel
    // if (channel) {
    //   where.channel = channel;
    // }

    // // Filter by statusCode
    // if (statusCode) {
    //   where.statusCode = Number(statusCode);
    // }

    // Date range filter
    if (startDateParam && endDateParam) {
      where.createdAt = {
        gte: new Date(startDateParam),
        lte: new Date(endDateParam),
      };
    }
    where.status = 1;
    const [manufacturers, total] = await Promise.all([
      prisma.manufacturer.findMany({
        where,
        skip,
        take,
        orderBy: {
          name: "asc", // Ensure your field is correct (createdAt or date_added)
        },

        include: {
          brands: {
            include: {
              models: {
                orderBy: {
                  name: "asc",
                },
                where: {
                  status: 1,
                },
                include: {
                  spareParts: {
                    where: {
                      status: 1,
                    },
                    orderBy: {
                      name: "asc",
                    },
                    include: {
                      images: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
      prisma.manufacturer.count({ where }),
    ]);

    const data = {
      manufacturers,
      meta: {
        total: total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };

    return data;
  } catch (error) {
    console.error("Error retrieving record:", error);
    if (typeof logger !== "undefined") {
      logger.error(error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

ussd.AllSpareParts = async (query) => {
  try {
    const { page = 1, limit = 10, search = "", startDate, endDate } = query;

    const startDateParam = startDate;
    const endDateParam = endDate;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build WHERE conditions dynamically
    const where = {};

    // Search across multiple fields
    // if (search) {
    //   where.OR = [
    //     { country: { contains: search, mode: 'insensitive' } },
    //     { city: { contains: search, mode: 'insensitive' } },
    //     { deviceType: { contains: search, mode: 'insensitive' } },
    //     { browserName: { contains: search, mode: 'insensitive' } }
    //   ];
    // }

    // // Filter by channel
    // if (channel) {
    //   where.channel = channel;
    // }

    // // Filter by statusCode
    // if (statusCode) {
    //   where.statusCode = Number(statusCode);
    // }

    // Date range filter
    if (startDateParam && endDateParam) {
      where.createdAt = {
        gte: new Date(startDateParam),
        lte: new Date(endDateParam),
      };
    }
    where.status = 1;
    const [spareparts, total] = await Promise.all([
      prisma.sparePart.findMany({
        where,
        skip,
        take,
        orderBy: {
          name: "asc", // Ensure your field is correct (createdAt or date_added)
        },
        include: {
          images: true,
          carModel: {
            include: {
              carBrand: {
                include: {
                  manufacturer: true,
                },
              },
            },
          },
        },
      }),
      prisma.sparePart.count({ where }),
    ]);

    const data = {
      spareparts,
      meta: {
        total: total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };

    return data;
  } catch (error) {
    console.error("Error retrieving record:", error);
    if (typeof logger !== "undefined") {
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
        SparePart_ID: spare_part_ID,
      },
    });

    return user;
  } catch (error) {
    console.error("Error retrieving record:", error);
    if (typeof logger !== "undefined") {
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
        id: Number(id),
      },
      include: {
        images: true,
        carModel: {
          include: {
            carBrand: {
              include: {
                manufacturer: true,
              },
            },
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error retrieving record:", error);
    if (typeof logger !== "undefined") {
      logger.error(error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = ussd;
