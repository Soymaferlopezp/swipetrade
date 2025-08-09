<p align="center">
  <img src="https://github.com/Soymaferlopezp/swipetrade/blob/main/apps/frontend/public/swipetrade-logo.png" alt="SwipeTrade Logo" height="90">
</p>

<h1 align="center">SwipeTrade: Trade Like You Swipe</h1>

<p align="center">
  Innovative crypto trading app for the <strong>OKX ETHCXC Hackathon 2025</strong>, combining swipe-based UI with automated DCA strategies.
</p>

---

## 👥 Team
- 👩‍💻 **Mafer Lopez** — Dev & UX/UI Designer  
- 📈 **Zula** — PM & Marketing  
- 🚀 **Mary** — Researcher & BizDev  

**Track:** Smart Account UX & Abstraction  
**Status:** MVP Ready for Demo and Validation  

---

## 💡 The Problem
Crypto trading is often intimidating for new users due to:
- Complex interfaces
- Technical jargon
- The pressure to make quick decisions

Managing investment strategies like **Dollar Cost Averaging (DCA)** can be manual and tedious, causing missed opportunities or deviations from plans.

---

## 🎯 The Solution
SwipeTrade addresses these challenges with a **three-pronged approach**:

1. **Trading Simplification**  
   Swipe interface to intuitively accept or reject trading opportunities, removing traditional exchange complexity.

2. **Smart Automation**  
   - **Strategy Simulator:** Test and visualize DCA strategies before executing.  
   - **Bot Mode:** Automates trades based on predefined rules.

3. **Total Transparency**  
   Swap History logs all manual and automated trades, providing full tracking and performance metrics.

---

## ⚙️ Key Features

### 📊 Strategy Simulator (DCA)
- **Customizable Parameters:** Token pair (e.g., ETH/USDT), amount per purchase, frequency (days), and periods.
- **Real Historical Data:** Uses OKX API (`market/history-candles`) for past closing prices.
- **Key Metrics:** Total invested, average entry price, current value, net P&L.
- **Detailed Log:** Chronological table of each simulated purchase.

### 🔄 Swipe Mode & Trade History
- **Swipe UI:** Trading cards with metrics (price, slippage, gas fee, volume).
- **In-Memory Logging:** Accepted/rejected swaps logged via `POST /api/swaps/execute` and `/history.ts`.
- **Comprehensive Visualization:** Filter and analyze all operations; view success rate, total profit.

### 🔐 Wallet Connection
- **Secure Wallet Integration:** `wagmi` + `ethers.js` for MetaMask and similar wallets.
- **Protected Routes:** Dashboard access only for connected wallets.

---

## 💻 Tech Stack

| Component | Technologies |
|-----------|--------------|
| **Frontend** | React, Next.js, TailwindCSS, v0.dev |
| **Backend** | Node.js, Express, TypeScript, Axios, dotenv |
| **APIs** | OKX DEX API (`history-candles`, `market/price`, `swap/quote`) |
| **Wallet** | wagmi, ethers.js |

---

## 🛠️ How to Run the Project

```bash
# 1. Clone the repository
git clone https://github.com/Soymaferlopezp/swipetrade.git

# 2. Install dependencies (frontend & backend)
cd apps/frontend && npm install
cd ../backend && npm install

# 3. Configure environment variables
# In /apps/backend/.env
PORT=3001

# 4. Run backend
npm run dev  # http://localhost:3001

# 5. Run frontend
npm run dev  # http://localhost:3000

# 6. Access in browser
# Open: http://localhost:3000

## 🔮 Roadmap for the MVP

| Priority | Module | Description |
|----------|--------|-------------|
| 🔥 1 | **DCA Simulator Implementation** (✅ Completed) | Price logic, calculations, and UI ready. |
| 🔥 2 | **OKX DEX API Connection** | Live data integration. |
| 🔥 3 | **Data Persistence** | Store swaps in MongoDB/PostgreSQL instead of memory. |
| 💳 4 | **Transaction Signing** | Execute real swaps using wagmi + ethers.js. |
| 🤖 5 | **Bot Mode** | Automate swaps based on user rules. |

---
1. Flow general de Strategy Simulator + Swipe Execution

+-------------------+       request       +-------------------+       fetches       +-------------------+
|  Frontend (UI)    | ------------------> |  Backend (Express)| ------------------> |   OKX DEX API     |
|  StrategySimulator|                     |  /swaps/simulator |                     | token-list/price  |
|  Form + KPIs      |                     |  (controller)     |                     |  /swap/quote      |
+-------------------+                     +-------------------+                     +-------------------+
        |                                           |
        | updates                                   | uses
        v                                           v
+-------------------+     POST     +-------------------+ 
| Recent Activity   | <----------- | /swaps/history    | <--- persist logs
| (accepted/reject) |              +-------------------+ 
+-------------------+                       |
        |                                    | on "Accept" (manual)
        v                                    v
+-------------------+     POST     +-------------------+
| Swipe (CardStack) | -----------> | /swaps/execute    |
| onSwipeRight      |              | save executed tx  |
+-------------------+              +-------------------+

---
2. Flow del Historial de Trades

+----------------------+     POST      +----------------------+
| SwipeCard (Frontend) | ----------->  | Backend (history.ts) |
| - User swipes        |               | - Saves trade        |
+----------------------+               +----------------------+
        |
        | GET /api/swaps/history
        v
+----------------------+   (JSON)   +----------------------+
| TradeHistoryView.tsx | <--------  | Backend (history.ts) |
| - Displays metrics   |            | - Returns all swaps  |
| - Passes data to     |            |                      |
|   table              |            |                      |
+----------------------+            +----------------------+
        |
        v
+----------------------+
| TradeHistoryTable.tsx|
| - Table + filters    |
| - Formats and        |
|   calculates         |
+----------------------+


---

📄 **License**  
MIT © 2025 SwipeTrade Team
