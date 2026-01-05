
const asynHandler = require("../middleware/async");
const prodeuctModel = require("../DBFunctions/ProductDb");
const UtilityHelper = require("../helper/utilfunc");
const { REGISTRATION_STATUS, RESPONSE_CODES } = require("../helper/vars");
const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');
const prisma = new PrismaClient();
const Papa = require('papaparse');




exports.LOAD_CATEGORY = asynHandler(async (req, res, next) => {
    const filePath = path.join(__dirname, '../Data/part_categories.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const categoriesData = JSON.parse(fileContent);

    // Sort by level to ensure parents are created before children
    const sortedCategories = categoriesData.sort((a, b) => a.level - b.level);
  
     // Map to track categoryId to UUID mappings
     const categoryIdToUUID = new Map();

     // Process categories level by level
     const createdCategories = [];


      
    for (const item of sortedCategories) {
        // Get parent UUID if parent exists


        try {

        var oldCategory = await prodeuctModel.CategoryDetailsByExternalID(item.categoryId);


        if(oldCategory == null)
            {
                const parent_ID = item.parentCategoryId 
                ? categoryIdToUUID.get(item.parentCategoryId.toString()) 
                : null;
        
              // Create the category
        
        
              const created = await prisma.category.create({
                data: {
                  name: item.categoryName,
                  parent_ID: parent_ID,
                  externalID: item.categoryId
                }
              });
        
              // Store the mapping
              categoryIdToUUID.set(item.categoryId.toString(), created.Category_ID);
              createdCategories.push(created);

            }

        } catch (error) {
            console.error("Error retrieving record:", error);
            if (typeof logger !== 'undefined') {
                logger.error(error);
            }
            throw error;
        }

      }



      var resp = {
        status : RESPONSE_CODES.SUCCESS,
        message : "Success",
        data : createdCategories
    };
 
    return UtilityHelper.sendResponse(res, 200, resp.message, resp);
 
 })
 


 exports.LOAD_MANUFACTURERS = asynHandler(async (req, res, next) => {
    try {
      // Read the JSON file
      const filePath = path.join(__dirname, '../Data/manufacturers.json');
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
  
      // Extract manufacturers array from the JSON structure
      const manufacturersData = data.manufacturers;
  
      if (!manufacturersData || !Array.isArray(manufacturersData)) {
        var resp = {
            status : RESPONSE_CODES.FAILED,
            message : "Invalid JSON structure. Expected manufacturers array."
        };
        return UtilityHelper.sendResponse(res, 200, resp.message, resp);
      }
  
      // Check if manufacturers already exist to avoid duplicates
      //const existingCount = await prisma.manufacturer.count();
      
   
  
      // Transform and create manufacturers
      const createdManufacturers = [];
      let successCount = 0;
      let failedCount = 0;
      const errors = [];
  
      for (const item of manufacturersData) {
        try {

            var oldCategory = await prodeuctModel.ManufacturerByExternalID(item.manufacturerId);


            if(oldCategory == null)
                {

          const manufacturer = await prisma.manufacturer.create({
            data: {
              name: item.manufacturerName.trim(),
              country: '', // Empty since not provided in JSON
              externalID: item.manufacturerId,
              status: 1 // Default active status
            }
          });
          
          createdManufacturers.push(manufacturer);
          successCount++;

                }

        } catch (error) {
          failedCount++;
          errors.push({
            manufacturerId: item.manufacturerId,
            manufacturerName: item.manufacturerName,
            error: error.message
          });
          console.error(`Failed to create manufacturer ${item.manufacturerName}:`, error.message);
        }
      }
  
      // Response with summary
      const response = {
        success: true,
        message: 'Manufacturers loading completed',
        summary: {
          total: manufacturersData.length,
          successful: successCount,
          failed: failedCount,
          expectedCount: data.countManufactures
        }
      };
  
      // Include errors if any failed
      if (failedCount > 0) {
        if (failedCount > 0) {
            response.errors = errors;
          }
      }


      return UtilityHelper.sendResponse(res, 200, response.message, response);
  
    } catch (error) {
      console.error('Error loading manufacturers:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to load manufacturers',
        error: error.message
      });
    }
  });









 exports.LOAD_BRAND = asynHandler(async (req, res, next) => {
    try {
      // Read the JSON file
      const filePath = path.join(__dirname, '../Data/manufacturers.json');
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
  
      // Extract manufacturers array from the JSON structure
      const manufacturersData = data.manufacturers;
  
      if (!manufacturersData || !Array.isArray(manufacturersData)) {
        var resp = {
            status : RESPONSE_CODES.FAILED,
            message : "Invalid JSON structure. Expected manufacturers array."
        };
        return UtilityHelper.sendResponse(res, 200, resp.message, resp);
      }
  
      // Check if manufacturers already exist to avoid duplicates
      //const existingCount = await prisma.manufacturer.count();
      
   
  
      // Transform and create manufacturers
      const createdManufacturers = [];
      const modelWithoutManufacturers = [];
      let successCount = 0;
      let failedCount = 0;
      let brandWithoutModelCount = 0;
      const errors = [];
  
      for (const item of manufacturersData) {
        try {

            var oldBrand = await prodeuctModel.BrandByExternalID(item.manufacturerId);


            if(oldBrand == null)
                {

            var manuFactureDetails = await prodeuctModel.ManufacturerByExternalID(item.manufacturerId);

           if(manuFactureDetails != null)
            {



                const manufacturer = await prisma.carBrand.create({
                    data: {
                    name: item.manufacturerName.trim(),
                    manufacturer_ID: manuFactureDetails.Manufacturer_ID,
                    externalID: item.manufacturerId,
                      status: 1,
                      type: "CAR"
                    }
                  });
                  
                  createdManufacturers.push(manufacturer);
                  successCount++;


            }else{
                brandWithoutModelCount ++;
                modelWithoutManufacturers.push(item);
            }




         }

        } catch (error) {
          failedCount++;
          errors.push({
            manufacturerId: item.manufacturerId,
            manufacturerName: item.manufacturerName,
            error: error.message
          });
          console.error(`Failed to create manufacturer ${item.manufacturerName}:`, error.message);
        }
      }
  
      // Response with summary
      const response = {
        success: true,
        message: 'Manufacturers loading completed',
        summary: {
          total: manufacturersData.length,
          successful: successCount,
          failed: failedCount,
          expectedCount: data.countManufactures,
          modelWithoutManufactures: brandWithoutModelCount
        },
        modelWithoutManufacturerList: modelWithoutManufacturers
      };
  
      // Include errors if any failed
      if (failedCount > 0) {
        if (failedCount > 0) {
            response.errors = errors;
          }
      }


      return UtilityHelper.sendResponse(res, 200, response.message, response);
  
    } catch (error) {
      console.error('Error loading manufacturers:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to load manufacturers',
        error: error.message
      });
    }
  });





  exports.LOAD_MODEL = asynHandler(async (req, res, next) => {
    try {
      // Read the JSON file
      const filePath = path.join(__dirname, '../Data/models_2010plus.json');
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
  
      // Extract all models from all manufacturers
      const allModels = [];
      
      // Iterate through each manufacturer key in the JSON
      for (const manufacturerKey in data) {
        const manufacturer = data[manufacturerKey];
        
        if (manufacturer.models && Array.isArray(manufacturer.models)) {
          // Add manufacturerId to each model for easier processing
          manufacturer.models.forEach(model => {
            allModels.push({
              ...model,
              manufacturerId: manufacturer.manufacturerId,
              manufacturerName: manufacturer.manufacturerName
            });
          });
        }
      }
  
      if (allModels.length === 0) {
        var resp = {
          status: RESPONSE_CODES.FAILED,
          message: "No models found in JSON file."
        };
        return UtilityHelper.sendResponse(res, 200, resp.message, resp);
      }
  
      // Transform and create car models
      const createdModels = [];
      const modelsWithoutBrand = [];
      let successCount = 0;
      let failedCount = 0;
      let modelWithoutBrandCount = 0;
      const errors = [];
  
      for (const item of allModels) {
        try {
          // Check if model already exists to avoid duplicates
          var oldModel = await prodeuctModel.ModelByExternalID(item.modelId);
  
          if (oldModel == null) {
            // Find the car brand by externalID (manufacturerId from JSON)
            var carBrandDetails = await prodeuctModel.BrandByExternalID(item.manufacturerId);
  
            if (carBrandDetails != null) {
              // Extract year from modelYearFrom date string (YYYY-MM-DD)
              const yearOfMake = parseInt(item.modelYearFrom.split('-')[0]);
  
              const carModel = await prisma.carModel.create({
                data: {
                  name: item.modelName.trim(),
                  yearOfMake: yearOfMake, // Extract year from date
                  carBrand_ID: carBrandDetails.CarBrand_ID,
                  externalID: item.modelId,
                  status: 1
                }
              });
  
              createdModels.push(carModel);
              successCount++;
            } else {
              modelWithoutBrandCount++;
              modelsWithoutBrand.push({
                modelId: item.modelId,
                modelName: item.modelName,
                manufacturerId: item.manufacturerId,
                manufacturerName: item.manufacturerName,
                yearFrom: item.modelYearFrom
              });
            }
          }
  
        } catch (error) {
          failedCount++;
          errors.push({
            modelId: item.modelId,
            modelName: item.modelName,
            manufacturerId: item.manufacturerId,
            error: error.message
          });
          console.error(`Failed to create model ${item.modelName}:`, error.message);
        }
      }
  
      // Response with summary
      const response = {
        success: true,
        message: 'Car models loading completed',
        summary: {
          total: allModels.length,
          successful: successCount,
          failed: failedCount,
          modelsWithoutBrand: modelWithoutBrandCount
        },
        modelsWithoutBrandList: modelsWithoutBrand
      };
  
      // Include errors if any failed
      if (failedCount > 0) {
        response.errors = errors;
      }
  
      return UtilityHelper.sendResponse(res, 200, response.message, response);
  
    } catch (error) {
      console.error('Error loading car models:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to load car models',
        error: error.message
      });
    }
  });



