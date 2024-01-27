# Stock Price View Application

## Setup Instructions

1. Install Node.js: [Node.js Installation](https://nodejs.org/)
2. Install MongoDB: [MongoDB Installation](https://www.mongodb.com/try/download/community)
3. Clone the repository: `git clone <repository-url>`
4. Navigate to the project directory: `cd stock-price-app`
5. Install dependencies: `npm install`

## Run Instructions

1. Start MongoDB: `mongod`
2. Run the script to download and extract data: `node scripts/downloadData.js`
3. Start the Express.js server: `node app.js`

Your server will be running at [http://localhost:3000](http://localhost:3000).

## API Usage

### Download Data

- Endpoint: `GET /api/download-data`

### Top 10 Stocks

- Endpoint: `GET /api/top-stocks`

### Stock Price History

- Endpoint: `GET /api/stock-history/:stockCode`

### Add Stock to Favorites

- Endpoint: `POST /api/add-to-favorites`
- Example Request:
  ```json
  {
    "stockCode": "AAPL"
  }
  ```
### See favorite Stock

-Endpoint: `GET /api/favorite-stocks`

### Remove Stock from Favorites:

-Endpoint: `DELETE /api/remove-from-favorites/:stockCode`
