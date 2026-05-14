# 🌟 Habit Tracker with AI

A beautiful, AI-powered habit tracking application with soothing colors and advanced features.

## ✨ Features

- **AI-Powered Suggestions**: Get intelligent habit recommendations based on your current habits
- **Weekly Progress View**: Click on any day to view/edit habits for that specific date
- **User Authentication**: Sign up and login to keep your data secure
- **Dark Mode**: Toggle between light and dark themes
- **Streak Tracking**: Monitor your habit streaks and progress
- **Category Organization**: Organize habits by health, learning, productivity, mindfulness, social, and other
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 How to Run

### Option 1: Direct File Opening (Simplest)
1. Double-click `index.html` in your file explorer
2. Or right-click `index.html` → Open with → Your browser

### Option 2: Local Web Server (Recommended)
```bash
# Navigate to the project folder
cd path/to/habit-tracker

# Start a local server
python -m http.server 8000

# Or using Node.js (if installed)
npx serve .

# Or using PHP (if installed)
php -S localhost:8000
```

Then open `http://localhost:8000/login.html` in your browser.

## 📁 Project Structure

```
habit-tracker/
├── index.html          # Main application
├── login.html          # Login page
├── signup.html         # Sign up page
├── style.css           # Styling and themes
├── script.js           # Main application logic
├── auth.js             # Authentication system
└── README.md           # This file
```

## 🎯 How to Use

### First Time Setup
1. Open `signup.html` to create a new account
2. Or use `login.html` if you already have an account

### Adding Habits
1. Enter a habit in the input field
2. Select a category from the dropdown
3. Click "Add Habit" or press Enter

### Weekly View
- Click on any day in the weekly view to see habits for that specific date
- Toggle habit completion by clicking the circle button
- View your progress across the week

### AI Features
- Click the "🤖 AI Suggest" button to get personalized habit recommendations
- AI analyzes your current habits and suggests ones from underrepresented categories

### Managing Habits
- Click the edit icon to modify habit text
- Click the delete icon to remove habits
- Use the filter dropdown to view all, active, or completed habits

## 🎨 Features

- **Soothing Colors**: Beautiful gradient backgrounds with calming pastel colors
- **Glassmorphism**: Modern frosted glass effects
- **Smooth Animations**: Hover effects and transitions throughout
- **Progress Visualization**: Circular progress indicators and streak badges
- **Motivational Quotes**: Daily inspiration to keep you motivated

## 🔧 Technical Details

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: LocalStorage with user-specific data isolation
- **Authentication**: Client-side user management system
- **Responsive**: Mobile-first design approach
- **AI**: Algorithmic suggestions based on habit patterns

## 📱 Mobile Support

The app is fully responsive and works great on:
- 📱 Smartphones (iOS/Android)
- 📟 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🔒 Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- User accounts and habits are stored securely in browser storage

## 🚀 Future Enhancements

- [ ] Cloud sync across devices
- [ ] Habit reminders and notifications
- [ ] Data export/import
- [ ] Advanced analytics and insights
- [ ] Social features and challenges

---

Enjoy building better habits with AI assistance! 🌟