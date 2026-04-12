# AHCT Website Vercel Optimization & Cost Saving Strategy

This document outlines the strategies implemented to optimize the AHCT Ranchi website for Vercel's free tier, ensuring maximum performance with zero hosting costs.

## 1. Static Generation (SSG) & Server Components
Next.js 14 **App Router** is used to its full potential. By default, components are Server Components, which means:
- **Zero Client-side JS**: Most pages (About, Faculty, Overview, Recruiters) send exactly 0KB of JavaScript to the browser for rendering.
- **Improved SEO**: Search engines get fully rendered HTML instantly.
- **Vercel Cost Saving**: Static pages are served from the Edge Network (CDN), using 0 seconds of "Serverless Execution Time."

## 2. Dynamic Content via Client-side Fetching
For content that changes (Notice Board, Campus Events), we use **Client-side Fetching with Firebase SDK**:
- Instead of using expensive Vercel Serverless Functions to fetch data on every request (SSR), the browser connects directly to Firebase.
- This keeps the Vercel usage minimal while providing real-time updates to students.

## 3. Global Edge Caching
- Common components like `Navbar` and `Footer` are optimized to be as lightweight as possible.
- All high-resolution images are linked from external high-performance CDNs (Unsplash/Clearbit), reducing the bandwidth load on Vercel.

## 4. Metadata Optimization
Every static page now includes a dedicated `metadata` object. This replaces the need for client-side `useEffect` titles, improving both load time and social sharing (OpenGraph/Twitter cards).

## 5. Security & Protection
- **Duplicate Form Protection**: The admission form uses client-side IP and phone verification against Firestore before submission, preventing spam and database bloat without needing a backend server.

---
**Status**: Optimized for Vercel Free Tier (Next.js 14).
**Next Steps**: If traffic exceeds 10k users/day, consider upgrading to Vercel Pro or implementing ISR with a longer revalidation period.
