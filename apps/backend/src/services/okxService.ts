import axios from 'axios';

type TokenInfo = {
  symbol: string;
  address: string;
  decimals: number;
};

type FetchQuotesOptions = {
  chainId?: string;
  quoteAmount?: string;
  quoteSymbol?: string;
  maxBaseTokens?: number;
  excludeSymbols?: string[];
};

const tokenList: TokenInfo[] = [
  { symbol: 'ETH', address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', decimals: 18 },
  { symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6 },
  { symbol: 'BTC', address: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a', decimals: 18 },
  { symbol: 'SOL', address: '0x4da08a1bff50be96bded5c7019227164b49c9fae', decimals: 18 },
  { symbol: 'AVAX', address: '0xa0b862f60edef4452f25b4160f177db44deb6cf1', decimals: 18 },
];

export const fetchDEXQuotes = async (options: FetchQuotesOptions) => {
  const {
    chainId = '1',
    quoteAmount = '50',
    quoteSymbol = 'USDT',
    maxBaseTokens = 5,
    excludeSymbols = [],
  } = options;

  try {
    const recommendations = await Promise.all(
      tokenList
        .filter(t => t.symbol !== quoteSymbol && !excludeSymbols.includes(t.symbol)) // Filtra tokens de base y excluidos
        .slice(0, maxBaseTokens) // Limita el número de tokens a procesar
        .map(async (baseToken) => {
          const quoteToken = tokenList.find(t => t.symbol === quoteSymbol);
          if (!quoteToken) return null;

          const res = await axios.get('https://web3.okx.com/api/v5/dex/swap/quote', {
            params: {
              baseTokenAddress: baseToken.address,
              quoteTokenAddress: quoteToken.address,
              chainId,
              quoteAmount,
              slippage: '1',
            },
          });

          const quoteData = res.data?.data?.[0];

          if (!quoteData) return null;

          return {
            pair: `${baseToken.symbol}/${quoteToken.symbol}`,
            price: Number(quoteData.price).toFixed(2),
            slippage: Number(quoteData.slippage).toFixed(2),
            gasFee: Number(quoteData.estimatedGasFeeUsd).toFixed(2),
            label: 'OKX DEX Live',
            volume: quoteAmount,
            destinationAddress: quoteData.destination,
          };
        })
    );

    return recommendations.filter(Boolean); // limpiamos nulls
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('❌ Axios error:', err.message);
    } else {
      console.error('❌ Unknown error fetching DEX quotes');
    }
    return [];
  }
};







