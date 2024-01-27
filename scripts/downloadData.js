// scripts/downloadData.js
const axios = require("axios");
const AdmZip = require("adm-zip");
const fs = require("fs");
const csvParser = require("csv-parser");

// Function to download and extract data
async function downloadAndExtractData() {
  try {
    // Download the ZIP file from the BSE website
    const response = await axios.get(
      "https://www.bseindia.com/download/BhavCopy/Equity/EQ010124_CSV.ZIP",
      { responseType: "arraybuffer" }
    );

    // Extract the ZIP file
    const zip = new AdmZip(response.data);
    zip.extractAllTo("data", true); // Extract to a 'data' folder

    console.log("Data downloaded and extracted successfully!");

    // Parse and store data in MongoDB
    parseAndStoreData();
  } catch (error) {
    console.error("Error downloading and extracting data:", error.message);
  }
}

// Function to parse CSV data and store it in MongoDB
function parseAndStoreData() {
  const dataFolderPath = "data"; // Adjust if needed

  fs.readdirSync(dataFolderPath).forEach((file) => {
    if (file.endsWith(".csv")) {
      const csvFilePath = path.join(dataFolderPath, file);
      const stream = fs.createReadStream(csvFilePath).pipe(csvParser());

      // Assuming you have a Mongoose model named Stock, create it before using
      const Stock = require("../models/stock"); // Adjust the path

      stream.on("data", (row) => {
        // Create a new Stock document and save it to MongoDB
        const newStock = new Stock({
          code: row.code,
          name: row.name,
          open: row.open,
          high: row.high,
          low: row.low,
          close: row.close,
        });

        newStock
          .save()
          .then(() => console.log("Stock saved to MongoDB"))
          .catch((error) =>
            console.error("Error saving stock to MongoDB:", error)
          );
      });

      stream.on("end", () => {
        console.log("CSV file processed successfully");
      });
    }
  });
}

// Export the function
module.exports = { downloadAndExtractData };
