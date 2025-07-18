// File: js/TaskMakerTwo.js
// Bertanggung jawab untuk membuat soal IELTS Writing Task 2.

const TaskMakerTwo = {
    // GANTI DENGAN API KEY ANDA
    GEMINI_API_KEY: "AIzaSyCqvnrpbtEry1ZzcLL0Bfb1Ctil2nx9g1I",

    async generateQuestion() {
        console.log("Requesting new Task 2 question from Gemini...");

        const prompt = `
            Create a unique IELTS Writing Task 2 question. The topic should be a 'discuss both views and give your opinion' or an 'argumentative' (agree/disagree) type.
            Provide the output ONLY in a valid JSON format with a single key: "questionText".
            Do not include any text or markdown formatting outside the JSON object.

            Example:
            {
              "questionText": "Some people believe that the government should provide free healthcare for all citizens, while others argue that individuals should be responsible for their own healthcare costs. Discuss both these views and give your own opinion."
            }
        `;

        // KOREKSI: Menambahkan '/' setelah 'models'
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.GEMINI_API_KEY}`;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
            }

            const result = await response.json();
            const rawResponseText = result.candidates[0].content.parts[0].text;
            const cleanedJsonText = rawResponseText.replace(/^```json\s*/, '').replace(/```$/, '');
            const data = JSON.parse(cleanedJsonText);

            console.log("Successfully generated Task 2 question:", data);
            return data;

        } catch (error) {
            console.error("Error generating Task 2 question:", error);
            throw error;
        }
    }
};
