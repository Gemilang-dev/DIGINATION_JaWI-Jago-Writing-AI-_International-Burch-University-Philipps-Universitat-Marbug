// File: js/TaskMakerOne.js
// Bertanggung jawab untuk membuat soal IELTS Writing Task 1 melalui Serverless Function.

const TaskMakerOne = {
    // API Key telah dihapus dari sini untuk keamanan.
    
    async generateQuestion() {
        console.log("Requesting new Task 1 question via Serverless Function...");

        const prompt = `
            Create a unique IELTS Writing Task 1 (Academic) question.
            Provide the output ONLY in a valid JSON format. Do not include any text before or after the JSON object.
            The JSON object must have two main keys: "questionText" and "chartData".

            1.  "questionText": A string containing the standard IELTS prompt.
            2.  "chartData": A valid Chart.js configuration object. 
                - It MUST include an "options" object.
                - Inside "options", set "responsive": true AND "maintainAspectRatio": false.
                - Also add a title to the chart inside "options.plugins.title" and set "display": true.
                - The chart should be a 'bar' or 'line' type.
                - The data should be simple, clear, and easy to describe for an IELTS task.
        `;

        try {
            // PERUBAHAN UTAMA: Panggil fungsi Netlify kita sendiri
            const response = await fetch('/.netlify/functions/callGemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt }), // Kirim prompt di dalam body
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Serverless function error! status: ${response.status}, body: ${errorBody}`);
            }

            const result = await response.json();
            
            const rawResponseText = result.candidates[0].content.parts[0].text;
            const cleanedJsonText = rawResponseText.replace(/^```json\s*/, '').replace(/```$/, '');
            const data = JSON.parse(cleanedJsonText);

            console.log("Successfully generated question via function:", data);
            return data;

        } catch (error) {
            console.error("Error generating Task 1 question:", error);
            throw error;
        }
    }
};
