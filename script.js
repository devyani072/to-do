// Global variables - declared first for proper scoping
let habits = [];
let currentFilter = 'all';
let isDarkMode = false;
let appInitialized = false;

// Initialize the app - Call after all script loads
function initializeAI() {
  console.log('Initializing AI...');
  // AI is ready
}

function initializeMainApp() {
  console.log('Initializing main app...');
  
  // Check if user is logged in
  const savedUser = localStorage.getItem('habitTracker_currentUser');
  if (!savedUser) {
    console.log('No user logged in, redirecting to login page');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    // User is logged in, initialize the app
    console.log('Loading app data...');
    loadData();
    console.log('Habits after load:', habits);
    
    console.log('Setting up event listeners...');
    setupEventListeners();
    
    console.log('Rendering weekly view...');
    renderWeeklyView();
    
    console.log('Updating stats...');
    updateStats();
    
    console.log('Updating motivation quote...');
    updateMotivationQuote();
    
    console.log('Initializing AI...');
    initializeAI();
    
    appInitialized = true;
    console.log('App fully initialized!');
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

// Load data from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Main script DOM loaded');
  initializeMainApp();
});

const categoryIcons = {
  health: '🏃',
  learning: '📚',
  productivity: '⚡',
  mindfulness: '🧘',
  social: '👥',
  other: '✨'
};

const motivationQuotes = [
  "The journey of a thousand miles begins with a single step. - Lao Tzu",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle",
  "Your habits will determine your future. - Jack Canfield",
  "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
  "The only way to make sense out of change is to plunge into it, move with it, and join the dance. - Alan Watts",
  "You miss 100% of the shots you don't take. - Wayne Gretzky",
  "The best way to predict the future is to create it. - Peter Drucker",
  "Small daily improvements are the key to staggering long-term results. - James Clear"
];

// AI-powered habit suggestions
const habitSuggestions = {
  health: [
    "Drink 8 glasses of water daily",
    "Take a 10-minute walk",
    "Do 15 minutes of stretching",
    "Eat a healthy breakfast",
    "Get 7-8 hours of sleep"
  ],
  learning: [
    "Read for 20 minutes",
    "Learn a new word daily",
    "Practice a skill for 30 minutes",
    "Watch an educational video",
    "Write in a journal"
  ],
  productivity: [
    "Plan your day in the morning",
    "Complete your most important task first",
    "Take regular breaks (Pomodoro)",
    "Declutter your workspace",
    "Review and update your goals"
  ],
  mindfulness: [
    "Meditate for 10 minutes",
    "Practice deep breathing",
    "Express gratitude daily",
    "Spend time in nature",
    "Practice mindful eating"
  ],
  social: [
    "Call a friend or family member",
    "Send a thoughtful message",
    "Volunteer or help someone",
    "Join a community group",
    "Practice active listening"
  ],
  other: [
    "Organize your closet",
    "Try a new recipe",
    "Learn a musical instrument",
    "Start a creative hobby",
    "Plan a fun activity"
  ]
};

function initializeAI() {
  // AI-powered features initialization
  setInterval(generateInsights, 30000); // Generate insights every 30 seconds
  showWelcomeMessage();
}

function showWelcomeMessage() {
  const aiMessage = document.createElement('div');
  aiMessage.className = 'ai-message';
  aiMessage.innerHTML = `
    <div class="ai-header">
      <span class="ai-icon">🤖</span>
      <span class="ai-title">AI Habit Coach</span>
    </div>
    <p>Welcome! I'm your AI habit coach. I'll help you build better habits with personalized suggestions and insights.</p>
    <button class="ai-dismiss">Got it!</button>
  `;

  document.body.appendChild(aiMessage);

  const dismissBtn = aiMessage.querySelector('.ai-dismiss');
  dismissBtn.addEventListener('click', () => {
    aiMessage.remove();
  });

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    if (aiMessage.parentNode) {
      aiMessage.remove();
    }
  }, 5000);
}

