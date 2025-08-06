export interface SwapData {
  id: string;
  pair: string
  price: number
  slippage: number
  gasFee: number
  label: string   
  volume: string  
  timestamp: string
  type: "manual" | "bot"
  txHash?: string
  destinationAddress?: string 
}

