import { ui } from './modules/ui.js';
import { auth } from './modules/auth.js';
import { menu } from './modules/menu.js';
import { cart } from './modules/cart.js';
import { subscription } from './modules/subscription.js';
import { showAlert } from './utils/helpers.js';

// Exposer les fonctions nécessaires globalement
window.showPage = (page) => ui.showPage(page);
window.logout = () => auth.logout();
window.toggleCart = () => ui.toggleCart();
window.closeModal = () => ui.closeModal();
window.handleSubscriptionClick = () => {
    ui.showPage('subscriptions');
    // Forcer le rendu de la page d'abonnement
    setTimeout(() => ui.renderSubscriptionPage(), 0);
};
window.subscribe = (plan) => subscription.subscribeToPlan(plan);
window.cancelSubscription = () => {
    if (confirm('Êtes-vous sûr de vouloir annuler votre abonnement ?')) {
        subscription.cancel();
    }
};

// Auth
window.handleLogin = async (e) => {
    e.preventDefault();
    const name = document.getElementById('login-name').value;
    const password = document.getElementById('login-password').value;
    await auth.login(name, password);
    ui.showPage('home');
};

window.handleSignup = async (e) => {
    e.preventDefault();
    const userData = {
        name: document.getElementById('signup-name').value,
        email: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value,
        address: document.getElementById('signup-address').value,
        phone: document.getElementById('signup-phone').value
    };
    await auth.signup(userData);
    ui.showPage('home');
};

// Menu
window.selectCategory = (category) => {
    const success = menu.setCategory(category);
    if (!success) {
        showAlert('Cette catégorie n\'est pas incluse dans votre abonnement', 'error');
    }
};

window.selectSubcategory = (subcategory) => {
    menu.setSubcategory(subcategory);
};

window.showItemDetails = (itemId) => {
    const item = menu.getItemById(itemId);
    const existingNote = cart.itemNotes?.[itemId] || '';
    
    const content = `
        <div style="text-align: center; font-size: 4rem; margin-bottom: 1rem;">${item.emoji}</div>
        <p style="text-align: center; color: #666; margin-bottom: 1.5rem;">${item.description}</p>
        
        <div class="detail-section">
            <h4>🥗 Ingrédients</h4>
            <div class="ingredients-list">
                ${item.ingredients.map(ing => `<span class="ingredient-tag">${ing}</span>`).join('')}
            </div>
        </div>
        
        <div class="detail-section">
            <h4>🔥 Informations nutritionnelles</h4>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <div class="calorie-badge">⚡ ${item.calories} kcal</div>
                <div style="padding: 0.5rem 1rem; background: white; border-radius: 20px; border: 1px solid #ddd;">
                    🍽️ 1 portion
                </div>
            </div>
        </div>
        
        <div class="note-section">
            <h4>📝 Note spéciale (allergies/préférences)</h4>
            <textarea id="item-note-${itemId}" placeholder="Ex: Sans gluten, allergies aux noix...">${existingNote}</textarea>
            <div class="note-hint">Cette note sera transmise au chef avec votre commande</div>
        </div>
        
        <button class="btn btn-primary" style="margin-top: 1.5rem; width: 100%;" 
                onclick="window.saveNoteAndAdd(${itemId})">
            ${existingNote ? 'Mettre à jour et ajouter' : 'Ajouter au panier'}
        </button>
    `;
    
    ui.showModal(item.name, content);
};

window.saveNoteAndAdd = (itemId) => {
    const note = document.getElementById(`item-note-${itemId}`)?.value.trim() || '';
    cart.updateNote(itemId, note);
    
    const item = menu.getItemById(itemId);
    cart.addItem(item, note);
    ui.closeModal();
};

window.addToCartFromMenu = (itemId) => {
    const item = menu.getItemById(itemId);
    cart.addItem(item);
};

// Cart
window.removeFromCart = (cartId) => {
    cart.removeItem(cartId);
};

window.validateOrder = async () => {
    const order = await cart.checkout();
    if (order) {
        ui.toggleCart();
    }
};

// Subscription
window.handleSubscriptionClick = () => {
    ui.showPage('subscriptions');
};

window.subscribe = (plan) => {
    subscription.subscribeToPlan(plan);
};

window.cancelSubscription = () => {
    if (confirm('Êtes-vous sûr de vouloir annuler votre abonnement ?')) {
        subscription.cancel();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('🍽️ Yummy App démarrée');
    
    // Navigation
    document.getElementById('nav-home')?.addEventListener('click', () => ui.showPage('home'));
    document.getElementById('nav-menu')?.addEventListener('click', () => ui.showPage('menu'));
    document.getElementById('nav-subscriptions')?.addEventListener('click', handleSubscriptionClick);
    
    // Logo
    document.querySelector('.logo')?.addEventListener('click', () => ui.showPage('home'));
    
    // Auth buttons
    document.getElementById('login-btn')?.addEventListener('click', () => ui.showPage('login'));
    document.getElementById('logout-btn')?.addEventListener('click', () => auth.logout());
    
    // Cart
    document.querySelector('.cart-icon')?.addEventListener('click', () => ui.toggleCart());
    document.querySelector('.close-cart')?.addEventListener('click', () => ui.toggleCart());
    
    // Forms
    document.querySelector('#login form')?.addEventListener('submit', handleLogin);
    document.querySelector('#signup form')?.addEventListener('submit', handleSignup);
    
    // Modal
    document.getElementById('modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'modal') ui.closeModal();
    });
    
    // Category tabs (délégation d'événement)
    document.querySelector('.category-tabs')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-tab')) {
            const category = e.target.id.replace('tab-', '');
            selectCategory(category);
        }
    });
    
    // Subcategories (délégation)
    document.getElementById('subcategories')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('subcategory')) {
            const sub = e.target.dataset.sub;
            selectSubcategory(sub);
        }
    });
});