import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { base, quote, amount, frequency, periods } = req.body;
        console.log('✅ BACKEND: Recibidos los siguientes datos del frontend:', req.body);

        if (!base || !quote || !amount || amount <= 0 || !frequency || frequency <= 0 || !periods || periods <= 0) {
            console.log('❌ VALIDACIÓN FALLIDA: Faltan o son inválidos los parámetros.');
            return res.status(400).json({ error: 'Missing or invalid parameters' });
        }

        const instId = `${base}-${quote}`;
        
        // ✅ CORRECCIÓN: Usamos un intervalo fijo de 1 día ('1D')
        const bar = '1D'; 
        // ✅ CORRECCIÓN: Calculamos el límite total de datos a pedir para cubrir todos los periodos
        const totalLimit = frequency * periods;

        const apiUrl = `https://www.okx.com/api/v5/market/history-candles?instId=${instId}&bar=${bar}&limit=${totalLimit}`;
        console.log('➡️ Llamando a la API de Exchange con URL:', apiUrl);

        const response = await axios.get(apiUrl);
        console.log('⬅️ Respuesta cruda de la API:', response.data);

        if (response.data.code !== '0' || !response.data.data) {
            console.error('❌ Error de la API de OKX:', response.data.msg);
            return res.status(404).json({ error: 'API error: ' + response.data.msg });
        }
        
        const historicalData = response.data.data.reverse();
        
        if (historicalData.length < totalLimit) {
            console.error(`⚠️ No se encontraron suficientes datos históricos. Se encontraron ${historicalData.length} de ${totalLimit} periodos.`);
            return res.status(404).json({ error: 'Not enough historical data available for the specified periods.' });
        }

        const purchases: { date: string; price: number; crypto: number }[] = [];
        let totalInvested = 0;

        // ✅ CORRECCIÓN: Iteramos sobre los datos, pero solo tomamos uno cada 'frequency' días
        // El bucle anterior estaba forzado porque la API no soportaba '7D'
        for (let i = 0; i < historicalData.length; i += frequency) {
            const dataPoint = historicalData[i];
            const closingPrice = parseFloat(dataPoint[4]); 

            if (isNaN(closingPrice) || closingPrice <= 0) {
                console.log('❌ VALIDACIÓN DE PRECIO FALLIDA: Precio es 0 o inválido.');
                return res.status(404).json({
                    error: `No price data available for token pair ${instId}`,
                });
            }

            const cryptoBought = amount / closingPrice;
            const date = new Date(parseInt(dataPoint[0])).toISOString().split('T')[0];

            purchases.push({
                date,
                price: closingPrice,
                crypto: cryptoBought,
            });
            totalInvested += amount;
        }

        const totalCrypto = purchases.reduce((acc, p) => acc + p.crypto, 0);
        const averagePrice = totalInvested / totalCrypto;
        
        const currentPrice = parseFloat(historicalData[historicalData.length - 1][4]);
        const currentValue = totalCrypto * currentPrice;

        res.json({
            purchases,
            metrics: {
                totalInvested,
                totalCrypto,
                averagePrice,
                currentPrice,
                currentValue,
            },
        });
    } catch (err: any) {
        console.error('🔥 ERROR GENERAL EN SIMULACIÓN:', err);
        
        if (axios.isAxiosError(err) && err.response) {
            console.error(`⚠️ Error de API: Status ${err.response.status}, Mensaje: ${err.response.data?.msg || err.message}`);
            res.status(err.response.status).json({
                error: `API request failed with status ${err.response.status}`,
                details: err.response.data || err.message
            });
        } else if (err instanceof Error) {
            console.error('🔥 Error en simulator:', err.message);
            res.status(500).json({ error: 'Simulation failed', details: err.message });
        } else {
            res.status(500).json({ error: 'Simulation failed', details: String(err) });
        }
    }
});

export default router;

