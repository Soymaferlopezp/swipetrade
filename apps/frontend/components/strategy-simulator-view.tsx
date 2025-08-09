"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type SimulationMetrics = {
  totalInvested: number
  totalCrypto: number
  averagePrice: number
  currentPrice: number
  currentValue: number
}

type Purchase = {
  date: string
  price: number
  crypto: number
}

export function StrategySimulatorView() {
  const [base, setBase] = useState("ETH")
  const [quote, setQuote] = useState("USDT")
  const [amount, setAmount] = useState(100)
  const [frequency, setFrequency] = useState(7)
  const [periods, setPeriods] = useState(5)
  const [result, setResult] = useState<SimulationMetrics | null>(null)
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(false)

  const simulate = async () => {
    setLoading(true)
    setResult(null)

  if (!base || !quote || !amount || amount <= 0 || !frequency || frequency <= 0 || !periods || periods <= 0) {
    console.error("Simulation error: Please fill all fields with valid positive numbers.")
    setLoading(false)
    return;
  }

    try {
      const res = await fetch("http://localhost:3001/api/swaps/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base, quote, amount, frequency , periods }),
      })

      const data = await res.json()

      if (res.ok) {
        setPurchases(data.purchases)
        setResult(data.metrics)
      } else {
        console.error("Simulation error:", data.error)
      }
    } catch (err) {
      console.error("Simulation failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Contextual Intro */}
      <Card className="bg-st-dark-lighter border-st-dark-lighter">
        <CardHeader>
          <CardTitle className="text-st-light">Strategy Simulator</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-st-light/70">
            Simulate a dollar-cost averaging (DCA) strategy using real OKX DEX data. Choose your trading pair, investment amount, frequency, and number of periods to see how your crypto accumulates over time.
          </p>
        </CardContent>
      </Card>

      {/* Input Form */}
      <Card className="bg-st-dark-lighter border-st-dark-lighter">
        <CardHeader>
          <CardTitle className="text-st-light">Simulation Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="base" className="text-st-light">Base Token</Label>
              <Input
                id="base"
                className="bg-st-dark text-st-light"
                value={base}
                onChange={(e) => setBase(e.target.value.toUpperCase())}
              />
            </div>
            <div>
              <Label htmlFor="quote" className="text-st-light">Quote Token</Label>
              <Input
                id="quote"
                className="bg-st-dark text-st-light"
                value={quote}
                onChange={(e) => setQuote(e.target.value.toUpperCase())}
              />
            </div>
            <div>
              <Label htmlFor="amount" className="text-st-light">Amount per Period ($)</Label>
              <Input
                id="amount"
                className="bg-st-dark text-st-light"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="frequency" className="text-st-light">Frequency (days)</Label>
              <Input
                id="frequency"
                className="bg-st-dark text-st-light"
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="periods" className="text-st-light">Periods</Label>
              <Input
                id="periods"
                className="bg-st-dark text-st-light"
                type="number"
                value={periods}
                onChange={(e) => setPeriods(Number(e.target.value))}
              />
            </div>
          </div>

          <Button
            onClick={simulate}
            disabled={loading}
            className="bg-st-mint hover:bg-st-mint/80 text-black font-semibold"
          >
            {loading ? "Simulating..." : "Run Simulation"}
          </Button>
        </CardContent>
      </Card>

      {/* Simulation Results */}
      {result && (
        <Card className="bg-st-dark-lighter border-st-dark-lighter">
          <CardHeader>
            <CardTitle className="text-st-light">Results</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6 text-st-light">
            <div>
              <p className="text-st-muted text-sm mb-1">Total Invested</p>
              <p className="text-xl font-semibold">${result.totalInvested.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-st-muted text-sm mb-1">Total Crypto Acquired</p>
              <p className="text-xl font-semibold">{result.totalCrypto.toFixed(6)} {base}</p>
            </div>
            <div>
              <p className="text-st-muted text-sm mb-1">Average Entry Price</p>
              <p className="text-xl font-semibold">${result.averagePrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-st-muted text-sm mb-1">Current Price</p>
              <p className="text-xl font-semibold">${result.currentPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-st-muted text-sm mb-1">Current Value</p>
              <p className="text-xl font-semibold">${result.currentValue.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-st-muted text-sm mb-1">Net P&L</p>
                <p
                  className={`text-xl font-semibold ${
                    result.currentValue >= result.totalInvested
                      ? "text-st-mint"
                      : "text-st-red"
                  }`}
                >
                  {(
                    ((result.currentValue - result.totalInvested) / result.totalInvested) *
                    100
                  ).toFixed(2)}%
                </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Purchase Log */}
      {purchases.length > 0 && (
        <Card className="bg-st-dark-lighter border-st-dark-lighter">
          <CardHeader>
            <CardTitle className="text-st-light">Purchase Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-st-light">
                <thead className="text-st-muted border-b border-st-dark">
                  <tr>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Price</th>
                    <th className="py-2 pr-4">Crypto Acquired</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((p, idx) => (
                    <tr key={idx} className="border-b border-st-dark/40">
                      <td className="py-2 pr-4">{p.date}</td>
                      <td className="py-2 pr-4">${p.price.toFixed(2)}</td>
                      <td className="py-2 pr-4">{p.crypto.toFixed(6)} {base}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

