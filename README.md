Crypto Dashboard

A responsive cryptocurrency dashboard built with React and Vite. It displays live cryptocurrency market data and provides tools to search, sort, compare, and convert cryptocurrency prices.

Live Demo

Live Website: https://crypto-dashboard-one-woad.vercel.app
GitHub Repository: https://github.com/Sunder-Bisht/crypto-dashboard

Features

Live market data: Fetches cryptocurrency market information from the CoinGecko API.

Market overview: Displays the combined market capitalization and 24-hour trading volume for the loaded coins.

Cryptocurrency list: Shows coin names, symbols, prices, 24-hour price changes, and market capitalization.

Currency selection: View prices in USD, INR, or EUR.

Search: Find cryptocurrencies by name or symbol.

Sorting: Sort the list by market capitalization or price in ascending or descending order.

Coin comparison: Select multiple coins for comparison.

Interactive charts: Compare selected cryptocurrencies using line or bar charts, with a pie chart for market-cap distribution.

Currency converter: Calculate the fiat-currency value of a selected cryptocurrency amount.

State management: Uses Redux to manage dashboard data and application state.

Automated tests: Includes Redux state tests using Vitest and React Testing Library tools.

Deployment: Hosted on Vercel and connected to GitHub.

Tech Stack

React

Vite

Redux and React Redux

Redux Thunk

Tailwind CSS

Chart.js and React Chart.js 2

CoinGecko API

Vitest

React Testing Library

Vercel

Run Locally

Prerequisites

Node.js and npm

Git

Installation

Clone the repository:

git clone https://github.com/Sunder-Bisht/crypto-dashboard.git

Enter the project directory:

cd crypto-dashboard

Install dependencies:

npm install

Start the development server:

npm run dev

Open the local URL shown in your terminal, usually http://localhost:5173.

Run Tests

Run the automated test suite:

npm.cmd test -- --run

On macOS or Linux, use the equivalent npm command configured in package.json, commonly npm test -- --run.

Build for Production

Create a production build:

npm run build

Vite generates the production files in the dist directory.

API

Market data is retrieved from the public CoinGecko API. Availability and rate limits may affect requests, so data loading may occasionally be delayed.

Deployment

The application is deployed on Vercel and connected to the GitHub repository. New commits pushed to the configured production branch can trigger a redeployment.

Learning Outcomes

This project demonstrates component-based UI development, API integration, state management with Redux, data visualization, interactive search and sorting, currency conversion, automated testing, Git version control, and deployment.

Author

Sunder Bisht

GitHub: https://github.com/Sunder-Bisht
