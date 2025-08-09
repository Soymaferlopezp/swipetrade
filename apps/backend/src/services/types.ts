export type StrategySimulatorParams = {
  tokenIn: string;     // Dirección del token de entrada (ej. USDT)
  tokenOut: string;    // Dirección del token de salida (ej. ETH)
  amount: number;      // Monto por compra (en USD u otra unidad fija)
  frequency: number;   // Frecuencia en días entre compras
  periods: number;     // Cantidad de compras a simular
};

// Resultado de una sola compra simulada
export type SimulatedPurchase = {
  date: string;       // Fecha simulada (ej. "2025-08-01")
  price: number;      // Precio del token en ese momento
  crypto: number;     // Cantidad adquirida
};

// Métricas finales de la estrategia
export type SimulationMetrics = {
  totalInvested: number;
  totalCrypto: number;
  averagePrice: number;
  currentPrice: number;
  currentValue: number;
};

// Respuesta completa de la simulación
export type StrategySimulationResult = {
  purchases: SimulatedPurchase[];
  metrics: SimulationMetrics;
};