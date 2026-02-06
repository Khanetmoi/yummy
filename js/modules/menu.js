import { MENU_DATA, SUBCATEGORIES, CATEGORY_NAMES } from '../utils/constants.js';
import { cart } from './cart.js';
import { subscription } from './subscription.js';

class MenuManager {
    constructor() {
        this.currentCategory = 'breakfast';
        this.currentSubcategory = 'all';
        this.listeners = [];
    }

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    notify() {
        const state = this.getState();
        this.listeners.forEach(cb => cb(state));
    }

    getState() {
        const items = this.getFilteredItems();
        const sub = subscription.getSubscription();
        
        return {
            category: this.currentCategory,
            subcategory: this.currentSubcategory,
            items: items,
            subcategories: SUBCATEGORIES[this.currentCategory],
            hasSubscription: !!sub,
            subscriptionName: sub?.name,
            remainingMeals: sub?.remainingMeals || 0,
            totalMeals: sub?.meals || 0,
            percentage: sub ? (sub.remainingMeals / sub.meals) * 100 : 0,
            hasAccess: sub ? sub.categories.includes(this.currentCategory) : false
        };
    }

    getFilteredItems() {
        let items = MENU_DATA[this.currentCategory] || [];
        
        if (this.currentSubcategory !== 'all') {
            items = items.filter(item => item.subcategory === this.currentSubcategory);
        }
        
        return items;
    }

    setCategory(category) {
        // Vérifier l'accès abonnement
        const sub = subscription.getSubscription();
        if (sub && !sub.categories.includes(category)) {
            return false; // Pas d'accès
        }

        this.currentCategory = category;
        this.currentSubcategory = 'all';
        this.notify();
        return true;
    }

    setSubcategory(subcategory) {
        this.currentSubcategory = subcategory;
        this.notify();
    }

    getItemById(id) {
        return Object.values(MENU_DATA).flat().find(item => item.id === id);
    }

    // Rendu HTML - pourrait être séparé dans un fichier UI dédié
    renderItem(item, hasAccess, hasSubscription) {
        const priceDisplay = !hasSubscription || !hasAccess 
            ? `<div class="menu-price">${item.price.toFixed(2)}€</div>`
            : `<div class="menu-price" style="color: var(--secondary);">Inclus</div>`;

        return `
            <div class="menu-item" data-id="${item.id}">
                <div class="menu-image">${item.emoji}</div>
                <div class="menu-content">
                    <div class="menu-title">${item.name}</div>
                    <div class="menu-description">${item.description}</div>
                    <div class="menu-footer">
                        ${priceDisplay}
                        <div class="menu-actions">
                            <button class="btn btn-secondary btn-small">Détails</button>
                            <button class="btn btn-primary btn-small">Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export const menu = new MenuManager();