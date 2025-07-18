# JaWi AI - AI-Powered IELTS Writing Coach

JaWi AI (Jago Writing AI) is a Single Page Application (SPA) designed as a personal trainer for the IELTS Writing test. It leverages the Google Gemini API to provide users with instant, detailed feedback on their practice essays for both Task 1 (Report Writing) and Task 2 (Essay Writing).

## 🚀 Live Demo & Testing

You can access the live demo of the application here:

**URL:** <https://blue-bush-00b082b03.1.azurestaticapps.net/>

You can use the following credentials to test the application as a regular user:

* **Email:** `test@jawi.com`
* **Password:** `test123`

## ⚠️ Current Status: Front-end Prototype

Please note this version of JaWi AI is a **front-end only prototype** developed within a limited timeframe for a competition. It does not have a live backend or a persistent database. All user authentication and data storage are simulated client-side using local JSON files and the browser's `localStorage`.

## ✨ Key Features

* **AI-Powered Practice:** Sessions for both IELTS Writing Task 1 (graph/chart analysis) and Task 2 (essays).
* **Dynamic Question Generation:** Questions for both tasks are generated on-the-fly by the Gemini API, providing unlimited practice topics.
* **Multi-Dimensional Feedback:** Receive a comprehensive writing analysis, including:
    * An estimated overall IELTS Band Score (1-9).
    * A detailed score breakdown for the 4 official criteria (TA/TR, CC, LR, GRA).
    * Sub-score analysis for each criterion.
    * Paragraph-by-paragraph comments with rewrite suggestions.
    * Actionable suggestions in tables for improving sentence structure and cohesion.
* **Simulated User Roles:** The app simulates `guest`, `user`, and `admin` roles with different views and access levels.
* **Practice History:** A history page lists all completed exercises, color-coded by score, allowing users to review full reports.
* **Interactive UI:** Features a dynamic sidebar, interactive charts, and a practice countdown timer.

## 🛠️ Architecture & Technology Stack

The application is built as a client-side **Single Page Application (SPA)** where all logic runs in the user's browser.

* **Architecture:**
    * **Front-end Only:** All application logic is handled by client-side JavaScript.
    * **Mock Database:** Simulates user data and history using local JSON files.
    * **Secure API Calls:** Structured for easy integration with Serverless Functions to act as a secure proxy for the API key, which is necessary for production.
* **Technology Stack:**
    * **Core:** HTML5, CSS3, JavaScript (ES6+)
    * **Styling:** Tailwind CSS
    * **JavaScript Libraries:** jQuery
    * **SPA Routing:** `jquery.spapp.js` (A lightweight, hash-based routing plugin)
    * **Data Visualization:** Chart.js for rendering graphs.
    * **Artificial Intelligence:** Google Gemini API.

### 📂 Project Structure

The project is organized into a clean and modular structure (ALL fixed code in views folder ):

```
/
|-- index.html              # Landing page for guests
|-- app.html                # Main application shell for logged-in users
|
|-- 📁 data/                 # Mock JSON database files
|   |-- users.json
|   |-- history_list.json
|   '-- submission_... .json
|
|-- 📁 js/                   # All application JavaScript files
|   |-- 📁 lib/              # Third-party libraries (jQuery, spapp)
|   |-- 📁 services/         # API communication logic (TaskMaker, GradeTask)
|   '-- 📜 custom.js         # Main app logic, UI building, and routing
|
|-- 📁 user/                   # All application JavaScript files
|   |-- home.html, history.html, writing_task_1.html, ...
|-- 📁 views/                # HTML templates loaded by the SPA router
|   |-- admindashboard.html

```

### 🌊 Data Flow Example (Essay Grading)

1.  **Submission:** A user submits an essay from a view (e.g., `writing_task_2.html`).
2.  **Service Call:** The view's JavaScript calls the appropriate grading service (e.g., `GradeTaskTwo.js`).
3.  **Prompt Construction:** The service creates a detailed prompt with the question, user's essay, and JSON formatting instructions for the AI.
4.  **Secure API Proxy:** The request is sent to a Serverless Function (simulated), which securely attaches the secret `GEMINI_API_KEY` and forwards the request to the Google Gemini API.
5.  **AI Analysis & Response:** The Gemini API returns a complex JSON object with the full analysis to the Serverless Function, which then passes it back to the front-end.
6.  **Render & Save:** A `renderFeedback()` function parses the JSON and builds the rich HTML report. The result is displayed to the user and saved to `localStorage` for the History page.

### 🔮 Future Development

This prototype serves as a strong foundation for a full-featured application. Future plans include:

1.  **Full Backend Implementation:** Develop a robust backend using **Python** (with Flask or FastAPI) to replace the local JSON files, enabling persistent user data and secure authentication.
2.  **Telegram Bot Integration:** Create a Telegram bot that integrates with the backend, allowing users to practice and receive AI feedback directly within Telegram.
