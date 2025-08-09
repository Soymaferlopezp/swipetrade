// apps/backend/controllers/swapsController.ts
import { Request, Response } from "express";
import { fetchDEXQuotes } from "../services/okxService";

export const getRecommendations = async (req: Request, res: Response) => {
  // Permite override por query (?chainId=1&quoteAmount=50&quoteSymbol=USDT&maxBaseTokens=8&excludeSymbols=USDT,USDC)
  const {
    chainId = "1",
    quoteAmount = "50",
    quoteSymbol = "USDT",
    maxBaseTokens = "5",
    excludeSymbols, // ej: "USDT,USDC,DAI"
  } = req.query as Record<string, string | undefined>;

  try {
    const recommendations = await fetchDEXQuotes(String(quoteAmount), {
      chainId: String(chainId),
      quoteSymbol: String(quoteSymbol),
      maxBaseTokens: Number(maxBaseTokens) || 5,
      excludeSymbols:
        typeof excludeSymbols === "string"
          ? excludeSymbols.split(",").map(s => s.trim())
          : undefined,
    });

    if (!recommendations || recommendations.length === 0) {
      return res.status(404).json({ error: "No DEX recommendations available" });
    }

    return res.json(recommendations);
  } catch (err) {
    console.error("[DEX] Controller error:", err);
    return res.status(500).json({ error: "Error fetching DEX recommendations" });
  }
};

export default { getRecommendations };




