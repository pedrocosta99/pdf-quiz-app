# 🧠 AI-Powered PDF Quiz Generator

This full-stack project allows users to upload a PDF, extract its content, and generate an AI-powered multiple-choice quiz. Built with modern technologies such as **FastAPI**, **Next.js**, **TailwindCSS**, **Zustand**, and **React Query**.

👉 **Live Demo:** [https://pdf-quiz-app-zeta.vercel.app/](https://pdf-quiz-app-zeta.vercel.app/)

---

## 🧰 Tech Stack

### Frontend

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query (TanStack Query)](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend

- [FastAPI](https://fastapi.tiangolo.com/)
- [Pydantic](https://docs.pydantic.dev/)
- [Python 3.10+](https://www.python.org/)
- [OpenAI API](https://platform.openai.com/docs/api-reference)

---

## 📂 Project Structure

#### backend/ # FastAPI backend
#### quiz-app-frontend/ # Next.js frontend

---

## 🚀 Getting Started Locally

### 🔧 Backend (FastAPI)

Don't forget to set your OPENAI_API_KEY in the .env

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
OPENAI_API_KEY=yourKey
pip install -r requirements.txt
uvicorn main:app --reload
```

### 📺 Frontend (NextJS)

```bash
cd quiz-app-frontend
npm install
npm run dev
```

Make sure the localhost on frontend matches the one in the backend when running local!

Features
- Upload and parse PDF files

- Generate multiple-choice questions with OpenAI

- Edit questions and answers before starting quiz

- Interactive quiz experience

- Review results with correct and incorrect answers

- Responsive and clean UI with Tailwind
