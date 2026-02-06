import { calculateDeliveryTime, showAlert } from '../utils/helpers.js';
import { subscription } from './subscription.js';
import { auth } from './auth.js';

class CartManager {
    constructor() {
        this.items = [];
        this.listeners = [];
        this.itemNotes = {};
        this.loadNotesFromStorage();
    }

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    notify() {
        this.listeners.forEach(cb => cb(this.getState()));
    }

    getState() {
        return {
            items: [...this.items],
            count: this.items.length,
            total: this.calculateTotal(),
            deliveryTime: calculateDeliveryTime(this.items.length),
            canCheckout: this.items.length > 0 && auth.isAuthenticated()
        };
    }

    loadNotesFromStorage() {
        const saved = localStorage.getItem('yummy_notes');
        if (saved) {
            this.itemNotes = JSON.parse(saved);
        }
    }

    saveNotesToStorage() {
        localStorage.setItem('yummy_notes', JSON.stringify(this.itemNotes));
    }

    addItem(item, note = '') {
        if (!auth.isAuthenticated()) {
            showAlert('Veuillez vous connecter pour commander', 'error');
            return false;
        }

        // Vérifier l'accès abonnement
        if (subscription.getSubscription()) {
            const hasAccess = subscription.hasAccessToCategory(item.category || this.inferCategory(item.id));
            if (!hasAccess) {
                showAlert('Cette catégorie n\'est pas incluse dans votre abonnement', 'error');
                return false;
            }
        }

        const cartItem = {
            ...item,
            cartId: Date.now() + Math.random(), // ID unique pour chaque ajout
            note: note || this.itemNotes[item.id] || ''
        };

        this.items.push(cartItem);
        this.notify();
        showAlert(`${item.name} ajouté au panier`, 'success');
        return true;
    }

    inferCategory(itemId) {
        // Helper pour trouver la catégorie d'un plat
        // Sera remplacé par une meilleure logique avec Firebase
        return 'lunch'; // Default
    }

    removeItem(cartId) {
        this.items = this.items.filter(item => item.cartId !== cartId);
        this.notify();
    }

    updateNote(itemId, note) {
        if (note) {
            this.itemNotes[itemId] = note;
        } else {
            delete this.itemNotes[itemId];
        }
        this.saveNotesToStorage();
    }

    calculateTotal() {
        if (subscription.getSubscription()) {
            return 0; // Payé par abonnement
        }
        return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
    }

    async checkout() {
        if (this.items.length === 0) {
            showAlert('Votre panier est vide', 'error');
            return false;
        }

        // Utiliser les plats de l'abonnement si applicable
        if (subscription.getSubscription()) {
            const success = subscription.useMeals(this.items.length);
            if (!success) return false;
        }

        // Créer la commande (sera envoyée à Firebase)
        const order = {
            id: 'order_' + Date.now(),
            userId: auth.getUser()?.uid,
            items: [...this.items],
            total: this.calculateTotal(),
            deliveryTime: calculateDeliveryTime(this.items.length),
            status: 'pending',
            paymentStatus: 'on_site',
            createdAt: new Date().toISOString()
        };

        // Vider le panier
        this.items = [];
        this.notify();
        
        showAlert(`Commande validée ! Livraison dans ${order.deliveryTime}. Paiement sur place.`, 'success');
        return order;
    }

    clear() {
        this.items = [];
        this.notify();
    }

    getItems() {
        return [...this.items];
    }

    renderCartItems(items) {
        // Grouper par item pour afficher les quantités
        const grouped = items.reduce((acc, item) => {
            const key = `${item.id}-${item.note}`;
            if (!acc[key]) {
                acc[key] = { ...item, quantity: 0, cartIds: [] };
            }
            acc[key].quantity++;
            acc[key].cartIds.push(item.cartId);
            return acc;
        }, {});

        return Object.values(grouped).map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div style="font-size: 0.9rem; color: #666;">Qté: ${item.quantity}</div>
                    ${item.note ? `<div class="cart-item-note">Note: ${item.note}</div>` : ''}
                </div>
                <button data-cart-id="${item.cartIds[0]}" 
                        style="background: none; border: none; cursor: pointer; font-size: 1.2rem;">
                    🗑️
                </button>
            </div>
        `).join('');
    }
}

export const cart = new CartManager();