function generateInsights() {
  if (habits.length === 0) return;

  const insights = [];

  // Analyze completion patterns
  const today = new Date().toDateString();
  const completedToday = habits.filter(h => h.completedToday).length;
  const totalHabits = habits.length;
  const completionRate = completedToday / totalHabits;

  if (completionRate === 1) {
    insights.push("🎉 Excellent! You completed all habits today!");
  } else if (completionRate >= 0.8) {
    insights.push("🌟 Great progress! You're almost there!");
  } else if (completionRate < 0.5) {
    insights.push("💪 Keep going! Every step counts toward your goals.");
  }

  // Check for streaks
  const longStreaks = habits.filter(h => h.streak >= 7);
  if (longStreaks.length > 0) {
    insights.push(`🔥 Amazing! You have ${longStreaks.length} habit(s) with 7+ day streaks!`);
  }

  // Suggest new habits based on categories
  const existingCategories = [...new Set(habits.map(h => h.category))];
  const missingCategories = Object.keys(habitSuggestions).filter(cat => !existingCategories.includes(cat));

  if (missingCategories.length > 0 && habits.length >= 3) {
    const randomCategory = missingCategories[Math.floor(Math.random() * missingCategories.length)];
    const suggestions = habitSuggestions[randomCategory];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    insights.push(`💡 AI Suggestion: Try adding "${randomSuggestion}" to your ${randomCategory} habits!`);
  }

  // Show insights if any
  if (insights.length > 0) {
    showAIInsight(insights[Math.floor(Math.random() * insights.length)]);
  }
}

function showAIInsight(message) {
  // Remove existing insight
  const existingInsight = document.querySelector('.ai-insight');
  if (existingInsight) {
    existingInsight.remove();
  }

  const insight = document.createElement('div');
  insight.className = 'ai-insight';
  insight.innerHTML = `
    <div class="ai-header">
      <span class="ai-icon">🧠</span>
      <span class="ai-title">AI Insight</span>
    </div>
    <p>${message}</p>
  `;

  document.body.appendChild(insight);

  // Auto-dismiss after 8 seconds
  setTimeout(() => {
    if (insight.parentNode) {
      insight.remove();
    }
  }, 8000);
}

function getSmartSuggestions() {
  console.log('Getting smart suggestions...');
  console.log('Current habits:', habits);
  console.log('Habits length:', habits.length);
  
  const existingHabits = habits.map(h => h.text.toLowerCase());
  console.log('Existing habits (lowercase):', existingHabits);

  // If no habits exist, suggest from all categories randomly
  if (habits.length === 0) {
    console.log('No habits found, returning random suggestions from all categories');
    const allSuggestions = [];
    for (const category in habitSuggestions) {
      allSuggestions.push(...habitSuggestions[category]);
    }
    // Shuffle and return 3 random suggestions
    const shuffled = allSuggestions.sort(() => Math.random() - 0.5);
    const randomSuggestions = shuffled.slice(0, 3);
    console.log('Random suggestions:', randomSuggestions);
    return randomSuggestions;
  }

  // Get category with least habits
  const categoryCount = {};
  habits.forEach(habit => {
    categoryCount[habit.category] = (categoryCount[habit.category] || 0) + 1;
  });
  console.log('Category counts:', categoryCount);

  const leastUsedCategory = Object.keys(habitSuggestions).reduce((a, b) =>
    (categoryCount[a] || 0) <= (categoryCount[b] || 0) ? a : b
  );
  console.log('Least used category:', leastUsedCategory);

  // Suggest habits from that category that aren't already added
  const categorySuggestions = habitSuggestions[leastUsedCategory];
  console.log('Category suggestions:', categorySuggestions);
  const newSuggestions = categorySuggestions.filter(suggestion =>
    !existingHabits.some(habit => habit.includes(suggestion.toLowerCase().split(' ')[0]))
  );
  console.log('New suggestions:', newSuggestions);

  // If we don't have enough suggestions, add some from other categories
  if (newSuggestions.length < 3) {
    for (const category in habitSuggestions) {
      if (category !== leastUsedCategory && newSuggestions.length < 3) {
        const otherSuggestions = habitSuggestions[category].filter(suggestion =>
          !existingHabits.some(habit => habit.includes(suggestion.toLowerCase().split(' ')[0])) &&
          !newSuggestions.includes(suggestion)
        );
        newSuggestions.push(...otherSuggestions.slice(0, 3 - newSuggestions.length));
      }
    }
  }

  return newSuggestions.slice(0, 3);
}

