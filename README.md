# Smart Recipe Explorer - MERN Assignment

The **MERN stack** (MongoDB, Express, React, Node.js) was utilized for the core structure, and **Google's Gemini AI** was integrated to provide smart features.

## Project Features

*   **Search & Filter:** Recipes can be searched by name or ingredient. Dropdowns have been added to filter results by Cuisine (e.g., Indian, Italian) and dietary preference (Veg/Non-veg).
*   **AI Integration:** A "Simplify with AI" button has been included for complex recipes. Instructions are sent to Google Gemini, and a short, beginner-friendly summary is returned.
*   **Recipe Details:** comprehensive details are displayed, including ingredients, prep time, difficulty level, and tags.
*   **Backend:** The backend was built using Node.js and Express, connected to MongoDB Atlas for storage.

## Tech Stack Used

*   **Frontend:** React (created with Vite for performance), styled with plain CSS.
*   **Backend:** Node.js, Express.
*   **Database:** MongoDB Atlas (Cloud).
*   **AI:** Google Gemini API (specifically the `gemini-pro` model).

---

## Local Setup Instructions

The following steps should be followed to run the application locally.

### 1. Prerequisites
Node.js must be installed. A Google Gemini API key is also required (available for free).

### 2. Backend Setup
1.  The `server` directory should be accessed via terminal:
    ```bash
    cd server
    npm install
    ```
2.  A `.env` file must be created in the server folder with the following credentials:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    GEMINI_API_KEY=your_google_api_key
    ```
3.  **Database Seeding:** As the initial database is empty, the following command should be run to populate sample recipes:
    ```bash
    npm run seed
    ```
4.  The server can be started using:
    ```bash
    npm run dev
    ```
    (The server runs on port 5000).

### 3. Frontend Setup
1.  A new terminal should be opened and pointed to the `client` folder:
    ```bash
    cd client
    npm install
    ```
2.  The React application is started with:
    ```bash
    npm run dev
    ```
3.  The link displayed in the terminal (usually `http://localhost:5173`) should be opened in a browser.

---

## Architectural Decisions

**Why MERN?**
MongoDB was selected as the database because the requirement involved JSON-like data (recipes with variable lists of ingredients and tags), making it a better fit than SQL. Express and Node were chosen to allow for a rapid API setup.

**AI Implementation**
The `gemini-pro` model was selected over the 'flash' model for improved stability. The AI logic was implemented on the backend (`controllers/recipeController.js`) rather than the frontend. This approach ensures the API key remains secure on the server. The prompt used is: *"Simplify these cooking instructions for a beginner: [instructions]"*.

**Folder Structure**
A modular structure was maintained:
*   `server/models` -> Database schemas.
*   `server/controllers` -> Logic for data fetching and AI interaction.
*   `server/routes` -> API endpoints.

---

## API Endpoints (For Testing)

The backend can be tested using Postman via the following endpoints:

*   **GET** `http://localhost:5000/api/recipes`
    *   Fetches all recipes. Query parameters such as `?search=paneer` or `?cuisine=Indian` are supported.
*   **GET** `http://localhost:5000/api/recipes/:id`
    *   Retrieves a specific recipe.
*   **POST** `http://localhost:5000/api/recipes/ai-assist`
    *   Body: `{ "recipeId": "your_recipe_id_here" }`
    *   Triggers the AI summary generation.

---

## Submission Notes
*   A `.gitignore` file has been included; therefore, `node_modules` and `.env` files are excluded from the repository.
*   API keys must be added to the `.env` file for the application to function correctly.
