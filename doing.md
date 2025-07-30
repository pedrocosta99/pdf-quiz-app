# 📚 Full Stack Quiz Generator App – Development Plan

## 🧱 Tech Stack

- **Frontend**: React, React Router, React Query (TanStack Query)
- **Backend**: FastAPI, PyMuPDF, OpenAI API
- **Optional**: Context API or Zustand for quiz state management

---

## 🧭 Phased Development Plan

### ✅ Phase 1: Setup & Architecture

#### Backend
- [ ] Configure FastAPI with CORS
- [ ] Endpoint `/transcribe-pdf` to extract text from uploaded PDF
- [ ] Endpoint `/generate-quiz` to send text to OpenAI and receive quiz
- [ ] (Optional) Store PDF text and quiz in memory or disk

#### Frontend
- [ ] Initialize React app with React Router and React Query
- [ ] Define routes:
  - `/` → PDF upload page
  - `/review` → Quiz editing page
  - `/quiz` → Quiz execution page
  - `/result` → Quiz result page
- [ ] Setup React Query Provider and route layout
- [ ] Create global state or use `location.state` for quiz data

---

### ✅ Phase 2: Upload and Transcription

- [ ] UI to upload PDF
- [ ] Call `POST /transcribe-pdf` using `useMutation`
- [ ] Show loading state and errors
- [ ] On success, navigate to `/review` with extracted text

---

### ✅ Phase 3: Generate and Review Quiz

- [ ] Call `POST /generate-quiz` with extracted text
- [ ] Display OpenAI-generated questions
- [ ] Allow manual editing of quiz (questions and answers)
- [ ] Store updated quiz in local state

---

### ✅ Phase 4: Run the Quiz

- [ ] Display quiz question by question
- [ ] Track selected answers and current question
- [ ] (Optional) Add timers or instant feedback

---

### ✅ Phase 5: Display Results

- [ ] Show user score and answer review
- [ ] Option to restart or go back to review/edit

---

### ✅ Phase 6: Persistence and Deployment

- [ ] (Optional) Save user answers and edited quiz in backend
- [ ] Add localStorage or backend state saving
- [ ] Deploy backend (e.g., Railway) and frontend (e.g., Vercel)

---

## 🔁 API Contract Example

### `POST /transcribe-pdf`

- **Request:**
  - FormData
    - `file: File` (PDF)
- **Response:**
  ```json
  {
    "text": "Extracted text from the uploaded PDF."
  }