// Enhanced add habit function with AI suggestions
function addHabit() {
  const input = document.getElementById("habitInput");
  const categorySelect = document.getElementById("categorySelect");

  if (!input || !categorySelect) return;

  const habitText = input.value.trim();
  const category = categorySelect.value;

  if (habitText === "") return;

  const habit = {
    id: Date.now(),
    text: habitText,
    category: category,
    streak: 0,
    completedToday: false,
    completionHistory: {},
    createdAt: new Date().toISOString()
  };

  habits.push(habit);
  saveData();
  input.value = "";
  renderHabits();
  updateStats();

  // AI feedback
  showAIInsight(`🎯 Great! You've added "${habitText}" to your ${category} habits. Consistency is key!`);
}

// Add AI suggestions button to the UI
function addAISuggestionsButton() {
  const inputSection = document.querySelector('.input-section');
  if (!inputSection) return;

  const aiButton = document.createElement('button');
  aiButton.id = 'aiSuggestBtn';
  aiButton.className = 'ai-suggest-btn';
  aiButton.innerHTML = '🤖 AI Suggest';
  aiButton.title = 'Get AI-powered habit suggestions';

  aiButton.addEventListener('click', () => {
    const suggestions = getSmartSuggestions();
    if (suggestions.length > 0) {
      showAISuggestions(suggestions);
    } else {
      showAIInsight("You're doing great with your current habits! Keep up the good work!");
    }
  });

  inputSection.appendChild(aiButton);
}

function showAISuggestions(suggestions) {
  const modal = document.createElement('div');
  modal.className = 'ai-modal';
  modal.innerHTML = `
    <div class="ai-modal-content">
      <div class="ai-modal-header">
        <h3>🤖 AI Habit Suggestions</h3>
        <span class="ai-modal-close">&times;</span>
      </div>
      <div class="ai-suggestions-list">
        ${suggestions.map(suggestion => `
          <div class="ai-suggestion-item">
            <span>${suggestion}</span>
            <button class="ai-add-suggestion" data-suggestion="${suggestion}">Add</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal
  const closeBtn = modal.querySelector('.ai-modal-close');
  closeBtn.addEventListener('click', () => modal.remove());

  // Add suggestion buttons
  const addButtons = modal.querySelectorAll('.ai-add-suggestion');
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const suggestion = button.dataset.suggestion;
      const input = document.getElementById('habitInput');
      if (input) {
        input.value = suggestion;
        // Auto-select appropriate category based on suggestion
        const categorySelect = document.getElementById('categorySelect');
        if (categorySelect) {
          // Simple keyword matching for category
          if (suggestion.toLowerCase().includes('exercise') || suggestion.toLowerCase().includes('walk') || suggestion.toLowerCase().includes('water') || suggestion.toLowerCase().includes('sleep')) {
            categorySelect.value = 'health';
          } else if (suggestion.toLowerCase().includes('read') || suggestion.toLowerCase().includes('learn') || suggestion.toLowerCase().includes('study')) {
            categorySelect.value = 'learning';
          } else if (suggestion.toLowerCase().includes('plan') || suggestion.toLowerCase().includes('task') || suggestion.toLowerCase().includes('goal')) {
            categorySelect.value = 'productivity';
          } else if (suggestion.toLowerCase().includes('meditate') || suggestion.toLowerCase().includes('gratitude') || suggestion.toLowerCase().includes('mindful')) {
            categorySelect.value = 'mindfulness';
          } else if (suggestion.toLowerCase().includes('call') || suggestion.toLowerCase().includes('friend') || suggestion.toLowerCase().includes('social')) {
            categorySelect.value = 'social';
          }
        }
      }
      modal.remove();
    });
  });

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function loadData() {
  console.log('Loading data...');

  try {
    const savedUser = localStorage.getItem('habitTracker_currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      console.log('Loading data for user:', user.email);
      
      // Set global habits and dark mode from user data
      habits = user.habits || [];
      isDarkMode = user.settings?.darkMode || false;
      
      console.log(`Loaded ${habits.length} habits`);
      console.log('All habits:', habits);
    } else {
      console.log('No user data found');
      habits = [];
      isDarkMode = false;
    }
    
    updateDarkMode();
    renderHabits();
  } catch (error) {
    console.error('Error loading data:', error);
    habits = [];
    isDarkMode = false;
  }
}

