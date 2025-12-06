# Smart Recipe Explorer - MERN Assignment

This is a full-stack application built for the MERN Stack Intern assessment. The goal was to create a recipe manager where users can search for dishes and use Generative AI to simplify cooking instructions.

I used the **MERN stack** (MongoDB, Express, React, Node.js) for the core structure and integrated **Google's Gemini AI** for the smart features.

## Project Features

*   **Search & Filter:** You can search for recipes by name or ingredient. I also added dropdowns to filter by Cuisine (like Indian, Italian) and dietary preference (Veg/Non-veg).
*   **AI Integration:** The coolest part of the app. If a recipe looks too complicated, there's a "Simplify with AI" button. It sends the instructions to Google Gemini and returns a short, beginner-friendly summary.
*   **Recipe Details:** Shows everything you need: ingredients, prep time, difficulty level, and tags.
*   **Backend:** Built with Node.js and Express. It connects to MongoDB Atlas for storage.

## Tech Stack Used

*   **Frontend:** React (created with Vite for speed), plain CSS for styling.
*   **Backend:** Node.js, Express.
*   **Database:** MongoDB Atlas (Cloud).
*   **AI:** Google Gemini API (specifically the `gemini-pro` model).

---

## How to Run Locally

Follow these steps to get the app running on your machine.

### 1. Prerequisites
Make sure you have Node.js installed. You'll also need a Google Gemini API key (it's free).

### 2. Backend Setup
1.  Go to the `server` folder:
    ```bash
    cd server
    npm install
    ```
2.  Create a file named `.env` in the server folder and add your keys:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    GEMINI_API_KEY=your_google_api_key
    ```
3.  **Seed the Database:** Since the app starts empty, run this command to add some sample recipes:
    ```bash
    npm run seed
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    (It runs on port 5000).

### 3. Frontend Setup
1.  Open a new terminal and go to the `client` folder:
    ```bash
    cd client
    npm install
    ```
2.  Start the React app:
    ```bash
    npm run dev
    ```
3.  Open the link shown in the terminal (usually `http://localhost:5173`).

---

## My Thought Process

**Why MERN?**
Since the requirement was to handle JSON-like data (recipes with lists of ingredients and tags), MongoDB was the best fit compared to SQL. Express and Node allow for a quick API setup.

**AI Implementation**
I initially tried the 'flash' model but switched to `gemini-pro` for better stability. I implemented the AI logic on the backend (`controllers/recipeController.js`) rather than the frontend. This is safer because it keeps the API key hidden on the server. The prompt I used is: *"Simplify these cooking instructions for a beginner: [instructions]"*.

**Folder Structure**
I tried to keep it modular:
*   `server/models` -> Database schemas.
*   `server/controllers` -> The actual logic for fetching data and calling AI.
*   `server/routes` -> API endpoints.

---

## API Endpoints (For Testing)

If you want to test the backend using Postman, here are the endpoints:

*   **GET** `http://localhost:5000/api/recipes`
    *   Fetches all recipes. You can add query params like `?search=paneer` or `?cuisine=Indian`.
*   **GET** `http://localhost:5000/api/recipes/:id`
    *   Gets a specific recipe.
*   **POST** `http://localhost:5000/api/recipes/ai-assist`
    *   Body: `{ "recipeId": "your_recipe_id_here" }`
    *   This triggers the AI summary.

---

## Submission Notes
*   I have used a `.gitignore` file, so the `node_modules` and `.env` files are not included in this repo.
*   Please add API keys in the `.env` file to make it work.
