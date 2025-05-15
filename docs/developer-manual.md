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
- entries are stored in memory only (reset on server restart)
- no user authentication 

Future Improvements
- connect to Supabase for persistent storage 
- add user login and personalized dashboards 
- improve mobile layout responsiveness 
