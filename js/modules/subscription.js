import { SUBSCRIPTION_PLANS } from '../utils/constants.js';
import { showAlert, formatDate } from '../utils/helpers.js';
import { auth } from './auth.js';

class SubscriptionManager {
    constructor() {
        this.currentSubscription = null;
        this.listeners = [];
        this.loadFromStorage();
        
        // Réinitialisation automatique quand on charge
        this.checkReset();
    }

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    notify() {
        this.listeners.forEach(cb => cb(this.currentSubscription));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('yummy_subscription');
        if (saved) {
            this.currentSubscription = JSON.parse(saved);
        }
    }

    saveToStorage() {
        if (this.currentSubscription) {
            localStorage.setItem('yummy_subscription', JSON.stringify(this.currentSubscription));
        } else {
            localStorage.removeItem('yummy_subscription');
        }
    }

    checkReset() {
        if (!this.currentSubscription) return;
        
        const now = new Date();
        const lastReset = new Date(this.currentSubscription.lastReset || this.currentSubscription.startDate);
        const daysSinceReset = Math.floor((now - lastReset) / (1000 * 60 * 60 * 24));
        
        if (daysSinceReset >= 7) {
            this.currentSubscription.remainingMeals = this.currentSubscription.meals;
            this.currentSubscription.lastReset = now.toISOString();
            this.currentSubscription.weeklyUsed = 0;
            this.saveToStorage();
            this.notify();
        }
    }

    subscribeToPlan(planKey) {
        if (!auth.isAuthenticated()) {
            showAlert('Veuillez vous connecter d\'abord', 'error');
            return null;
        }

        const plan = SUBSCRIPTION_PLANS[planKey];
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);

        this.currentSubscription = {
            plan: planKey,
            ...plan,
            remainingMeals: plan.meals,
            totalMeals: plan.meals,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            lastReset: startDate.toISOString(),
            weeklyUsed: 0,
            monthlyUsed: 0,
            status: 'active'
        };

        this.saveToStorage();
        this.notify();
        showAlert(`Abonnement ${plan.name} activé !`, 'success');
        return this.currentSubscription;
    }

    cancel() {
        this.currentSubscription = null;
        this.saveToStorage();
        this.notify();
        showAlert('Abonnement annulé', 'success');
    }

    useMeals(count) {
        if (!this.currentSubscription) return false;
        
        if (this.currentSubscription.remainingMeals < count) {
            showAlert('Plats insuffisants dans votre abonnement', 'error');
            return false;
        }

        this.currentSubscription.remainingMeals -= count;
        this.currentSubscription.weeklyUsed += count;
        this.currentSubscription.monthlyUsed += count;
        this.saveToStorage();
        this.notify();
        return true;
    }

    hasAccessToCategory(category) {
        if (!this.currentSubscription) return false;
        return this.currentSubscription.categories.includes(category);
    }

    getRemainingMeals() {
        return this.currentSubscription?.remainingMeals || 0;
    }

    getSubscription() {
        return this.currentSubscription;
    }

    getStats() {
        if (!this.currentSubscription) return null;
        
        const now = new Date();
        const endDate = new Date(this.currentSubscription.endDate);
        const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
        
        return {
            name: this.currentSubscription.name,
            weeklyTotal: this.currentSubscription.meals,
            monthlyTotal: this.currentSubscription.meals * 4,
            weeklyUsed: this.currentSubscription.weeklyUsed || 0,
            monthlyUsed: this.currentSubscription.monthlyUsed || 0,
            remaining: this.currentSubscription.remainingMeals,
            categories: this.currentSubscription.categories,
            startDate: formatDate(this.currentSubscription.startDate),
            endDate: formatDate(this.currentSubscription.endDate),
            daysLeft: daysLeft > 0 ? daysLeft : 0,
            percentage: (this.currentSubscription.remainingMeals / this.currentSubscription.meals) * 100
        };
    }
}

export const subscription = new SubscriptionManager();