function setupEventListeners() {
  const addBtn = document.getElementById("addBtn");
  const habitInput = document.getElementById("habitInput");
  const filterSelect = document.getElementById("filterSelect");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const aiSuggestBtn = document.getElementById("aiSuggestBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (addBtn) {
    addBtn.addEventListener("click", addHabit);
  }

  if (habitInput) {
    habitInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        addHabit();
      }
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", function(e) {
      currentFilter = e.target.value;
      renderHabits();
    });
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", toggleDarkMode);
  }

  if (aiSuggestBtn) {
    aiSuggestBtn.addEventListener("click", () => {
      console.log('AI Suggest button clicked');
      const suggestions = getSmartSuggestions();
      console.log('Suggestions:', suggestions);
      if (suggestions.length > 0) {
        showAISuggestions(suggestions);
      } else {
        showAIInsight("You're doing great with your current habits! Keep up the good work!");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (typeof authManager !== 'undefined') {
        authManager.logout();
      } else {
        // Fallback for demo mode
        localStorage.removeItem('habitTracker_currentUser');
        window.location.href = 'login.html';
      }
    });
  }
}

function addHabit() {
  console.log('addHabit function called');
  const input = document.getElementById("habitInput");
  const categorySelect = document.getElementById("categorySelect");

  if (!input) {
    console.error('Habit input not found');
    return;
  }
  if (!categorySelect) {
    console.error('Category select not found');
    return;
  }

  const habitText = input.value.trim();
  const category = categorySelect.value;

  console.log('Habit text:', habitText, 'Category:', category);

  if (habitText === "") {
    console.warn('Habit text is empty');
    showAIInsight('Please enter a habit to add!');
    return;
  }

  const habit = {
    id: Date.now(),
    text: habitText,
    category: category,
    streak: 0,
    completedToday: false,
    completionHistory: {},
    createdAt: new Date().toISOString()
  };

  console.log('Adding habit:', habit);
  habits.push(habit);
  console.log('Habits after push:', habits);
  
  saveData();
  console.log('Data saved');
  
  input.value = "";
  renderHabits();
  renderWeeklyView();
  updateStats();
  
  showAIInsight(`✅ Great! You've added "${habitText}" to your ${category} habits!`);
  console.log('addHabit completed successfully');
}

