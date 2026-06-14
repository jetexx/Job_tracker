🚀 AI Job Tracker

An intelligent full-stack AI-powered job application tracker that helps you organize, monitor, and optimize your entire job search process in one place.

Built with Next.js, TypeScript, Prisma, PostgreSQL, NextAuth, and AI automation, this project acts as your personal career assistant.


✨ Features
📌 Smart Job Tracking
Add and manage job applications in one dashboard
Track status: Applied, Interview, Rejected, Offer 🎯
Store company details, job links, notes, and deadlines


🤖 AI-Powered Assistance
Analyze job descriptions automatically
Generate optimized resumes & cover letters
ATS keyword improvement suggestions
Smart job-fit insights


⏰ Smart Reminders
Interview date alerts
Follow-up reminders
Application status tracking notifications


🔐 Secure Authentication
Google OAuth login via NextAuth
Secure session handling
Protected routes


📊 Dashboard Analytics
Application status overview
Progress tracking
Job search insights


🧠 Tech Stack
Frontend: Next.js (App Router), TypeScript
Backend: Next.js API Routes
Database: PostgreSQL
ORM: Prisma
Auth: NextAuth (Google OAuth)
AI Integration: OpenAI / Agentic AI system
Deployment: Vercel ⚡



🏗️ Architecture
Frontend (Next.js)
        ↓
API Routes (Backend)
        ↓
Prisma ORM
        ↓
PostgreSQL Database
        ↓
AI Services (Resume + Job Analysis)




⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/jetexx/job_tracker.git
cd job_tracker
2️⃣ Install dependencies
npm install
3️⃣ Setup environment variables

Create a .env file:

DATABASE_URL=your_postgres_url

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=your_secret

OPENAI_API_KEY=your_ai_key


4️⃣ Setup Prisma database
npx prisma generate
npx prisma db push


5️⃣ Run the project
npm run dev

App runs at:

http://localhost:3000
🌐 Deployment

This project is optimized for Vercel deployment:

Push to GitHub
Import in Vercel
Add environment variables
Deploy 🚀

Live URL:

https://job-tracker-chi-dun.vercel.app/
💡 Key Highlights
Full-stack production-ready SaaS project
AI integration for real-world job search optimization
Authentication + database + deployment complete
Clean scalable architecture
Internship-ready portfolio project
🎯 Use Case

Perfect for:

Students applying for internships
Developers tracking job applications
Professionals optimizing job search
Portfolio showcase for international roles
🧑‍💻 Author

Jatin

GitHub: https://github.com/jetexx
⭐ Show Support

If you like this project:

⭐ Star the repo
🍴 Fork it
🔁 Share it
