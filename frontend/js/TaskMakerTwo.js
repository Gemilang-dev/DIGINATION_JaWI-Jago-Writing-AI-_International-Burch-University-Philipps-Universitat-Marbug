// File: js/TaskMakerTwo.js
// Bertanggung jawab untuk membuat soal IELTS Writing Task 2 melalui Serverless Function.

const TaskMakerTwo = {
    // API Key telah dihapus dari sini untuk keamanan.

    async generateQuestion() {
        console.log("Requesting new Task 2 question via Serverless Function...");

        const prompt = `
            Create a unique IELTS Writing Task 2 question. The topic should be a 'discuss both views and give your own opinion' or an 'argumentative' (agree/disagree) type.
            Provide the output ONLY in a valid JSON format with a single key: "questionText".
            Do not include any text or markdown formatting outside the JSON object.

            Example:
            {
              "questionText": "Some people believe that the government should provide free healthcare for all citizens, while others argue that individuals should be responsible for their own healthcare costs. Discuss both these views and give your own opinion."
            }
        `;

        try {
            // PERUBAHAN UTAMA: Panggil fungsi Netlify kita sendiri
            const response = await fetch('/.netlify/functions/callGemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Serverless function error! status: ${response.status}, body: ${errorBody}`);
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