function renderHabits() {
  const list = document.getElementById("habitList");
  if (!list) return;

  list.innerHTML = "";

  const filteredHabits = habits.filter(habit => {
    if (currentFilter === 'active') return !habit.completedToday;
    if (currentFilter === 'completed') return habit.completedToday;
    return true;
  });

  filteredHabits.forEach((habit) => {
    const li = document.createElement("li");

    // Checkbox for completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.completedToday || false;
    checkbox.addEventListener("change", () => toggleHabitCompletion(habit.id, checkbox.checked));

    // Habit info section
    const habitInfo = document.createElement("div");
    habitInfo.className = "habit-info";

    // Category icon
    const categoryIcon = document.createElement("span");
    categoryIcon.className = "category-icon";
    categoryIcon.textContent = categoryIcons[habit.category] || '✨';

    // Habit text
    const habitText = document.createElement("span");
    habitText.className = "habit-text";
    habitText.textContent = habit.text;
    if (habit.completedToday) {
      habitText.classList.add("completed");
    }

    // Streak badge
    const streakBadge = document.createElement("span");
    streakBadge.className = `streak-badge ${habit.streak > 0 ? 'active' : ''}`;
    streakBadge.textContent = `${habit.streak}🔥`;

    habitInfo.appendChild(checkbox);
    habitInfo.appendChild(categoryIcon);
    habitInfo.appendChild(habitText);
    habitInfo.appendChild(streakBadge);

    // Habit actions
    const habitActions = document.createElement("div");
    habitActions.className = "habit-actions";

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editHabit(habit.id, habitText));

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => deleteHabit(habit.id));

    habitActions.appendChild(editBtn);
    habitActions.appendChild(deleteBtn);

    li.appendChild(habitInfo);
    li.appendChild(habitActions);

    list.appendChild(li);
  });
}

function toggleHabitCompletion(habitId, completed) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;

  const today = new Date().toDateString();

  if (completed) {
    habit.completedToday = true;
    habit.completionHistory[today] = true;
    habit.streak = calculateStreak(habit);
  } else {
    habit.completedToday = false;
    delete habit.completionHistory[today];
    habit.streak = calculateStreak(habit);
  }

  saveData();
  renderHabits();
  renderWeeklyView();
  updateStats();
}

function calculateStreak(habit) {
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toDateString();

    if (habit.completionHistory[dateStr]) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function editHabit(habitId, habitTextElement) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;

  const currentText = habitTextElement.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.className = "edit-input";

  habitTextElement.replaceWith(input);
  input.focus();

  const saveEdit = () => {
    const newText = input.value.trim();
    if (newText !== "") {
      habit.text = newText;
      saveData();
    }
    renderHabits();
  };

  input.addEventListener("blur", saveEdit);
  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      saveEdit();
    }
  });
}

function deleteHabit(habitId) {
  habits = habits.filter(h => h.id !== habitId);
  saveData();
  renderHabits();
  renderWeeklyView();
  updateStats();
}

function renderWeeklyView() {
  console.log('Rendering weekly view...');
  const weekDaysContainer = document.getElementById("weekDays");
  console.log('Week days container found:', weekDaysContainer);
  if (!weekDaysContainer) {
    console.warn('Week days container not found!');
    return;
  }

  weekDaysContainer.innerHTML = "";

  const today = new Date();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toDateString();

    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.textContent = weekDays[date.getDay()];
    dayElement.dataset.date = dateStr;
    dayElement.style.cursor = 'pointer';

    if (date.toDateString() === today.toDateString()) {
      dayElement.classList.add("today");
    }

    // Calculate completion for this day
    const completedHabits = habits.filter(habit =>
      habit.completionHistory && habit.completionHistory[dateStr]
    ).length;

    const totalHabits = habits.length;
    console.log(`Day ${dateStr}: ${completedHabits}/${totalHabits} completed`);

    if (totalHabits > 0) {
      const completionRate = completedHabits / totalHabits;
      if (completionRate === 1) {
        dayElement.classList.add("completed");
      } else if (completionRate > 0) {
        dayElement.classList.add("partial");
      }
    }

    // Add click functionality
    dayElement.addEventListener('click', () => {
      console.log('Day clicked:', dateStr);
      showDayDetails(dateStr, date);
    });

    weekDaysContainer.appendChild(dayElement);
  }
  console.log('Weekly view rendered successfully');
}

