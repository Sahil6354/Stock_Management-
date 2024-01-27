const express = require("express");
const router = express.Router();
const path = require("path");
const { downloadAndExtractData } = require("../scripts/downloadData");

// Route to download and extract data
router.get("/download-data", async (req, res) => {
  try {
    await downloadAndExtractData();
    res.status(200).send("Data downloaded and extracted successfully!");
  } catch (error) {
    console.error("Error downloading and extracting data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to download and extract data
router.get("/download-data", async (req, res) => {
  try {
    await downloadAndExtractData();
    res
      .status(200)
      .send("Data downloaded, extracted, and stored successfully!");
  } catch (error) {
    console.error("Error in download-data route:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get top 10 stocks
router.get("/top-stocks", async (req, res) => {
  try {
    const topStocks = await Stock.find().limit(10);
    res.status(200).json(topStocks);
  } catch (error) {
    console.error("Error in top-stocks route:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get stock price history by code
router.get("/stock-history/:stockCode", async (req, res) => {
  const stockCode = req.params.stockCode;

  try {
    const stockHistory = await Stock.find({ code: stockCode });
    res.status(200).json(stockHistory);
  } catch (error) {
    console.error("Error in stock-history route:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to add a stock to favorites
router.post("/add-to-favorites", async (req, res) => {
  const { stockCode } = req.body;

  try {
    // Assume there's a user model for storing favorites
    // Replace this with your actual user model and logic
    const user = await User.findOneAndUpdate(
      { _id: "USER_ID" }, // Adjust with user identifier
      { $addToSet: { favorites: stockCode } },
      { new: true }
    );

    res.status(200).json(user.favorites);
  } catch (error) {
    console.error("Error in add-to-favorites route:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to see favorite stocks
router.get("/favorite-stocks", async (req, res) => {
  try {
    // Assume there's a user model for storing favorites
    // Replace this with your actual user model and logic
    const user = await User.findOne({ _id: "USER_ID" });

    res.status(200).json(user.favorites);
  } catch (error) {
    console.error("Error in favorite-stocks route:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to remove a stock from favorites
router.delete("/remove-from-favorites/:stockCode", async (req, res) => {
  const stockCode = req.params.stockCode;

  try {
    // Assume there's a user model for storing favorites
    // Replace this with your actual user model and logic
    const user = await User.findOneAndUpdate(
      { _id: "USER_ID" },
      { $pull: { favorites: stockCode } },
      { new: true }
    );

    res.status(200).json(user.favorites);
  } catch (error) {
    console.error("Error in remove-from-favorites route:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
