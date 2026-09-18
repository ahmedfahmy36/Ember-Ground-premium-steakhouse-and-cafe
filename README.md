# Ember & Ground

A modern, full-stack web application for **Ember & Ground** — a premium steakhouse and café. The application features a high-end, responsive landing page and a fully integrated reservation system that sends automated email confirmations that works locally only.

## Tech Stack

### Frontend
- **Framework:** Next.js (App Router) & React
- **Styling:** Tailwind CSS (Vanilla CSS approach for global theming and custom typography)
- **UI Components:** Built from scratch for a bespoke, premium feel
- **Form Management & Validation:** React Hook Form integrated with Zod
- **Animations/Carousels:** Swiper

### Backend & Infrastructure
- **API:** Next.js Route Handlers (Serverless functions)
- **Database:** Vercel Postgres (Neon) for serverless, scalable SQL storage
- **Transactional Emails:** Nodemailer configured with Google SMTP for reliable, domain-agnostic email delivery
- **Deployment:** Vercel

## Architecture & Approach

This project embraces a modern, monolithic serverless architecture using Next.js:

1. **Component-Driven Design:** The UI is broken down into reusable, highly customized React components (`components/ui` and `components/sections`). We prioritize a rich aesthetic using a carefully selected color palette (charcoal, oxblood, brass) and smooth micro-interactions.
2. **Strict Typing & Validation:** All user inputs from the reservation form are strictly validated both on the client-side and server-side using **Zod**. This ensures database integrity and a smooth user experience.
3. **Backend Integration (CMS/Backend Requirement):** Instead of a traditional CMS, we built a custom **Serverless Backend** using Next.js Route Handlers. It connects directly to **Vercel Postgres** to securely persist data.
4. **Working Backend Feature:** We implemented a fully functional **Reservation Enquiry Form**. When submitted, it strictly validates the data using Zod, saves the reservation to the Postgres database, and uses **Nodemailer** to immediately dispatch an automated confirmation email to the guest.
5. **Performance & Security:** The app leverages Next.js server components for optimal initial load times and applies strict server-side validation to prevent malformed database injections.

##  Local Development

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create your local environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Open `.env.local` and add your own credentials:
   - Provide a `POSTGRES_URL` (You can create a free database on Vercel or Neon to get this URL).
   - Provide `EMAIL_USER` and `EMAIL_PASS` for Nodemailer.
   
   > **Note:** These credentials are only required if you want to test and use the reservation and email system. The rest of the website will still load perfectly fine without them!
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 License
Private repository. All rights reserved.