/*

exports.LOAD_SPARE_PART = asynHandler(async (req, res, next) => {
  try {
    // Read the CSV file
    const filePath = path.join(__dirname, '../Data/non_ev_parts_complete_vehicles_10501-11000.csv');
    const fileContent = await fs.readFile(filePath, 'utf8');
    
    // Parse CSV content
    const parseResult = Papa.parse(fileContent, {
      header: true, // First row contains headers
      skipEmptyLines: true,
      dynamicTyping: true, // Automatically convert numbers
      trimHeaders: true, // Remove whitespace from headers
      transformHeader: (header) => header.trim() // Clean header names
    });

    if (parseResult.errors.length > 0) {
      console.error('CSV parsing errors:', parseResult.errors);
    }

    const data = parseResult.data;

    if (data.length === 0) {
      var resp = {
        status: RESPONSE_CODES.FAILED,
        message: "No models found in CSV file."
      };
      return UtilityHelper.sendResponse(res, 200, resp.message, resp);
    }



//extracting vehicle details
// Read the CSV file
const VfilePath = path.join(__dirname, '../Data/vehicles_detailed.csv');
const VfileContent = await fs.readFile(VfilePath, 'utf8');

// Parse CSV content
const VparseResult = Papa.parse(VfileContent, {
  header: true, // First row contains headers
  skipEmptyLines: true,
  dynamicTyping: true, // Automatically convert numbers
  trimHeaders: true, // Remove whitespace from headers
  transformHeader: (header) => header.trim() // Clean header names
});

if (VparseResult.errors.length > 0) {
  console.error('CSV parsing vehicle details errors:', parseResult.errors);
}

const VDetailsData = VparseResult.data;

if (VDetailsData.length === 0) {
  var resp = {
    status: RESPONSE_CODES.FAILED,
    message: "No vehicle details found in CSV file."
  };
  return UtilityHelper.sendResponse(res, 200, resp.message, resp);
}





    // Transform and create car models
    const createdModels = [];
    const modelsWithoutBrand = [];
    let successCount = 0;
    let failedCount = 0;
    let modelWithoutBrandCount = 0;
    const errors = [];

    for (const item of data) {
      try {
        // Skip rows with missing required fields
        if (!item.articleId || !item.articleNo || !item.vehicleId) {
          failedCount++;
          errors.push({
            articleId: item.articleId || 'N/A',
            articleNo: item.articleNo || 'N/A',
            vehicleId: item.vehicleId || 'N/A',
            error: 'Missing required fields'
          });
          continue;
        }


        const vehicleDetails = VDetailsData.find(Vitem => Vitem.vehicleId == item.vehicleId);
        if (!vehicleDetails) {
            failedCount++;
            errors.push({
              vehicleId: item.vehicleId || 'N/A',
              error: 'Vehicle id not found in vehicle details'
            });
            continue;
        }
        
        // Check if model already exists to avoid duplicates
        var oldSparePart = await prodeuctModel.SparePartByExternalID(item.vehicleId);

        if (oldSparePart == null) {
          // Find the car brand by externalID (manufacturerId from CSV)
          var carModelDetails = await prodeuctModel.ModelByExternalID(vehicleDetails.categoryId);

          if (carModelDetails != null) {
            // Extract year from modelYearFrom date string (YYYY-MM-DD or just YYYY)
           var category_ID = null;

           var oldCategory = await prodeuctModel.CategoryDetailsByExternalID(item.categoryId);
           if(oldCategory)
            {
                category_ID = oldCategory.Category_ID;
            }
            

            const carSparePart = await prisma.sparePart.create({
              data: {
                name: item.articleProductName.toString().trim(),
                description: '',
                status: 1,
                price: 0,
                category_ID: category_ID,
                carModel_ID: carModelDetails.CarModel_ID,
                externalID: item.vehicleId,
                articleNo: item.articleNo.toString().trim(),
                typeEngineName: vehicleDetails.typeEngineName.toString().trim()
              }
            });
                
                
            createdModels.push(carSparePart);
            successCount++;
          } else {
            modelWithoutBrandCount++;
            modelsWithoutBrand.push({
                vehicleId: item.vehicleId,
                name: item.articleProductName.toString().trim()
            });
          }
        }

      } catch (error) {
        failedCount++;
        errors.push({
          modelId: item.modelId || 'N/A',
          modelName: item.modelName || 'N/A',
          manufacturerId: item.manufacturerId || 'N/A',
          error: error.message
        });
        console.error(`Failed to create model ${item.modelName}:`, error.message);
      }
    }

    // Response with summary
    const response = {
      success: true,
      message: 'Car models loading completed',
      summary: {
        total: data.length,
        successful: successCount,
        failed: failedCount,
        modelsWithoutBrand: modelWithoutBrandCount
      },
      modelsWithoutBrandList: modelsWithoutBrand
    };

    // Include errors if any failed
    if (failedCount > 0) {
      response.errors = errors;
    }

    return UtilityHelper.sendResponse(res, 200, response.message, response);

  } catch (error) {
    console.error('Error loading car models:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load car models',
      error: error.message
    });
  }
});

*/


