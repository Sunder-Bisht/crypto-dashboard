import "./App.css";
import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { setCoins, setLoading, setError } from "./store/cryptoSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
);

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

function CryptoRow({ name, symbol, price, change, marketCap }) {
  return (
    <div className="crypto-row">
      <span>
        {name} ({symbol})
      </span>
      <span>{price}</span>
      <span
        className={
          Number.parseFloat(change) >= 0 ? "positive-change" : "negative-change"
        }
      >
        {change}
      </span>
      <span>{marketCap}</span>
    </div>
  );
}

function CryptoComparisonChart({ coins, currency, chartType }) {
  const chartData = {
    labels: coins.map((coin) => coin.name),
    datasets: [
      {
        label: `Price (${currency.toUpperCase()})`,
        data: coins.map((coin) => coin.current_price),
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.25)",
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#38bdf8",
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    color: "#e5e7eb",
    scales: {
      x: {
        ticks: {
          color: "#e5e7eb",
        },
        grid: {
          color: "#374151",
        },
      },
      y: {
        ticks: {
          color: "#e5e7eb",
        },
        grid: {
          color: "#374151",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="comparison-chart-canvas">
      {chartType === "line" ? (
        <Line key="line-chart" data={chartData} options={options} />
      ) : (
        <Bar key="bar-chart" data={chartData} options={options} />
      )}
    </div>
  );
}

function CryptoMarketPieChart({ coins, currency }) {
  const pieData = {
    labels: coins.map((coin) => coin.name),
    datasets: [
      {
        label: "Market Cap",
        data: coins.map((coin) => coin.market_cap),
        backgroundColor: [
          "#f7931a",
          "#627eea",
          "#26a17b",
          "#e6007a",
          "#2775ca",
          "#9945ff",
          "#00a8e8",
          "#e84142",
          "#14f195",
          "#f0b90b",
        ],
        borderColor: "#0b1120",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Pie
      data={pieData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#e5e7eb",
              padding: 16,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw;
                return `${context.label}: ${new Intl.NumberFormat("en-US", {
                  style: "currency",
                  cuurrency: currency.toUpperCase(),
                  maximumFractionDigits: 0,
                }).format(value)}`;
              },
            },
          },
        },
      }}
    />
  );
}

function CryptoConverter({ coins, currency }) {
  const [amount, setAmount] = useState("1");
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  const coin = coins.find((item) => item.id === selectedCoin);
  const numericAmount = Number(amount);

  const isValid =
    amount.trim() !== "" &&
    Number.isFinite(numericAmount) &&
    numericAmount >= 0 &&
    coin;

  return (
    <section className="chart-section">
      <h2>Crypto Converter</h2>

      <label>
        Amount:
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          aria-label="Cryptocurrency amount"
        />
      </label>

      <label>
        Cryptocurrency:
        <select
          value={selectedCoin}
          onChange={(event) => setSelectedCoin(event.target.value)}
        >
          {coins.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      {isValid ? (
        <p>
          Value:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency.toUpperCase(),
            maximumFractionDigits: 2,
          }).format(numericAmount * coin.current_price)}
        </p>
      ) : (
        <p>Please enter a valid amount and select a cryptocurrency.</p>
      )}
    </section>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const coins = useSelector((state) => state.crypto.coins);
  const isLoading = useSelector((state) => state.crypto.isLoading);
  const error = useSelector((state) => state.crypto.error);
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCoins, setSelectedCoins] = useState(["bitcoin", "ethereum"]);
  const [chartType, setChartType] = useState("bar");

  const filteredCoins = coins.filter((coin) =>
    `${coin.name} ${coin.symbol}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase()),
  );
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    const difference = a[sortBy] - b[sortBy];

    return sortOrder === "asc" ? difference : -difference;
  });
  const comparisonCoins = coins.filter((coin) =>
    selectedCoins.includes(coin.id),
  );
  const totalMarketCap = coins.reduce(
    (total, coin) => total + coin.market_cap,
    0,
  );

  const totalVolume = coins.reduce(
    (total, coin) => total + coin.total_volume,
    0,
  );
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumFractionDigits: 2,
    }).format(amount);
  useEffect(() => {
    let isActive = true;

    const loadCoins = async () => {
      dispatch(setLoading(true));
      dispatch(setError(""));

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cryptocurrency data.");
        }

        const data = await response.json();

        if (isActive) {
          dispatch(setCoins(data));
        }
      } catch {
        if (isActive) {
          dispatch(
            setError("Unable to load cryptocurrency data. Please try again."),
          );
        }
      } finally {
        if (isActive) {
          dispatch(setLoading(false));
        }
      }
    };

    loadCoins();

    return () => {
      isActive = false;
    };
  }, [currency, dispatch]);
  return (
    <div className="min-h-screen">
      <header>
        <h1>Crypto Dashboard</h1>
      </header>
      <section className="dashboard-intro">
        <h2>Market Overview</h2>
        <p>Track cryptocurrency prices and market trends.</p>
      </section>
      <section className="market-stats">
        <StatCard
          title="Market Cap (Top 10)"
          value={formatCurrency(totalMarketCap)}
        />

        <StatCard
          title="24h Volume (Top 10)"
          value={formatCurrency(totalVolume)}
        />
        <StatCard
          title="Coins Loaded"
          value={isLoading ? "Loading..." : coins.length}
        />
      </section>
      <section className="crypto-section">
        <h2>Cryptocurrency Prices</h2>
        <input
          className="crypto-search"
          type="text"
          placeholder="Search by coin name or symbol..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="market_cap">Sort by Market Cap</option>
          <option value="current_price">Sort by Price</option>
        </select>

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="desc">Highest to Lowest</option>
          <option value="asc">Lowest to Highest</option>
        </select>
        <select
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
        >
          <option value="usd">USD ($)</option>
          <option value="inr">INR (₹)</option>
          <option value="eur">EUR (€)</option>
        </select>
        <div className="crypto-table">
          <div className="crypto-row crypto-header">
            <span>Coin</span>
            <span>Price</span>
            <span>24h Change</span>
            <span>Market Cap</span>
          </div>
          {error && <p className="no-results">{error}</p>}
          {isLoading && (
            <p className="no-results">Loading cryptocurrency data...</p>
          )}

          {!isLoading &&
            !error &&
            filteredCoins.length > 0 &&
            sortedCoins.map((coin) => (
              <React.Fragment key={coin.id}>
                <label className="compare-option">
                  <input
                    type="checkbox"
                    checked={selectedCoins.includes(coin.id)}
                    onChange={(event) => {
                      setSelectedCoins((previous) =>
                        event.target.checked
                          ? [...previous, coin.id]
                          : previous.filter((id) => id !== coin.id),
                      );
                    }}
                  />
                  Compare
                </label>
                <CryptoRow
                  key={coin.id}
                  name={coin.name}
                  symbol={coin.symbol.toUpperCase()}
                  price={formatCurrency(coin.current_price)}
                  change={`${coin.price_change_percentage_24h ?? 0}%`}
                  marketCap={formatCurrency(coin.market_cap)}
                />
              </React.Fragment>
            ))}

          {!isLoading && !error && filteredCoins.length === 0 && (
            <p className="no-results">No cryptocurrencies found.</p>
          )}
        </div>
        <div className="comparison-summary">
          <h3>Selected Coins ({comparisonCoins.length})</h3>

          {comparisonCoins.length === 0 ? (
            <p>Select coins above to compare them.</p>
          ) : (
            comparisonCoins.map((coin) => (
              <div className="comparison-item" key={coin.id}>
                <span>{coin.name}</span>
                <strong>{formatCurrency(coin.current_price)}</strong>
              </div>
            ))
          )}
          <div className="chart-section">
            <h2>Cryptocurrency Price Comparison</h2>
            <label>
              Chart type:{" "}
              <select
                value={chartType}
                onChange={(event) => setChartType(event.target.value)}
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
              </select>
            </label>

            {comparisonCoins.length > 0 ? (
              <CryptoComparisonChart
                coins={comparisonCoins}
                currency={currency}
                chartType={chartType}
              />
            ) : (
              <p>Select at least one coin to display the chart.</p>
            )}
            <section className="chart-section">
              <h2>Crypto Market Cap Distribution</h2>

              {coins.length > 0 ? (
                <div className="pie-chart-canvas">
                  <CryptoMarketPieChart coins={coins} currency={currency} />
                </div>
              ) : (
                <p>Waiting for cryptocurrency data...</p>
              )}
            </section>
            <CryptoConverter coins={coins} currency={currency} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
