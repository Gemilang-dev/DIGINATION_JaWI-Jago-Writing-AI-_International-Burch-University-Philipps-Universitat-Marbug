// File: js/TaskMakerOne.js
// Bertanggung jawab untuk membuat soal IELTS Writing Task 1 menggunakan Gemini API.

const TaskMakerOne = {
    // GANTI DENGAN API KEY ANDA
    GEMINI_API_KEY: "AIzaSyCqvnrpbtEry1ZzcLL0Bfb1Ctil2nx9g1I",

    async generateQuestion() {
        console.log("Requesting new Task 1 question from Gemini...");

        const prompt = `
            Create a unique IELTS Writing Task 1 (Academic) question.
            Provide the output ONLY in a valid JSON format. Do not include any text before or after the JSON object.
            The JSON object must have two main keys: "questionText" and "chartData".

            1. "questionText": A string containing the standard IELTS prompt, for example: "The chart below shows the percentage of..."
            2. "chartData": A valid Chart.js configuration object. It should represent data for a bar, line, or pie chart.
               - It must have "type" (e.g., 'bar', 'line').
               - It must have a "data" object with "labels" (an array of strings) and "datasets" (an array of objects).
               - Each object in "datasets" must have a "label" (string) and "data" (an array of numbers).
               - The data should be simple, clear, and easy to describe for an IELTS task.
        `;

        // --- URL API DIPERBARUI DI SINI ---
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.GEMINI_API_KEY}`;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                }),
            });

            if (!response.ok) {
                // Memberikan detail error yang lebih baik
                const errorBody = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
            }

            const result = await response.json();
            
            // Membersihkan respons dari pembungkus markdown
            const rawResponseText = result.candidates[0].content.parts[0].text;
            const cleanedJsonText = rawResponseText
                .replace(/^```json\s*/, '') 
                .replace(/```$/, '');      
                
            const data = JSON.parse(cleanedJsonText);

            console.log("Successfully generated question:", data);
            return data;

        } catch (error) {
            console.error("Error generating question:", error);
            throw error;
        }
    }
};


