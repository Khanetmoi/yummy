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

// Initialisation Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc,
    getDoc,
    serverTimestamp // Import serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Activer la persistance locale
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Persistence activée");
    })
    .catch((error) => {
        console.error("Erreur de persistance:", error);
    });

// ==================== CHECK IF USER IS ALREADY LOGGED IN ====================
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("✅ User is already logged in:", user.email);
        
        try {
            // Check if user has subscription
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                
                // Check local storage too
                const hasLocalSubscription = localStorage.getItem('hasSubscription') === 'true';
                const hasFirestoreSubscription = userData.hasSubscription || userData.subscription;
                
                if (hasLocalSubscription || hasFirestoreSubscription) {
                    // User has subscription, go to main page
                    console.log("📱 User has subscription, redirecting to main page");
                    
                    // Save user info to localStorage for main page
                    localStorage.setItem('userEmail', user.email);
                    localStorage.setItem('userId', user.uid);
                    if (userData.name) {
                        localStorage.setItem('userName', userData.name);
                    }
                    if (userData.phone) {
                        localStorage.setItem('userPhone', userData.phone);
                    }
                    if (userData.address) {
                        localStorage.setItem('userAddress', userData.address);
                    }
                    
                    window.location.href = 'index.html';
                } else {
                    // User is logged in but has no subscription, go to subscription page
                    console.log("📝 User has no subscription, redirecting to subscription page");
                    window.location.href = 'subscription.html';
                }
            } else {
                // User doc doesn't exist, go to subscription page
                console.log("📝 New user, redirecting to subscription page");
                window.location.href = 'subscription.html';
            }
        } catch (error) {
            console.error("❌ Error checking user data:", error);
            // If error, check local storage
            if (localStorage.getItem('hasSubscription') === 'true') {
                window.location.href = 'index.html';
            } else {
                window.location.href = 'subscription.html';
            }
        }
    } else {
        console.log("👤 No user logged in, showing auth page");
        // User is not logged in, show the auth page normally
    }
});

// Gestion des onglets
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const loginTab = document.querySelector('[data-tab="login"]');
    const signupTab = document.querySelector('[data-tab="signup"]');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.querySelector('.switch-to-signup');
    const switchToLogin = document.querySelector('.switch-to-login');
    const loginFormElement = document.getElementById('loginForm');
    const signupFormElement = document.getElementById('signupForm');
    const authMessage = document.getElementById('auth-message');

    // Gestion des onglets
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        hideMessage();
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        hideMessage();
    });

    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        signupTab.click();
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        loginTab.click();
    });

    // Connexion
    loginFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
        submitButton.disabled = true;
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Sauvegarder localement
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userId', user.uid);
            
            showMessage('Connexion réussie! Redirection...', 'success');
            
            // Vérifier si l'utilisateur a déjà un abonnement
            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                let redirectTo = 'subscription.html'; // Default to subscription page
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    
                    // Check both Firestore and local storage for subscription
                    const hasFirestoreSubscription = userData.hasSubscription || userData.subscription;
                    const hasLocalSubscription = localStorage.getItem('hasSubscription') === 'true';
                    
                    if (hasFirestoreSubscription || hasLocalSubscription) {
                        // User already has subscription, go to main page
                        redirectTo = 'index.html';
                        console.log("✅ User has subscription, redirecting to main page");
                        
                        // Save user info to localStorage
                        localStorage.setItem('userName', userData.name || email.split('@')[0]);
                        if (userData.phone) localStorage.setItem('userPhone', userData.phone);
                        if (userData.address) localStorage.setItem('userAddress', userData.address);
                    } else {
                        console.log("📝 User has no subscription, redirecting to subscription page");
                        
                        // Save basic user info for subscription page
                        localStorage.setItem('userName', userData.name || email.split('@')[0]);
                    }
                } else {
                    console.log("📝 New user, creating document and redirecting to subscription");
                    // Create user document with server timestamp
                    await setDoc(doc(db, "users", user.uid), {
                        name: email.split('@')[0],
                        email: email,
                        createdAt: serverTimestamp(), // Use serverTimestamp instead of new Date()
                        subscription: null,
                        hasSubscription: false
                    });
                    
                    // Save basic info to localStorage
                    localStorage.setItem('userName', email.split('@')[0]);
                }
                
                // Redirection après 1.5 secondes
                setTimeout(() => {
                    window.location.href = redirectTo;
                }, 1500);
                
            } catch (error) {
                console.error("❌ Error checking user data:", error);
                // Default to subscription page if error
                localStorage.setItem('userName', email.split('@')[0]);
                setTimeout(() => {
                    window.location.href = 'subscription.html';
                }, 1500);
            }
            
        } catch (error) {
            let errorMessage = 'Erreur de connexion';
            switch(error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Email invalide';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Ce compte a été désactivé';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Aucun compte trouvé avec cet email';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Mot de passe incorrect';
                    break;
                default:
                    errorMessage = error.message;
            }
            showMessage(errorMessage, 'error');
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });

    // Inscription - CORRIGÉ
    signupFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription...';
        submitButton.disabled = true;
        
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const phone = document.getElementById('signup-phone').value.trim();
        const address = document.getElementById('signup-address').value.trim();
        
        // Validation
        if (!name || !email || !password) {
            showMessage('Veuillez remplir tous les champs obligatoires', 'error');
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            return;
        }
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // CORRECTION ICI: Utiliser serverTimestamp au lieu de new Date()
            // Enregistrer les informations supplémentaires dans Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                phone: phone || null,
                address: address || null,
                createdAt: serverTimestamp(), // CORRECTION: Utiliser serverTimestamp
                subscription: null,
                hasSubscription: false,
                lastLogin: serverTimestamp()
            });
            
            // Sauvegarder localement
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userId', user.uid);
            localStorage.setItem('userName', name);
            if (phone) localStorage.setItem('userPhone', phone);
            if (address) localStorage.setItem('userAddress', address);
            
            showMessage('Compte créé avec succès! Redirection...', 'success');
            
            // Nouveaux utilisateurs vont toujours à la page d'abonnement
            setTimeout(() => {
                window.location.href = 'subscription.html';
            }, 1500);
            
        } catch (error) {
            let errorMessage = 'Erreur lors de l\'inscription';
            switch(error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Un compte existe déjà avec cet email';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Email invalide';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'L\'inscription par email/mot de passe n\'est pas activée';
                    break;
                default:
                    errorMessage = error.message;
                    console.error('Firebase error details:', error);
            }
            showMessage(errorMessage, 'error');
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });

    // Fonctions d'affichage des messages
    function showMessage(message, type) {
        authMessage.textContent = message;
        authMessage.className = 'auth-message ' + type;
    }
    
    function hideMessage() {
        authMessage.className = 'auth-message';
    }
});