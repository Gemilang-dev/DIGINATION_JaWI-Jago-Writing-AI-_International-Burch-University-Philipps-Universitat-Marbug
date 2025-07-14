GradeTaskOne.js

// File: js/GradeTaskOne.js
// Bertanggung jawab untuk menilai jawaban Task 1 dengan output JSON yang sangat detail.

const GradeTaskOne = {
    // GANTI DENGAN API KEY ANDA
    GEMINI_API_KEY: "AIzaSyCfU12_CTpkhYKn4b1opJeztP-qw0Ll6E4",

    async gradeAnswer(questionData, userAnswer) {
        console.log("Sending answer for detailed grading...");

        // Prompt ini dirancang untuk meniru struktur laporan yang Anda inginkan.
        const prompt = `
            You are a professional IELTS Writing examiner. Your task is to evaluate the following IELTS Writing Task 1 response based on the official criteria.
            Provide the output ONLY in a valid JSON format. Do not add any text or markdown formatting outside the JSON object.

            The user was given this question: "${questionData.questionText}"
            The user wrote this answer: "${userAnswer}"

            Analyze the answer and provide feedback in the following JSON structure:
            {
              "overallScore": {
                "score": "float (e.g., 7.0)",
                "summary": "string (A brief, one-sentence summary of the performance)"
              },
              "criteriaScores": [
                {
                  "name": "Task Achievement (TA)",
                  "score": "float",
                  "summary": "string (Detailed feedback on TA performance)",
                  "subScores": [
                    { "name": "Relevance to Prompt", "score": "integer (1-9)" },
                    { "name": "Key Data Selection", "score": "integer (1-9)" },
                    { "name": "Data Accuracy", "score": "integer (1-9)" },
                    { "name": "Appropriateness of Format", "score": "integer (1-9)" }
                  ]
                },
                {
                  "name": "Coherence & Cohesion (CC)",
                  "score": "float",
                  "summary": "string (Detailed feedback on CC performance)",
                  "subScores": [
                    { "name": "Logical Organization", "score": "integer (1-9)" },
                    { "name": "Effective Introduction & Conclusion", "score": "integer (1-9)" },
                    { "name": "Cohesive Devices Usage", "score": "integer (1-9)" },
                    { "name": "Paragraphing", "score": "integer (1-9)" }
                  ]
                },
                {
                  "name": "Lexical Resource (LR)",
                  "score": "float",
                  "summary": "string (Detailed feedback on LR performance)",
                  "subScores": [
                    { "name": "Vocabulary Range", "score": "integer (1-9)" },
                    { "name": "Lexical Accuracy", "score": "integer (1-9)" },
                    { "name": "Spelling and Word Formation", "score": "integer (1-9)" }
                  ]
                },
                {
                  "name": "Grammatical Range & Accuracy (GRA)",
                  "score": "float",
                  "summary": "string (Detailed feedback on GRA performance)",
                  "subScores": [
                    { "name": "Sentence Structure Variety", "score": "integer (1-9)" },
                    { "name": "Grammar Accuracy", "score": "integer (1-9)" },
                    { "name": "Punctuation Usage", "score": "integer (1-9)" }
                  ]
                }
              ],
              "paragraphAnalysis": [
                {
                  "paragraphName": "string (e.g., 'Introduction')",
                  "originalText": "string (the user's original paragraph text)",
                  "comments": "string (Your detailed comments on this paragraph based on all 4 criteria)",
                  "howToRewrite": "string (Your suggested, improved version of the paragraph)"
                }
              ],
              "sentenceStructureSuggestions": [
                {
                  "grammarStructure": "string (e.g., 'Adverbial Clause of Concession')",
                  "originalSentence": "string (An original sentence from the user's text)",
                  "rephrasedSentence": "string (An improved version of the sentence using the specified grammar structure)"
                }
              ],
              "cohesionSuggestions": [
                {
                  "originalText": "string (A phrase or sentence from the user's text)",
                  "improvedText": "string (An improved version with better cohesion)",
                  "explanation": "string (A brief explanation of why the change improves cohesion)"
                }
              ]
            }
        `;

        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.GEMINI_API_KEY}`; 

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

            console.log("Detailed grading complete. Feedback received:", feedbackData);
            return feedbackData;

        } catch (error) {
            console.error("Error grading answer:", error);
            throw error;
        }
    }
};
