// File: js/GradeTaskOne.js
// Bertanggung jawab untuk menilai jawaban Task 1 melalui Serverless Function.

const GradeTaskOne = {
    // API Key telah dihapus dari sini untuk keamanan.

    async gradeAnswer(questionData, userAnswer) {
        console.log("Sending Task 1 answer for grading via Serverless Function...");

        const prompt = `
            You are a professional IELTS Writing examiner. Your task is to evaluate the following IELTS Writing Task 1 response.
            Provide the output ONLY in a valid JSON format. Do not add any text outside the JSON object.

            The user was given this question: "${questionData.questionText}"
            The user wrote this answer: "${userAnswer}"

            Analyze the answer and provide feedback in the following JSON structure:
            {
              "overallScore": { "score": "float", "summary": "string" },
              "criteriaScores": [
                { "name": "Task Achievement (TA)", "score": "float", "summary": "string", "subScores": [ { "name": "Relevance to Prompt", "score": "integer" }, { "name": "Key Data Selection", "score": "integer" } ] },
                { "name": "Coherence & Cohesion (CC)", "score": "float", "summary": "string", "subScores": [ { "name": "Logical Organization", "score": "integer" }, { "name": "Cohesive Devices Usage", "score": "integer" } ] },
                { "name": "Lexical Resource (LR)", "score": "float", "summary": "string", "subScores": [ { "name": "Vocabulary Range", "score": "integer" }, { "name": "Lexical Accuracy", "score": "integer" } ] },
                { "name": "Grammatical Range & Accuracy (GRA)", "score": "float", "summary": "string", "subScores": [ { "name": "Sentence Structure Variety", "score": "integer" }, { "name": "Grammar Accuracy", "score": "integer" } ] }
              ],
              "paragraphAnalysis": [ { "paragraphName": "string", "originalText": "string", "comments": "string", "howToRewrite": "string" } ],
              "sentenceStructureSuggestions": [ { "grammarStructure": "string", "originalSentence": "string", "rephrasedSentence": "string" } ],
              "cohesionSuggestions": [ { "originalText": "string", "improvedText": "string", "explanation": "string" } ]
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
            const feedbackData = JSON.parse(cleanedJsonText);

            console.log("Task 1 grading complete. Feedback received:", feedbackData);
            return feedbackData;

        } catch (error) {
            console.error("Error grading Task 1 answer:", error);
            throw error;
        }
    }
};
