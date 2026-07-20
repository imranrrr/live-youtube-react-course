# Document RAG classroom app

This project has a React frontend and a FastAPI backend. A student can upload a
PDF and then ask questions whose answers are generated from the indexed text.

## 1. Prepare Ollama

The existing RAG code uses these two local models:

```bash
ollama pull nomic-embed-text
ollama pull llama3.1
```

Make sure Ollama is running before starting the API.

## 2. Start FastAPI

From the project root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

FastAPI runs at `http://127.0.0.1:8000`. Its interactive documentation is at
`http://127.0.0.1:8000/docs`.

## 3. Start React

Open another terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`, upload a PDF, and ask a question.

## Teaching flow

1. `src/features/chat/Chat.jsx` stores the selected file, messages, and loading states.
2. `chatApi.js` sends the PDF to `POST /upload` using `FormData`.
3. FastAPI loads and splits the PDF, creates embeddings, and saves them in ChromaDB.
4. `chatApi.js` sends a question to `POST /chat` as JSON.
5. FastAPI retrieves relevant chunks and asks Ollama to create the answer.

To use a different backend URL, create `.env` inside `frontend`:

```bash
VITE_API_URL=http://127.0.0.1:8000
```
