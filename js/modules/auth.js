import { showAlert } from '../utils/helpers.js';

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.listeners = [];
        this.loadFromStorage();
    }

    // Pattern Observer pour notifier les changements
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    notify() {
        this.listeners.forEach(cb => cb(this.currentUser));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('yummy_user');
        if (saved) {
            this.currentUser = JSON.parse(saved);
            this.notify();
        }
    }

    async login(name, password) {
        // Simulation - sera remplacé par Firebase Auth
        this.currentUser = {
            uid: 'user_' + Date.now(),
            name: name,
            email: 'user@example.com',
            address: '123 Rue Example',
            phone: '0123456789',
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('yummy_user', JSON.stringify(this.currentUser));
        this.notify();
        showAlert('Connexion réussie !', 'success');
        return this.currentUser;
    }

    async signup(userData) {
        // Simulation - sera remplacé par Firebase Auth
        this.currentUser = {
            uid: 'user_' + Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('yummy_user', JSON.stringify(this.currentUser));
        this.notify();
        showAlert('Inscription réussie !', 'success');
        return this.currentUser;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('yummy_user');
        this.notify();
        showAlert('Déconnexion réussie', 'success');
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    getUser() {
        return this.currentUser;
    }
}

// Singleton pattern - une seule instance partagée
export const auth = new AuthManager();