function showDayDetails(dateStr, date) {
  const modal = document.createElement('div');
  modal.className = 'day-modal';
  modal.innerHTML = `
    <div class="day-modal-content">
      <div class="day-modal-header">
        <h3>${date.toDateString()}</h3>
        <span class="day-modal-close">&times;</span>
      </div>
      <div class="day-habits-list">
        ${habits.map(habit => {
          const isCompleted = habit.completionHistory[dateStr];
          return `
            <div class="day-habit-item ${isCompleted ? 'completed' : ''}">
              <div class="habit-info">
                <span class="category-icon">${categoryIcons[habit.category]}</span>
                <span class="habit-text">${habit.text}</span>
              </div>
              <button class="day-toggle-btn ${isCompleted ? 'completed' : ''}" data-habit-id="${habit.id}" data-date="${dateStr}">
                ${isCompleted ? '✓' : '○'}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal
  const closeBtn = modal.querySelector('.day-modal-close');
  closeBtn.addEventListener('click', () => modal.remove());

  // Toggle habit completion for this day
  const toggleButtons = modal.querySelectorAll('.day-toggle-btn');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const habitId = button.dataset.habitId;
      const dateStr = button.dataset.date;
      toggleHabitForDay(habitId, dateStr);
      button.classList.toggle('completed');
      button.textContent = button.classList.contains('completed') ? '✓' : '○';
      button.closest('.day-habit-item').classList.toggle('completed');
      renderWeeklyView(); // Update the weekly view
      updateStats(); // Update stats
    });
  });

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function toggleHabitForDay(habitId, dateStr) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;

  if (habit.completionHistory[dateStr]) {
    delete habit.completionHistory[dateStr];
  } else {
    habit.completionHistory[dateStr] = true;
  }

  saveData();
}

function updateStats() {
  console.log('Updating stats...');
  const todayProgress = document.getElementById('todayProgress');
  const streakInfo = document.getElementById('streakInfo');
  const totalHabits = document.getElementById('totalHabits');

  if (!todayProgress || !streakInfo || !totalHabits) {
    console.warn('Stats elements not found');
    return;
  }

  // Calculate today's progress
  const completedToday = habits.filter(h => h.completedToday).length;
  const total = habits.length;
  const progressPercent = total > 0 ? Math.round((completedToday / total) * 100) : 0;

  todayProgress.textContent = `${progressPercent}%`;

  // Update progress circle
  const progressCircle = document.querySelector('.progress-circle');
  if (progressCircle) {
    const angle = (progressPercent / 100) * 360;
    progressCircle.style.background = `conic-gradient(#667eea ${angle}deg, #ddd ${angle}deg)`;
  }

  // Calculate active streaks
  const activeStreaks = habits.filter(h => h.streak > 0).length;
  streakInfo.textContent = `${activeStreaks} active streaks`;

  // Total habits
  totalHabits.textContent = total;
}

function updateMotivationQuote() {
  const quoteElement = document.getElementById("motivationQuote");
  if (!quoteElement) return;

  const randomQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
  quoteElement.textContent = randomQuote;
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  updateDarkMode();
  saveData();
}

function updateDarkMode() {
  const body = document.body;
  const toggleBtn = document.getElementById("darkModeToggle");

  if (isDarkMode) {
    body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️ Light Mode";
  } else {
    body.classList.remove("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "🌙 Dark Mode";
  }
}

function saveData() {
  try {
    const savedUser = localStorage.getItem('habitTracker_currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      user.habits = habits;
      user.settings = user.settings || {};
      user.settings.darkMode = isDarkMode;
      localStorage.setItem('habitTracker_currentUser', JSON.stringify(user));
      console.log('Data saved for user:', user.email);
    } else {
      console.warn('No user logged in, cannot save data');
    }
  } catch (e) {
    console.error("Failed to save data:", e);
  }
}