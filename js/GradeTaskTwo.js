// File: js/GradeTaskTwo.js
// Bertanggung jawab untuk menilai esai Task 2.

const GradeTaskTwo = {
    // GANTI DENGAN API KEY ANDA
    GEMINI_API_KEY: "AIzaSyCfU12_CTpkhYKn4b1opJeztP-qw0Ll6E4",

    async gradeAnswer(question, userAnswer) {
        console.log("Sending Task 2 essay for grading...");

        const prompt = `
            You are a professional IELTS Writing examiner. Your task is to evaluate the following IELTS Writing Task 2 essay.
            Provide the output ONLY in a valid JSON format. Do not add any text outside the JSON object.

            The user was given this question: "${question}"
            The user wrote this essay: "${userAnswer}"

            Analyze the essay and provide feedback in the following JSON structure:
            {
              "overallScore": { "score": "float", "summary": "string" },
              "criteriaScores": [
                { "name": "Task Response (TR)", "score": "float", "summary": "string", "subScores": [ { "name": "Relevance to Prompt", "score": "integer" }, { "name": "Clarity of Position", "score": "integer" }, { "name": "Depth of Ideas", "score": "integer" } ] },
                { "name": "Coherence & Cohesion (CC)", "score": "float", "summary": "string", "subScores": [ { "name": "Logical Organization", "score": "integer" }, { "name": "Cohesive Devices Usage", "score": "integer" }, { "name": "Paragraphing", "score": "integer" } ] },
                { "name": "Lexical Resource (LR)", "score": "float", "summary": "string", "subScores": [ { "name": "Vocabulary Range", "score": "integer" }, { "name": "Lexical Accuracy", "score": "integer" } ] },
                { "name": "Grammatical Range & Accuracy (GRA)", "score": "float", "summary": "string", "subScores": [ { "name": "Sentence Structure Variety", "score": "integer" }, { "name": "Grammar Accuracy", "score": "integer" } ] }
              ],
              "paragraphAnalysis": [ { "paragraphName": "string", "originalText": "string", "comments": "string", "howToRewrite": "string" } ],
              "sentenceStructureSuggestions": [ { "grammarStructure": "string", "originalSentence": "string", "rephrasedSentence": "string" } ],
              "cohesionSuggestions": [ { "originalText": "string", "improvedText": "string", "explanation": "string" } ]
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
            const feedbackData = JSON.parse(cleanedJsonText);

            console.log("Task 2 grading complete. Feedback received:", feedbackData);
            return feedbackData;

        } catch (error) {
            console.error("Error grading Task 2 answer:", error);
            throw error;
        }
    }
};