exports.LOAD_SPARE_PART = asynHandler(async (req, res, next) => {
    try {
      console.time('Total Execution Time');
      
      // ============================================
      // STEP 1: Read and Parse Spare Parts CSV
      // ============================================
      console.time('Reading Spare Parts CSV');
      const filePath = path.join(__dirname, '../Data/non_ev_parts_complete_vehicles_10501-11000.csv');
      const fileContent = await fs.readFile(filePath, 'utf8');
      
      const parseResult = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        trimHeaders: true,
        transformHeader: (header) => header.trim()
      });
  
      if (parseResult.errors.length > 0) {
        console.error('CSV parsing errors:', parseResult.errors);
      }
  
      const data = parseResult.data;
      console.timeEnd('Reading Spare Parts CSV');
      console.log(`Loaded ${data.length} spare parts records`);
  
      if (data.length === 0) {
        return UtilityHelper.sendResponse(res, 200, "No spare parts found in CSV file.", {
          status: RESPONSE_CODES.FAILED,
          message: "No spare parts found in CSV file."
        });
      }
  
      // ============================================
      // STEP 2: Read and Parse Vehicle Details CSV
      // ============================================
      console.time('Reading Vehicle Details CSV');
      const VfilePath = path.join(__dirname, '../Data/vehicles_detailed.csv');
      const VfileContent = await fs.readFile(VfilePath, 'utf8');
  
      const VparseResult = Papa.parse(VfileContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        trimHeaders: true,
        transformHeader: (header) => header.trim()
      });
  
      if (VparseResult.errors.length > 0) {
        console.error('CSV parsing vehicle details errors:', VparseResult.errors);
      }
  
      const VDetailsData = VparseResult.data;
      console.timeEnd('Reading Vehicle Details CSV');
      console.log(`Loaded ${VDetailsData.length} vehicle details records`);
  
      if (VDetailsData.length === 0) {
        return UtilityHelper.sendResponse(res, 200, "No vehicle details found in CSV file.", {
          status: RESPONSE_CODES.FAILED,
          message: "No vehicle details found in CSV file."
        });
      }
  
      // ============================================
      // OPTIMIZATION 1: Create Vehicle Details Map
      // ============================================
      console.time('Creating Vehicle Details Map');
      const vehicleDetailsMap = new Map();
      VDetailsData.forEach(vehicle => {
        if (vehicle.vehicleId) {
          vehicleDetailsMap.set(vehicle.vehicleId.toString(), vehicle);
        }
      });
      console.timeEnd('Creating Vehicle Details Map');
      console.log(`Vehicle details map size: ${vehicleDetailsMap.size}`);
  
      // ============================================
      // OPTIMIZATION 2: Bulk Fetch Existing Spare Parts
      // ============================================
      console.time('Fetching Existing Spare Parts');
      const vehicleIds = data
        .filter(item => item.vehicleId != null)
        .map(item => parseInt(item.vehicleId));
      
      const existingSpareParts = await prisma.sparePart.findMany({
        where: {
          externalID: {
            in: vehicleIds
          }
        },
        select: {
          externalID: true,
          SparePart_ID: true
        }
      });
  
      const existingSparePartsSet = new Set(
        existingSpareParts.map(part => part.externalID)
      );
      console.timeEnd('Fetching Existing Spare Parts');
      console.log(`Found ${existingSparePartsSet.size} existing spare parts`);
  
      // ============================================
      // OPTIMIZATION 3: Bulk Fetch Car Models using modelId
      // ============================================
      console.time('Fetching Car Models');
      // Extract modelIds from VDetailsData (not categoryId)
      const modelIds = [...new Set(
        VDetailsData
          .filter(v => v.modelId != null)
          .map(v => parseInt(v.modelId))
      )];
  
      console.log(`Fetching car models for ${modelIds.length} unique modelIds`);
  
      const carModels = await prisma.carModel.findMany({
        where: {
          externalID: {
            in: modelIds
          }
        },
        select: {
          externalID: true,
          CarModel_ID: true,
          name: true
        }
      });
  
      const carModelsMap = new Map();
      carModels.forEach(model => {
        carModelsMap.set(model.externalID, model);
      });
      console.timeEnd('Fetching Car Models');
      console.log(`Found ${carModelsMap.size} car models`);
  
      // ============================================
      // OPTIMIZATION 4: Bulk Fetch Categories
      // ============================================
      console.time('Fetching Categories');
      const allCategoryIds = [...new Set(
        data
          .filter(item => item.categoryId != null)
          .map(item => parseInt(item.categoryId))
      )];
  
      const categories = await prisma.category.findMany({
        where: {
          externalID: {
            in: allCategoryIds
          }
        },
        select: {
          externalID: true,
          Category_ID: true,
          name: true
        }
      });
  
      const categoriesMap = new Map();
      categories.forEach(cat => {
        categoriesMap.set(cat.externalID, cat);
      });
      console.timeEnd('Fetching Categories');
      console.log(`Found ${categoriesMap.size} categories`);
  
      // ============================================
      // OPTIMIZATION 5: Process and Prepare Data
      // ============================================
      console.time('Processing Data');
      const sparePartsToCreate = [];
      const modelsNotFound = [];
      const missingVehicleDetails = [];
      let successCount = 0;
      let failedCount = 0;
      let modelNotFoundCount = 0;
      let skippedDuplicates = 0;
      let missingVehicleCount = 0;
      const errors = [];
  
      for (const item of data) {
        try {
          // Skip rows with missing required fields
          if (!item.articleId || !item.articleNo || !item.vehicleId) {
            failedCount++;
            errors.push({
              articleId: item.articleId || 'N/A',
              articleNo: item.articleNo || 'N/A',
              vehicleId: item.vehicleId || 'N/A',
              error: 'Missing required fields'
            });
            continue;
          }
  
          // Check if already exists (O(1) lookup)
          const vehicleIdInt = parseInt(item.vehicleId);
          if (existingSparePartsSet.has(vehicleIdInt)) {
            skippedDuplicates++;
            continue;
          }
  
          // Get vehicle details (O(1) lookup)
          const vehicleDetails = vehicleDetailsMap.get(item.vehicleId.toString());
          if (!vehicleDetails) {
            failedCount++;
            missingVehicleCount++;
            missingVehicleDetails.push({
              vehicleId: item.vehicleId,
              articleNo: item.articleNo,
              articleProductName: item.articleProductName
            });
            continue;
          }
  
          // Get car model using modelId from vehicleDetails (O(1) lookup)
          const modelIdInt = parseInt(vehicleDetails.modelId);
          const carModelDetails = carModelsMap.get(modelIdInt);
  
          if (carModelDetails) {
            // Get category (O(1) lookup)
            const itemCategoryId = item.categoryId ? parseInt(item.categoryId) : null;
            const category = itemCategoryId ? categoriesMap.get(itemCategoryId) : null;
  
            // Prepare data for bulk insert
            sparePartsToCreate.push({
              name: (item.articleProductName || 'Unknown').toString().trim(),
              description: '',
              status: 1,
              price: 0,
              category_ID: category ? category.Category_ID : null,
              carModel_ID: carModelDetails.CarModel_ID,
              externalID: vehicleIdInt,
              articleNo: (item.articleNo || '').toString().trim(),
              typeEngineName: (vehicleDetails.typeEngineName || '').toString().trim()
            });
  
            successCount++;
          } else {
            modelNotFoundCount++;
            modelsNotFound.push({
              vehicleId: item.vehicleId,
              modelId: vehicleDetails.modelId,
              name: (item.articleProductName || 'Unknown').toString().trim(),
              articleNo: item.articleNo
            });
          }
  
        } catch (error) {
          failedCount++;
          errors.push({
            vehicleId: item.vehicleId || 'N/A',
            articleNo: item.articleNo || 'N/A',
            error: error.message
          });
          console.error(`Failed to process item:`, error.message);
        }
      }
      console.timeEnd('Processing Data');
  
      // ============================================
      // OPTIMIZATION 6: Bulk Insert with Batching
      // ============================================
      console.time('Bulk Insert');
      const BATCH_SIZE = 1000; // Adjust based on your database performance
      let insertedCount = 0;
      const insertErrors = [];
  
      if (sparePartsToCreate.length > 0) {
        console.log(`Preparing to insert ${sparePartsToCreate.length} spare parts in batches of ${BATCH_SIZE}`);
        
        for (let i = 0; i < sparePartsToCreate.length; i += BATCH_SIZE) {
          const batch = sparePartsToCreate.slice(i, i + BATCH_SIZE);
          const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
          const totalBatches = Math.ceil(sparePartsToCreate.length / BATCH_SIZE);
          
          try {
            const result = await prisma.sparePart.createMany({
              data: batch,
              skipDuplicates: true
            });
            
            insertedCount += result.count;
            console.log(`✓ Batch ${batchNumber}/${totalBatches}: Inserted ${result.count} records`);
          } catch (error) {
            console.error(`✗ Batch ${batchNumber}/${totalBatches} failed:`, error.message);
            insertErrors.push({
              batch: batchNumber,
              size: batch.length,
              error: error.message
            });
            
            // Try inserting individually for this batch to identify problem records
            console.log(`Attempting individual inserts for failed batch ${batchNumber}...`);
            for (const item of batch) {
              try {
                await prisma.sparePart.create({ data: item });
                insertedCount++;
              } catch (individualError) {
                errors.push({
                  vehicleId: item.externalID,
                  articleNo: item.articleNo,
                  error: individualError.message
                });
              }
            }
          }
        }
      }
      console.timeEnd('Bulk Insert');
      console.timeEnd('Total Execution Time');
  
      // ============================================
      // Response Summary
      // ============================================
      const response = {
        success: true,
        message: 'Spare parts loading completed',
        summary: {
          totalRecords: data.length,
          prepared: sparePartsToCreate.length,
          inserted: insertedCount,
          successful: successCount,
          failed: failedCount,
          skippedDuplicates: skippedDuplicates,
          missingVehicleDetails: missingVehicleCount,
          modelsNotFound: modelNotFoundCount
        },
        details: {
          vehicleDetailsLoaded: vehicleDetailsMap.size,
          carModelsFound: carModelsMap.size,
          categoriesFound: categoriesMap.size,
          existingSparePartsSkipped: existingSparePartsSet.size
        }
      };
  
      // Include sample errors and missing data (limit to prevent response overflow)
      if (errors.length > 0) {
        response.errors = errors.slice(0, 50);
        response.totalErrors = errors.length;
      }
  
      if (modelsNotFound.length > 0) {
        response.modelsNotFoundList = modelsNotFound.slice(0, 50);
        response.totalModelsNotFound = modelsNotFound.length;
      }
  
      if (missingVehicleDetails.length > 0) {
        response.missingVehicleDetailsList = missingVehicleDetails.slice(0, 50);
        response.totalMissingVehicleDetails = missingVehicleDetails.length;
      }
  
      if (insertErrors.length > 0) {
        response.batchInsertErrors = insertErrors;
      }
  
      return UtilityHelper.sendResponse(res, 200, response.message, response);
  
    } catch (error) {
      console.error('Error loading spare parts:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to load spare parts',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });



  exports.LOAD_SPARE_PART_IMAGES = asynHandler(async (req, res, next) => {
    try {
      console.time('Total Execution Time');
      
      // ============================================
      // STEP 1: Read and Parse Spare Parts CSV
      // ============================================
      console.time('Reading CSV');
      const filePath = path.join(__dirname, '../Data/non_ev_parts_complete_vehicles_10501-11000.csv');
      const fileContent = await fs.readFile(filePath, 'utf8');
      
      const parseResult = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        trimHeaders: true,
        transformHeader: (header) => header.trim()
      });
  
      if (parseResult.errors.length > 0) {
        console.error('CSV parsing errors:', parseResult.errors);
      }
  
      const data = parseResult.data;
      console.timeEnd('Reading CSV');
      console.log(`Loaded ${data.length} records`);
  
      if (data.length === 0) {
        return UtilityHelper.sendResponse(res, 200, "No data found in CSV file.", {
          status: RESPONSE_CODES.FAILED,
          message: "No data found in CSV file."
        });
      }
  
      // ============================================
      // STEP 2: Filter records with valid s3image
      // ============================================
      console.time('Filtering Records with Images');
      const recordsWithImages = data.filter(item => {
        return item.vehicleId && item.s3image && item.s3image.trim() !== '';
      });
      console.timeEnd('Filtering Records with Images');
      console.log(`Found ${recordsWithImages.length} records with images`);
  
      if (recordsWithImages.length === 0) {
        return UtilityHelper.sendResponse(res, 200, "No records with images found.", {
          status: RESPONSE_CODES.SUCCESS,
          message: "No records with images found in CSV file."
        });
      }
  
      // ============================================
      // STEP 3: Bulk Fetch Spare Parts by externalID
      // ============================================
      console.time('Fetching Spare Parts');
      const vehicleIds = [...new Set(
        recordsWithImages.map(item => parseInt(item.vehicleId))
      )];
  
      const spareParts = await prisma.sparePart.findMany({
        where: {
          externalID: {
            in: vehicleIds
          }
        },
        select: {
          SparePart_ID: true,
          externalID: true,
          name: true
        }
      });
  
      // Create map: externalID -> SparePart_ID
      const sparePartsMap = new Map();
      spareParts.forEach(part => {
        sparePartsMap.set(part.externalID, part);
      });
      console.timeEnd('Fetching Spare Parts');
      console.log(`Found ${spareParts.length} spare parts`);
  
      // ============================================
      // STEP 4: Bulk Fetch Existing Images
      // ============================================
      console.time('Fetching Existing Images');
      const sparePartIds = spareParts.map(part => part.SparePart_ID);
  
      const existingImages = await prisma.sparePartImage.findMany({
        where: {
          SparePart_ID: {
            in: sparePartIds
          }
        },
        select: {
          SparePart_ID: true,
          image_url: true,
          image_ID: true
        }
      });
  
      // Create a Set of unique combinations: "SparePart_ID|image_url"
      const existingImageSet = new Set();
      existingImages.forEach(img => {
        const key = `${img.SparePart_ID}|${img.image_url}`;
        existingImageSet.add(key);
      });
      console.timeEnd('Fetching Existing Images');
      console.log(`Found ${existingImages.length} existing images`);
  
      // ============================================
      // STEP 5: Prepare Images to Insert
      // ============================================
      console.time('Processing Images');
      const imagesToCreate = [];
      const skippedRecords = [];
      let successCount = 0;
      let skippedDuplicates = 0;
      let sparePartNotFound = 0;
      let invalidImageUrl = 0;
      const errors = [];
  
      for (const item of recordsWithImages) {
        try {
          const vehicleIdInt = parseInt(item.vehicleId);
          const imageUrl = item.s3image.toString().trim();
  
          // Validate image URL
          if (!imageUrl || imageUrl === '' || imageUrl === 'null' || imageUrl === 'undefined') {
            invalidImageUrl++;
            continue;
          }
  
          // Find spare part
          const sparePart = sparePartsMap.get(vehicleIdInt);
          if (!sparePart) {
            sparePartNotFound++;
            skippedRecords.push({
              vehicleId: item.vehicleId,
              articleNo: item.articleNo || 'N/A',
              reason: 'Spare part not found'
            });
            continue;
          }
  
          // Check if image already exists
          const duplicateKey = `${sparePart.SparePart_ID}|${imageUrl}`;
          if (existingImageSet.has(duplicateKey)) {
            skippedDuplicates++;
            continue;
          }
  
          // Prepare image data for insert
          imagesToCreate.push({
            SparePart_ID: sparePart.SparePart_ID,
            image_url: imageUrl,
            image_ob: {
              source: 'csv_import',
              vehicleId: vehicleIdInt,
              originalUrl: imageUrl,
              importedAt: new Date().toISOString()
            },
            status: 1
          });
  
          // Add to existing set to prevent duplicates within this batch
          existingImageSet.add(duplicateKey);
          successCount++;
  
        } catch (error) {
          errors.push({
            vehicleId: item.vehicleId || 'N/A',
            s3image: item.s3image || 'N/A',
            error: error.message
          });
          console.error(`Failed to process image for vehicle ${item.vehicleId}:`, error.message);
        }
      }
      console.timeEnd('Processing Images');
  
      // ============================================
      // STEP 6: Bulk Insert Images in Batches
      // ============================================
      console.time('Bulk Insert Images');
      const BATCH_SIZE = 500;
      let insertedCount = 0;
      const insertErrors = [];
  
      if (imagesToCreate.length > 0) {
        console.log(`Preparing to insert ${imagesToCreate.length} images in batches of ${BATCH_SIZE}`);
        
        for (let i = 0; i < imagesToCreate.length; i += BATCH_SIZE) {
          const batch = imagesToCreate.slice(i, i + BATCH_SIZE);
          const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
          const totalBatches = Math.ceil(imagesToCreate.length / BATCH_SIZE);
          
          try {
            const result = await prisma.sparePartImage.createMany({
              data: batch,
              skipDuplicates: true
            });
            
            insertedCount += result.count;
            console.log(`✓ Batch ${batchNumber}/${totalBatches}: Inserted ${result.count} images`);
          } catch (error) {
            console.error(`✗ Batch ${batchNumber}/${totalBatches} failed:`, error.message);
            insertErrors.push({
              batch: batchNumber,
              size: batch.length,
              error: error.message
            });
            
            // Try inserting individually for failed batch
            console.log(`Attempting individual inserts for failed batch ${batchNumber}...`);
            for (const image of batch) {
              try {
                await prisma.sparePartImage.create({ data: image });
                insertedCount++;
              } catch (individualError) {
                errors.push({
                  SparePart_ID: image.SparePart_ID,
                  image_url: image.image_url,
                  error: individualError.message
                });
              }
            }
          }
        }
      }
      console.timeEnd('Bulk Insert Images');
      console.timeEnd('Total Execution Time');
  
      // ============================================
      // Response Summary
      // ============================================
      const response = {
        success: true,
        message: 'Spare part images loading completed',
        summary: {
          totalRecords: data.length,
          recordsWithImages: recordsWithImages.length,
          prepared: imagesToCreate.length,
          inserted: insertedCount,
          skippedDuplicates: skippedDuplicates,
          sparePartNotFound: sparePartNotFound,
          invalidImageUrl: invalidImageUrl
        },
        details: {
          sparePartsFound: spareParts.length,
          existingImagesFound: existingImages.length
        }
      };
  
      if (errors.length > 0) {
        response.errors = errors.slice(0, 50);
        response.totalErrors = errors.length;
      }
  
      if (skippedRecords.length > 0) {
        response.skippedRecords = skippedRecords.slice(0, 50);
        response.totalSkippedRecords = skippedRecords.length;
      }
  
      if (insertErrors.length > 0) {
        response.batchInsertErrors = insertErrors;
      }
  
      return UtilityHelper.sendResponse(res, 200, response.message, response);
  
    } catch (error) {
      console.error('Error loading spare part images:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to load spare part images',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });