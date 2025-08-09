import CryptoJS from 'crypto-js';
import 'dotenv/config';

const API_KEY = process.env.OKX_API_KEY;
const SECRET_KEY = process.env.OKX_API_SECRET;
const PASSPHRASE = process.env.OKX_API_PASSPHRASE;

export const getAuthHeaders = (method: string, requestPath: string, body = ''): Record<string, string> => {
  if (!API_KEY || !SECRET_KEY || !PASSPHRASE) {
    throw new Error('OKX API credentials are not set in environment variables.');
  }

  const timestamp = new Date().toISOString();
  // Concatenar el timestamp, el método, el path y el body de la petición
  const signatureString = `${timestamp}${method}${requestPath}${body}`;
  // Generar la firma con HMAC-SHA256 y encodearla en Base64
  const signature = CryptoJS.HmacSHA256(signatureString, SECRET_KEY).toString(CryptoJS.enc.Base64);

  return {
    'OK-ACCESS-KEY': API_KEY,
    'OK-ACCESS-SIGN': signature,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-PASSPHRASE': PASSPHRASE,
  };
};