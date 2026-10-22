# Cheese Burger POS

React + Vite POS system.

## Run
1. Node.js install karein (v18 ya upar): https://nodejs.org
2. Is folder mein terminal kholein:

   npm install
   npm run dev

3. Browser mein dikhaye gaye link (http://localhost:5173) ko kholein.

## Build (hosting ke liye)
   npm run build
`dist` folder ko kisi bhi hosting (Netlify, Vercel) par upload kar dein.

## Menu / prices badalna
`src/App.jsx` ke upar `MENU` array mein items, prices aur image links hain.
Tax rate `TAX` constant mein hai.
