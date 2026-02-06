import { menu } from './menu.js';
import { cart } from './cart.js';
import { auth } from './auth.js';
import { subscription } from './subscription.js';
import { showAlert } from '../utils/helpers.js';
import { CATEGORY_NAMES, SUBSCRIPTION_PLANS } from '../utils/constants.js';

class UIManager {
    constructor() {
        this.init();
    }

    init() {
        // S'abonner aux changements d'état
        auth.subscribe((user) => this.updateAuthUI(user));
        cart.subscribe((state) => this.updateCartUI(state));
        menu.subscribe((state) => this.updateMenuUI(state));
        subscription.subscribe((sub) => this.updateSubscriptionUI(sub));
        
        // Rendu initial
        this.updateAuthUI(auth.getUser());
        this.updateCartUI(cart.getState());
        
        // Délégation pour les boutons dynamiques du menu
        document.getElementById('menu-grid')?.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            
            const itemId = btn.closest('.menu-item')?.dataset.id;
            if (!itemId) return;
            
            if (btn.textContent === 'Détails') {
                window.showItemDetails(parseInt(itemId));
            } else if (btn.textContent === 'Ajouter') {
                window.addToCartFromMenu(parseInt(itemId));
            }
        });
        
        // Délégation pour le panier
        document.getElementById('cart-items')?.addEventListener('click', (e) => {
            if (e.target.closest('button')?.textContent === '🗑️') {
                const cartId = e.target.closest('button').dataset.cartId;
                window.removeFromCart(cartId);
            }
        });
    }

    // Navigation entre pages
    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId)?.classList.add('active');
        
        if (pageId === 'menu') {
            menu.notify(); // Forcer le rendu du menu
        } else if (pageId === 'subscriptions') {
            this.renderSubscriptionPage();
        }
    }

    updateAuthUI(user) {
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const userName = document.getElementById('user-name');
        
        if (user) {
            loginBtn?.classList.add('hidden');
            logoutBtn?.classList.remove('hidden');
            if (userName) userName.textContent = `Bonjour, ${user.name}`;
        } else {
            loginBtn?.classList.remove('hidden');
            logoutBtn?.classList.add('hidden');
            if (userName) userName.textContent = '';
        }
    }

    updateCartUI(state) {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const deliveryTime = document.getElementById('delivery-time');
        
        if (cartCount) cartCount.textContent = state.count;
        if (deliveryTime) deliveryTime.textContent = state.deliveryTime;
        
        if (cartItems) {
            if (state.items.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Votre panier est vide</p>';
            } else {
                cartItems.innerHTML = this.renderCartItems(state.items);
            }
        }
        
        if (cartTotal) {
            cartTotal.textContent = state.total === 0 && state.items.length > 0 
                ? 'Payé par abonnement' 
                : `${state.total.toFixed(2)}€`;
        }
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
                <button class="remove-cart-btn" 
                        data-cart-id="${item.cartIds[0]}"
                        style="background: none; border: none; cursor: pointer; font-size: 1.2rem;">
                    🗑️
                </button>
            </div>
        `).join('');
    }

   updateMenuUI(state) {
    // Mettre à jour les onglets de catégorie (peuvent exister sur plusieurs pages)
    const tabBreakfast = document.getElementById('tab-breakfast');
    const tabLunch = document.getElementById('tab-lunch');
    const tabDinner = document.getElementById('tab-dinner');
    
    if (tabBreakfast) tabBreakfast.classList.toggle('active', state.category === 'breakfast');
    if (tabLunch) tabLunch.classList.toggle('active', state.category === 'lunch');
    if (tabDinner) tabDinner.classList.toggle('active', state.category === 'dinner');
    
    // Mettre à jour les sous-catégories
    const subContainer = document.getElementById('subcategories');
    if (subContainer) {
        subContainer.innerHTML = state.subcategories.map(sub => `
            <div class="subcategory ${sub.id === state.subcategory ? 'active' : ''}" 
                 onclick="window.selectSubcategory('${sub.id}')">
                ${sub.name}
            </div>
        `).join('');
    }
    
    // Afficher/masquer le dashboard d'abonnement (uniquement sur la page menu)
    const dashboard = document.getElementById('user-dashboard');
    if (dashboard) {
        if (state.hasSubscription) {
            dashboard.classList.remove('hidden');
            const subType = document.getElementById('sub-type');
            const remainingMeals = document.getElementById('remaining-meals');
            const totalMeals = document.getElementById('total-meals');
            const quotaBar = document.getElementById('quota-bar');
            
            if (subType) subType.textContent = state.subscriptionName;
            if (remainingMeals) remainingMeals.textContent = state.remainingMeals;
            if (totalMeals) totalMeals.textContent = state.totalMeals;
            if (quotaBar) quotaBar.style.width = `${state.percentage}%`;
        } else {
            dashboard.classList.add('hidden');
        }
    }
    
    // Rendre les items du menu (uniquement si l'élément existe)
    const grid = document.getElementById('menu-grid');
    if (grid) {
        grid.innerHTML = state.items.map(item => 
            menu.renderItem(item, state.hasAccess, state.hasSubscription)
        ).join('');
    }
}

renderSubscriptionPage() {
    const hasSub = subscription.getSubscription();
    const currentContainer = document.getElementById('current-sub-container');
    const availablePlans = document.getElementById('available-plans');
    const pageTitle = document.getElementById('sub-page-title');
    const pageSubtitle = document.getElementById('sub-page-subtitle');
    
    if (!availablePlans) return;
    
    if (hasSub) {
        // Mode: a déjà un abonnement
        currentContainer?.classList.remove('hidden');
        availablePlans.classList.remove('hidden');
        
        if (pageTitle) pageTitle.textContent = 'Votre Abonnement';
        if (pageSubtitle) pageSubtitle.textContent = 'Gérez votre abonnement actuel ou changez de formule';
        
        // Afficher les détails de l'abonnement actuel
        if (currentContainer) {
            const stats = subscription.getStats();
            currentContainer.innerHTML = `
                <div class="current-sub-details">
                    <div class="current-sub-header">
                        <div class="current-sub-title">${stats.name}</div>
                        <span class="sub-status">Actif</span>
                    </div>
                    
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-value">${stats.weeklyTotal}</div>
                            <div class="stat-label">Plats/semaine</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${stats.monthlyTotal}</div>
                            <div class="stat-label">Plats/mois</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${stats.weeklyUsed}</div>
                            <div class="stat-label">Utilisés cette semaine</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${stats.remaining}</div>
                            <div class="stat-label">Restants</div>
                        </div>
                    </div>

                    <ul class="sub-info-list">
                        <li>
                            <span>Catégories incluses:</span>
                            <strong>${stats.categories.map(c => CATEGORY_NAMES[c]).join(', ')}</strong>
                        </li>
                        <li>
                            <span>Date de début:</span>
                            <strong>${stats.startDate}</strong>
                        </li>
                        <li>
                            <span>Date de fin:</span>
                            <strong>${stats.endDate}</strong>
                        </li>
                        <li>
                            <span>Renouvellement:</span>
                            <strong>${stats.daysLeft > 0 ? `Dans ${stats.daysLeft} jours` : 'Expire aujourd\'hui'}</strong>
                        </li>
                    </ul>

                    <div style="margin-top: 2rem; text-align: center;">
                        <button class="btn btn-danger" onclick="window.cancelSubscription()">Annuler l'abonnement</button>
                    </div>
                </div>
            `;
        }
        
        // Générer les autres plans disponibles
        this.renderAvailablePlans(availablePlans, hasSub.plan);
        
    } else {
        // Mode: pas d'abonnement
        currentContainer?.classList.add('hidden');
        availablePlans.classList.remove('hidden');
        
        if (pageTitle) pageTitle.textContent = 'Choisissez votre abonnement';
        if (pageSubtitle) pageSubtitle.textContent = 'Des économies garanties pour vos repas chaque semaine';
        
        // Générer tous les plans
        this.renderAvailablePlans(availablePlans, null);
    }
}

async renderAvailablePlans(container, currentPlanKey) {
    const { SUBSCRIPTION_PLANS } = await import('../utils/constants.js');
    
    const plans = [
        { key: 'bon', popular: false },
        { key: 'delicieux', popular: true },
        { key: 'exquis', popular: false }
    ];
    
    container.innerHTML = '<div class="plans-grid">' + plans.map(({key, popular}) => {
        const plan = SUBSCRIPTION_PLANS[key];
        const isCurrent = key === currentPlanKey;
        
        return `
            <div class="plan-card ${popular ? 'popular' : ''} ${isCurrent ? 'current' : ''}">
                ${popular ? '<div class="popular-badge">Populaire</div>' : ''}
                ${isCurrent ? '<div class="current-badge">Votre Plan</div>' : ''}
                <div class="plan-name">${plan.name}</div>
                <div class="plan-price">${plan.price}€<span>/semaine</span></div>
                <ul class="plan-features">
                    ${plan.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <button class="btn btn-primary" style="width: 100%;" onclick="window.subscribe('${key}')" ${isCurrent ? 'disabled style="opacity:0.6"' : ''}>
                    ${isCurrent ? 'Plan actuel' : 'Choisir ce plan'}
                </button>
            </div>
        `;
    }).join('') + '</div>';
}

renderAvailablePlans(container, currentPlanKey) {
    const plans = [
        { key: 'bon', popular: false },
        { key: 'delicieux', popular: true },
        { key: 'exquis', popular: false }
    ];
    
    container.innerHTML = '<div class="plans-grid">' + plans.map(({key, popular}) => {
        const plan = SUBSCRIPTION_PLANS[key];
        const isCurrent = key === currentPlanKey;
        
        return `
            <div class="plan-card ${popular ? 'popular' : ''} ${isCurrent ? 'current' : ''}">
                ${popular ? '<div class="popular-badge">Populaire</div>' : ''}
                ${isCurrent ? '<div class="current-badge">Votre Plan</div>' : ''}
                <div class="plan-name">${plan.name}</div>
                <div class="plan-price">${plan.price}€<span>/semaine</span></div>
                <ul class="plan-features">
                    ${plan.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <button class="btn btn-primary" style="width: 100%;" onclick="window.subscribe('${key}')" ${isCurrent ? 'disabled' : ''}>
                    ${isCurrent ? 'Plan actuel' : 'Choisir ce plan'}
                </button>
            </div>
        `;
    }).join('') + '</div>';
}

    updateSubscriptionUI(sub) {
        // Mettre à jour l'UI quand l'abonnement change
        this.renderSubscriptionPage();
        menu.notify(); // Mettre à jour le menu (prix visibles ou non)
    }

    // Modal
    showModal(title, content) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-content').innerHTML = content;
        document.getElementById('modal').classList.add('active');
    }

    closeModal() {
        document.getElementById('modal').classList.remove('active');
    }

    toggleCart() {
        document.getElementById('cart').classList.toggle('open');
    }
}

export const ui = new UIManager();