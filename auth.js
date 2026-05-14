// Authentication System for Habit Tracker
class AuthManager {
  constructor() {
    this.currentUser = null;
    this.users = JSON.parse(localStorage.getItem('habitTracker_users') || '[]');
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.checkAuthStatus();
        this.setupEventListeners();
      });
    } else {
      this.checkAuthStatus();
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    console.log('Setting up auth event listeners...');

    // Login form
    const loginForm = document.getElementById('loginForm');
    console.log('Login form found:', loginForm);
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Login form submitted');
        this.login();
      });
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    console.log('Signup form found:', signupForm);
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Signup form submitted');
        this.signup();
      });
    }

    // Demo mode button
    const demoMode = document.getElementById('demoMode');
    if (demoMode) {
      demoMode.addEventListener('click', () => {
        console.log('Demo mode clicked');
        // Create a demo user
        const demoUser = {
          id: 'demo123',
          name: 'Demo User',
          email: 'demo@example.com',
          password: 'demo123',
          createdAt: new Date().toISOString(),
          habits: [
            {
              id: 'demo1',
              text: 'Drink 8 glasses of water',
              category: 'health',
              completionHistory: {},
              streak: 3,
              createdAt: new Date().toISOString()
            },
            {
              id: 'demo2',
              text: 'Read for 20 minutes',
              category: 'learning',
              completionHistory: {},
              streak: 5,
              createdAt: new Date().toISOString()
            },
            {
              id: 'demo3',
              text: 'Exercise 30 minutes',
              category: 'health',
              completionHistory: {},
              streak: 0,
              createdAt: new Date().toISOString()
            }
          ],
          settings: {
            darkMode: false,
            notifications: true
          }
        };

        this.currentUser = demoUser;
        localStorage.setItem('habitTracker_currentUser', JSON.stringify(demoUser));
        this.showSuccess('Demo mode activated! Redirecting...');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      });
    }

    // Test login button
    const testLogin = document.getElementById('testLogin');
    if (testLogin) {
      testLogin.addEventListener('click', () => {
        console.log('Test login clicked');
        // Create a test user
        const testUser = {
          id: 'test123',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test123',
          createdAt: new Date().toISOString(),
          habits: [
            {
              id: 'test1',
              text: 'Meditate for 10 minutes',
              category: 'mindfulness',
              completionHistory: {},
              streak: 0,
              createdAt: new Date().toISOString()
            },
            {
              id: 'test2',
              text: 'Write in journal',
              category: 'productivity',
              completionHistory: {},
              streak: 2,
              createdAt: new Date().toISOString()
            }
          ],
          settings: {
            darkMode: false,
            notifications: true
          }
        };

        this.currentUser = testUser;
        localStorage.setItem('habitTracker_currentUser', JSON.stringify(testUser));
        this.showSuccess('Test login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      });
    }
  }

  login() {
    console.log('Login function called');
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    console.log('Login attempt:', email, password ? '[PASSWORD]' : 'no password');

    const user = this.users.find(u => u.email === email && u.password === password);
    console.log('User found:', user ? 'yes' : 'no');

    if (user) {
      this.currentUser = user;
      localStorage.setItem('habitTracker_currentUser', JSON.stringify(user));
      this.showSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      this.showError('Invalid email or password');
    }
  }

  signup() {
    console.log('Signup function called');
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    console.log('Signup data:', { name, email, password: password ? '[PASSWORD]' : 'no password', confirmPassword: confirmPassword ? '[CONFIRMED]' : 'no confirm' });

    // Validation
    if (password !== confirmPassword) {
      this.showError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      this.showError('Password must be at least 6 characters long');
      return;
    }

    if (this.users.some(u => u.email === email)) {
      this.showError('Email already exists');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password,
      createdAt: new Date().toISOString(),
      habits: [],
      settings: {
        darkMode: false,
        notifications: true
      }
    };

    console.log('Creating new user:', newUser);
    this.users.push(newUser);
    localStorage.setItem('habitTracker_users', JSON.stringify(this.users));

    this.showSuccess('Account created successfully! Redirecting to login...');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('habitTracker_currentUser');
    window.location.href = 'login.html';
  }

  checkAuthStatus() {
    console.log('Checking auth status...');
    const savedUser = localStorage.getItem('habitTracker_currentUser');
    const currentPath = window.location.pathname;
    
    console.log('Current path:', currentPath);
    console.log('Saved user:', savedUser ? 'yes' : 'no');
    
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        console.log('User logged in:', this.currentUser.name);
        // If we're on login/signup pages and user is logged in, redirect to main after a short delay
        if (currentPath.includes('login.html') || currentPath.includes('signup.html')) {
          console.log('User logged in but on auth page, redirecting to index.html');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 100);
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('habitTracker_currentUser');
      }
    } else {
      console.log('No user logged in');
      // If not logged in and trying to access main page, redirect to login
      if (currentPath.includes('index.html') || currentPath === '/' || currentPath === '/index.html' || (!currentPath.includes('login.html') && !currentPath.includes('signup.html') && currentPath !== '/')) {
        if (!currentPath.includes('login.html') && !currentPath.includes('signup.html')) {
          console.log('Not logged in and on main page, redirecting to login.html');
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 100);
        }
      }
    }
  }

  showForgotPassword() {
    const email = prompt('Enter your email address:');
    if (email) {
      const user = this.users.find(u => u.email === email);
      if (user) {
        // In a real app, this would send an email
        alert('Password reset link sent to your email (simulated)');
      } else {
        this.showError('Email not found');
      }
    }
  }

  showSuccess(message) {
    this.showMessage(message, 'success');
  }

  showError(message) {
    this.showMessage(message, 'error');
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.textContent = message;

    const form = document.querySelector('.auth-form');
    if (form) {
      form.parentNode.insertBefore(messageDiv, form);
    }

    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  updateUserData(data) {
    if (this.currentUser) {
      Object.assign(this.currentUser, data);
      localStorage.setItem('habitTracker_currentUser', JSON.stringify(this.currentUser));

      // Update in users array
      const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
      if (userIndex !== -1) {
        this.users[userIndex] = this.currentUser;
        localStorage.setItem('habitTracker_users', JSON.stringify(this.users));
      }
    }
  }
}

// Initialize auth manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing auth...');
  window.authManager = new AuthManager();
  window.AuthManager = AuthManager;

  // Update status if element exists
  const statusEl = document.getElementById('authStatus');
  if (statusEl) {
    statusEl.textContent = '✅ Auth system ready';
    statusEl.style.color = '#27ae60';
  }
});

console.log('Auth script loaded');