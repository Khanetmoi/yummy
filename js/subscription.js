import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    updateDoc,
    collection,
    addDoc,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCceMsLRbfSyi-akEecSmcnpqYmlg5Nak4",
    authDomain: "yummy-8bceb.firebaseapp.com",
    projectId: "yummy-8bceb",
    storageBucket: "yummy-8bceb.firebasestorage.app",
    messagingSenderId: "970955071017",
    appId: "1:970955071017:web:12184754ab204a8b36c638",
    measurementId: "G-V1XEV4Q36B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const userInfoElement = document.getElementById('user-info');
    const subscribeButtons = document.querySelectorAll('.btn-subscribe');
    const logoutButton = document.getElementById('logout-btn');
    const loadingOverlay = document.getElementById('subscription-loading');
    const loadingMessage = document.getElementById('loading-message');
    
    let currentUser = null;
    let userData = null;
    let userHasSubscription = false;

    // ==================== UTILITY FUNCTIONS ====================
    
    // Show toast notification
    function showToast(message, type = 'success', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'check-circle' :
                     type === 'error' ? 'exclamation-circle' :
                     type === 'warning' ? 'exclamation-triangle' : 'info-circle';
        
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Auto-remove after duration
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    // Show loading overlay
    function showLoading(message = 'Traitement de votre abonnement...') {
        loadingMessage.textContent = message;
        loadingOverlay.style.display = 'flex';
    }
    
    // Hide loading overlay
    function hideLoading() {
        loadingOverlay.style.display = 'none';
    }
    
    // Disable all subscription buttons
    function disableSubscriptionButtons() {
        subscribeButtons.forEach(button => {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-check-circle"></i> Abonnement actif';
            button.classList.add('disabled');
        });
    }
    
    // Update UI for existing subscription
    function updateUIForExistingSubscription(subscription) {
        userHasSubscription = true;
        
        // Disable all subscription buttons
        disableSubscriptionButtons();
        
        // Add "Go to Menu" button
        const actionButtons = document.querySelector('.action-buttons');
        if (actionButtons && !actionButtons.querySelector('.btn-success')) {
            const goToMenuBtn = document.createElement('a');
            goToMenuBtn.href = 'index.html';
            goToMenuBtn.className = 'btn btn-success';
            goToMenuBtn.innerHTML = '<i class="fas fa-utensils"></i> Aller au menu';
            goToMenuBtn.style.marginLeft = '10px';
            actionButtons.prepend(goToMenuBtn);
        }
    }
    
    // ==================== AUTH STATE MANAGEMENT ====================
    
    // Check authentication state
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            console.log("✅ User authenticated:", user.email);
            
            try {
                // Get user data from Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                
                if (userDoc.exists()) {
                    userData = userDoc.data();
                    
                    // Display user info
                    const displayName = userData.name || user.displayName || user.email.split('@')[0];
                    userInfoElement.innerHTML = `
                        <div class="user-details">
                            <strong>${displayName}</strong> | ${user.email}
                            ${userData.subscription ? 
                                `<br><small class="subscription-badge">
                                    <i class="fas fa-crown"></i> Abonnement: ${userData.subscription.planName || userData.subscription.plan}
                                </small>` : 
                                ''}
                        </div>
                    `;
                    
                    // Check for existing subscription
                    if (userData.subscription || userData.hasSubscription) {
                        updateUIForExistingSubscription(userData.subscription || userData);
                        userHasSubscription = true;
                    }
                    
                } else {
                    // Create user document if it doesn't exist
                    console.log("📝 Creating new user document...");
                    const userName = localStorage.getItem('userName') || 
                                    user.displayName || 
                                    user.email.split('@')[0];
                    
                    await setDoc(doc(db, "users", user.uid), {
                        name: userName,
                        email: user.email,
                        createdAt: serverTimestamp(),
                        hasSubscription: false,
                        subscription: null,
                        lastLogin: serverTimestamp()
                    });
                    
                    // Reload user data
                    const newUserDoc = await getDoc(doc(db, "users", user.uid));
                    if (newUserDoc.exists()) {
                        userData = newUserDoc.data();
                        userInfoElement.innerHTML = `
                            <div class="user-details">
                                <strong>${userData.name}</strong> | ${user.email}
                            </div>
                        `;
                    }
                }
                
            } catch (error) {
                console.error("❌ Firestore error:", error);
                
                // Fallback to local data
                const localName = localStorage.getItem('userName');
                const localEmail = localStorage.getItem('userEmail') || user.email;
                
                userInfoElement.innerHTML = `
                    <div class="user-details">
                        <strong>${localName || 'Utilisateur'}</strong> | ${localEmail}
                    </div>
                `;
            }
            
        } else {
            // Redirect to auth page if not authenticated
            console.log("❌ No user, redirecting to auth...");
            window.location.href = 'auth.html';
        }
    });
    
    // ==================== SUBSCRIPTION HANDLING ====================
    
    // Handle subscription button clicks
    subscribeButtons.forEach(button => {
        button.addEventListener('click', async function() {
            // Check if user already has subscription
            if (userHasSubscription) {
                showToast('Vous avez déjà un abonnement actif !', 'warning');
                return;
            }
            
            // Get subscription data
            const plan = this.getAttribute('data-plan');
            const price = this.getAttribute('data-price');
            const planName = this.getAttribute('data-plan-name');
            
            // Show confirmation dialog
            const confirmed = confirm(
                `CONFIRMER L'ABONNEMENT\n\n` +
                `Plan: ${planName}\n` +
                `Prix: ${price}€ / mois\n` +
                `Engagement: 1 mois minimum\n\n` +
                `Voulez-vous continuer ?`
            );
            
            if (!confirmed) return;
            
            // Disable all buttons during processing
            showLoading();
            subscribeButtons.forEach(btn => {
                btn.disabled = true;
                const originalText = btn.innerHTML;
                btn.setAttribute('data-original', originalText);
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
            });
            
            try {
                // Check authentication
                if (!currentUser) {
                    throw new Error("Vous devez être connecté pour souscrire à un abonnement");
                }
                
                // Prepare subscription data
                const subscriptionData = {
                    plan: plan,
                    planName: planName,
                    price: parseFloat(price),
                    subscribedAt: serverTimestamp(),
                    status: 'active',
                    billingPeriod: 'monthly',
                    nextRenewal: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                };
                
                console.log("📝 Processing subscription:", subscriptionData);
                
                // ==================== SAUVEGARDE DANS FIRESTORE ====================
                
                // 1. Créer un document dans la collection 'subscriptions'
                const subscriptionRef = await addDoc(collection(db, "subscriptions"), {
                    userId: currentUser.uid,
                    userEmail: currentUser.email,
                    userName: userData?.name || currentUser.displayName || currentUser.email.split('@')[0],
                    ...subscriptionData,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                
                console.log("✅ Subscription document created with ID:", subscriptionRef.id);
                
                // 2. Mettre à jour le document utilisateur
                await updateDoc(doc(db, "users", currentUser.uid), {
                    hasSubscription: true,
                    subscription: {
                        ...subscriptionData,
                        subscriptionId: subscriptionRef.id
                    },
                    subscriptionPlan: plan,
                    subscriptionStatus: 'active',
                    subscriptionStarted: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                
                console.log("✅ User document updated with subscription info");
                
                // 3. Sauvegarder localement comme backup
                localStorage.setItem('userSubscription', JSON.stringify({
                    ...subscriptionData,
                    subscriptionId: subscriptionRef.id
                }));
                localStorage.setItem('hasSubscription', 'true');
                localStorage.setItem('userPlan', plan);
                localStorage.setItem('userPlanName', planName);
                
                console.log("✅ Subscription saved locally");
                
                // Show success message
                showToast(`🎉 Félicitations ! Abonnement ${planName} activé !`, 'success');
                
                // Update UI
                updateUIForExistingSubscription(subscriptionData);
                userHasSubscription = true;
                
                // Update user info display
                userInfoElement.querySelector('.subscription-badge')?.remove();
                userInfoElement.innerHTML += `
                    <br><small class="subscription-badge">
                        <i class="fas fa-crown"></i> Abonnement: ${planName}
                    </small>
                `;
                
                // Show success message and redirect
                setTimeout(() => {
                    showToast('Redirection vers le menu...', 'info', 2000);
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                }, 1500);
                
            } catch (error) {
                console.error('❌ Subscription error:', error);
                
                // Réactiver les boutons
                subscribeButtons.forEach(btn => {
                    btn.disabled = false;
                    const originalText = btn.getAttribute('data-original');
                    if (originalText) {
                        btn.innerHTML = originalText;
                    }
                });
                
                // Afficher le message d'erreur
                if (error.code === 'permission-denied' || error.message.includes('permissions')) {
                    showToast('❌ Erreur de permissions. Veuillez vérifier les règles Firestore.', 'error');
                } else if (error.code === 'unavailable' || error.message.includes('network')) {
                    showToast('📱 Problème de connexion. Tentative de sauvegarde locale...', 'warning');
                    
                    // Try offline save
                    try {
                        const plan = this.getAttribute('data-plan');
                        const price = this.getAttribute('data-price');
                        const planName = this.getAttribute('data-plan-name');
                        
                        const offlineData = {
                            plan: plan,
                            planName: planName,
                            price: parseFloat(price),
                            subscribedAt: new Date().toISOString(),
                            status: 'pending',
                            offline: true,
                            needsSync: true
                        };
                        
                        localStorage.setItem('userSubscription', JSON.stringify(offlineData));
                        localStorage.setItem('hasSubscription', 'true');
                        localStorage.setItem('userPlan', plan);
                        localStorage.setItem('userPlanName', planName);
                        
                        showToast('📱 Abonnement sauvegardé localement', 'warning');
                        disableSubscriptionButtons();
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 2000);
                    } catch (backupError) {
                        showToast('❌ Erreur même en mode hors ligne', 'error');
                    }
                } else {
                    showToast(`❌ Erreur: ${error.message}`, 'error');
                }
            } finally {
                hideLoading();
            }
        });
    });
    
    // ==================== LOGOUT HANDLING ====================
    
    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', async function() {
            const confirmLogout = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
            if (!confirmLogout) return;
            
            try {
                showLoading('Déconnexion en cours...');
                await signOut(auth);
                
                // Clear only auth-related local storage
                localStorage.removeItem('userName');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userToken');
                
                showToast('Déconnexion réussie', 'info');
                setTimeout(() => {
                    window.location.href = 'auth.html';
                }, 1500);
                
            } catch (error) {
                console.error('❌ Logout error:', error);
                showToast('Erreur lors de la déconnexion', 'error');
                hideLoading();
            }
        });
    }
});