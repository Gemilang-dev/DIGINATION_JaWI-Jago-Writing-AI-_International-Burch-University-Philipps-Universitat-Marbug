// Impor 'fetch' jika Anda menggunakan Node.js versi lama. 
// Di environment Netlify, ini biasanya sudah tersedia.
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  // Hanya izinkan metode POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Ambil data (prompt) yang dikirim dari front-end
    const { prompt } = JSON.parse(event.body);

    // Ambil API Key dari Environment Variable yang aman di Netlify
    const GEMINI_API_KEY = process.env.AIzaSyCfU12_CTpkhYKn4b1opJeztP-qw0Ll6E4;

    if (!GEMINI_API_KEY) {
        throw new Error("API Key tidak ditemukan.");
    }
    
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    // Buat permintaan ke Google Gemini API
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        return { statusCode: response.status, body: errorBody };
    }

    const data = await response.json();

    // Kirim kembali hasil dari Gemini ke front-end
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};