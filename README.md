# Smart Resume Builder - Quick Start

A full-stack resume builder application with AI-powered features.

## 🌟 Features

- 📝 Multiple resume templates
- 🤖 AI-powered resume optimization (OpenAI)
- ✅ ATS checker
- 💾 Save resume to Supabase
- 🎨 Real-time preview
- 📥 Export as PDF
- 🌐 Fully responsive design

## 🛠️ Tech Stack

**Frontend**

- React 19
- Vite
- Tailwind CSS
- React Router

**Backend**

- Node.js
- Express
- OpenAI API
- Supabase

## 📦 Installation

### Prerequisites

- Node.js 24.x or higher
- npm or yarn

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd Smart-Resume-Builder-Project
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd ../client
npm install
cp .env.local.example .env.local
# Edit .env.local with your API URL
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🚀 Deployment

**Backend**: [Render](https://render.com)  
**Frontend**: [Vercel](https://vercel.com)

→ See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

## 📝 Environment Variables

### Backend (server/.env)

```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
OPENAI_API_KEY=your_key
```

### Frontend (client/.env.local)

```
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

## 🗂️ Project Structure

```
├── client/              # React frontend (Vercel)
│   ├── src/
│   ├── public/
│   └── vite.config.js
├── server/              # Node/Express backend (Render)
│   ├── api/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── index.js
└── DEPLOYMENT.md        # Deployment guide
```

## 🧪 API Endpoints

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Resume

- `POST /api/resume` - Generate resume
- `GET /api/resume/:id` - Get resume

### AI Features

- `POST /api/ai/summary` - Generate summary
- `POST /api/ai/improve` - Improve text

## 📞 Support

For issues or questions, check:

1. [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment help
2. Backend logs - `npm run dev`
3. Frontend console - Browser DevTools

## 📄 License

ISC

---

**Ready to deploy?** → See [DEPLOYMENT.md](./DEPLOYMENT.md)
