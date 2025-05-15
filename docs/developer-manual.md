Installation 
1. Clone the repository:
       git clone https://github.com/YOUR_USERNAME/daily-wellness-app.git
       cd daily-wellness-app
   
2. Install dependencies: 
       npm install

Running the Server
3. Start development server: 
        node server.js

4. Site will be live at: 
        http://localhost:3000

Set up '.ev.local' file with these variables:
NEXT_PUBLIC_SUPABASE_URL=https://lpdlkfrxynwnsjyjlsjd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZGxrZnJ4eW53bnNqeWpsc2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNzcwMzksImV4cCI6MjA2Mjg1MzAzOX0.C0pdQP-UY8HIDACHPV9M_rpzIwSavzOWCoLbRo06ja0


API Endpoints
5. All of these are handled in 'server.js':
    - `GET /api/quotes` — fetches a motivational quote (ZenQuotes API)
    - `GET /api/advice` — fetches a random advice slip (AdviceSlip API)
    - `POST /api/entry` — saves a new journal entry
    - `GET /api/entries` — retrieves all journal entries

Features
6. home page: check in and submit entry 
7. dashboard page: see saved entries and mood trends 
8. about page: learn more about the app 

Limitations 
- environment variables must be correctly set in Vercel or build will fail
- no user authentication 

Future Improvements
- connect to Supabase for persistent storage 
- add user login and personalized dashboards 
- improve mobile layout responsiveness 
- option to export jounral entries 

File Structure 
/api/ -> serverless backend endpoints for Vercel
/public/ -> frontend pages 
/docs/ -> documentation files (developer manual)
.env.local -> environment variables
