// main.js - Version Premium Complète avec Authentification & Système de Commande

// ==================== FIREBASE INITIALIZATION ====================
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
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    addDoc
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

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ==================== DONNÉES DES PLATS ====================
const menuData = [
    {
        id: 1,
        title: "Salade de homard breton",
        category: "entrees",
        description: "Homard frais de Bretagne, avocat crémeux, mangue caramélisée et vinaigrette à l'orange sanguine",
        price: "45",
        calories: "320",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        plans: ["bronze", "silver", "gold"],
        mealTypes: ["entrees"],
        popular: true,
        prepTime: "15 min",
        protein: "18g",
        carbs: "22g",
        fat: "15g",
        fiber: "8g",
        origin: "Homard de Bretagne, mangue d'Afrique du Sud",
        story: "Inspirée par les côtes bretonnes, notre Chef Étoilé a créé cette salade pour célébrer l'alliance entre le homard frais et les fruits tropicaux. Une harmonie parfaite entre terre et mer.",
        ingredients: [
            { name: "Homard breton entier", type: "Fruit de mer", essential: true },
            { name: "Avocat Hass", type: "Fruit", essential: false },
            { name: "Mangue Kent", type: "Fruit", essential: false },
            { name: "Orange sanguine", type: "Fruit", essential: false },
            { name: "Mâche et roquette", type: "Légume", essential: true },
            { name: "Vinaigrette au citron yuzu", type: "Sauce", essential: true },
            { name: "Fleurs comestibles", type: "Décoration", essential: false }
        ]
    },
    {
        id: 2,
        title: "Œufs bénédictine au jambon ibérique",
        category: "plats",
        description: "Œufs bio pochés à la perfection, jambon ibérique Bellota 36 mois, sauce hollandaise émulsionnée et muffin anglais maison",
        price: "32",
        calories: "420",
        image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        plans: ["silver", "gold"],
        mealTypes: ["petit-dejeuner", "brunch"],
        popular: true,
        prepTime: "20 min",
        protein: "22g",
        carbs: "28g",
        fat: "25g",
        fiber: "4g",
        origin: "Œufs bio du Berry, jambon ibérique de Salamanque",
        story: "Notre version réinventée du classique brunch, avec des œufs bio de fermes locales et du jambon ibérique d'exception. La sauce hollandaise est préparée minute par minute pour une onctuosité parfaite.",
        ingredients: [
            { name: "Œufs bio de plein air", type: "Œufs", essential: true },
            { name: "Jambon ibérique Bellota", type: "Charcuterie", essential: false },
            { name: "Sauce hollandaise au beurre clarifié", type: "Sauce", essential: true },
            { name: "Muffin anglais au levain", type: "Pain", essential: true },
            { name: "Épinards frais bio", type: "Légume", essential: false },
            { name: "Truffe noire d'été", type: "Champignon", essential: false }
        ]
    },
    {
        id: 3,
        title: "Foie gras de canard poêlé aux figues",
        category: "entrees",
        description: "Foie gras de canard du Sud-Ouest poêlé à la perfection, chutney de figues noires de Provence et pain brioché toasté au beurre demi-sel",
        price: "52",
        calories: "480",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        plans: ["silver", "gold"],
        mealTypes: ["entrees"],
        prepTime: "25 min",
        protein: "15g",
        carbs: "18g",
        fat: "38g",
        fiber: "3g",
        origin: "Foie gras du Périgord, figues de Provence",
        story: "Un hommage à la tradition gastronomique française, où le foie gras d'exception rencontre la douceur des figues de Provence. Chaque bouchée est un voyage dans le Sud-Ouest.",
        ingredients: [
            { name: "Foie gras de canard entier", type: "Volaille", essential: true },
            { name: "Figues noires de Provence", type: "Fruit", essential: false },
            { name: "Pain brioché au beurre", type: "Pain", essential: true },
            { name: "Sucre roux de canne", type: "Épicerie", essential: false },
            { name: "Porto vintage", type: "Vin", essential: false },
            { name: "Fleur de sel de Guérande", type: "Sel", essential: true }
        ]
    },
    {
        id: 4,
        title: "Filet de bœuf Rossini aux truffes",
        category: "plats",
        description: "Filet de bœuf Charolais label rouge, foie gras frais, sauce au porto réduit 48h, pommes soufflées et copeaux de truffe noire du Périgord",
        price: "89",
        calories: "620",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        plans: ["bronze", "silver", "gold"],
        mealTypes: ["plats"],
        popular: true,
        prepTime: "35 min",
        protein: "45g",
        carbs: "32g",
        fat: "38g",
        fiber: "6g",
        origin: "Bœuf Charolais AOP, foie gras du Périgord",
        story: "Création du célèbre compositeur Gioachino Rossini, cette recette allie la noblesse du bœuf Charolais à la finesse du foie gras. Notre Chef la réinterprète avec une touche de truffe noire d'exception.",
        ingredients: [
            { name: "Filet de bœuf Charolais AOP", type: "Viande", essential: true },
            { name: "Foie gras frais de canard", type: "Volaille", essential: true },
            { name: "Porto Tawny 20 ans", type: "Vin", essential: false },
            { name: "Pommes de terre Ratte", type: "Légume", essential: true },
            { name: "Truffe noire du Périgord", type: "Champignon", essential: false },
            { name: "Beurre demi-sel de baratte", type: "Produit laitier", essential: true },
            { name: "Échalotes confites", type: "Légume", essential: false }
        ]
    },
    {
        id: 5,
        title: "Soufflé au chocolat Valrhona cœur coulant",
        category: "desserts",
        description: "Soufflé aérien au chocolat Valrhona Guanaja 70%, cœur fondant au chocolat blanc, glice vanille de Madagascar et tuile aux amandes",
        price: "32",
        calories: "420",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        plans: ["bronze", "silver", "gold"],
        mealTypes: ["desserts"],
        popular: true,
        prepTime: "30 min",
        protein: "8g",
        carbs: "48g",
        fat: "22g",
        fiber: "4g",
        origin: "Chocolat Valrhona, vanille de Madagascar",
        story: "Notre soufflé signature, préparé à la minute pour une légèreté parfaite. Le cœur coulant au chocolat blanc offre une surprise délicieuse à chaque cuillerée.",
        ingredients: [
            { name: "Chocolat Valrhona Guanaja 70%", type: "Chocolat", essential: true },
            { name: "Œufs frais de plein air", type: "Œufs", essential: true },
            { name: "Sucre de canne blond", type: "Épicerie", essential: true },
            { name: "Glace vanille gousse de Madagascar", type: "Glace", essential: false },
            { name: "Beurre AOP Charentes-Poitou", type: "Produit laitier", essential: true },
            { name: "Chocolat blanc Ivoire", type: "Chocolat", essential: false }
        ]
    },
    {
        id: 6,
        title: "Tarte fine aux pommes Tentation",
        category: "desserts",
        description: "Tarte fine aux pommes Tentation caramélisées, feuilletage au beurre, caramel au beurre salé et sorbet Calvados vieilli en fût de chêne",
        price: "28",
        calories: "380",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        plans: ["silver", "gold"],
        mealTypes: ["desserts"],
        prepTime: "40 min",
        protein: "5g",
        carbs: "55g",
        fat: "18g",
        fiber: "6g",
        origin: "Pommes Tentation de Normandie, Calvados AOC",
        story: "Une tarte fine et croustillante qui met en valeur la pomme Tentation, variété rare et délicate de Normandie. Le sorbet Calvados apporte une touche d'élégance et de terroir.",
        ingredients: [
            { name: "Pommes Tentation de Normandie", type: "Fruit", essential: true },
            { name: "Pâte feuilletée au beurre AOP", type: "Pâte", essential: true },
            { name: "Caramel au beurre salé de Guérande", type: "Caramel", essential: false },
            { name: "Sorbet Calvados VSOP", type: "Sorbet", essential: false },
            { name: "Amandes effilées grillées", type: "Fruit à coque", essential: false },
            { name: "Cannelle de Ceylan", type: "Épice", essential: false }
        ]
    },
    {
        id: 7,
        title: "Château Margaux 2015 Grand Cru",
        category: "boissons",
        description: "Grand cru classé 1er cru de Margaux, assemblage Cabernet Sauvignon, Merlot et Petit Verdot. Bouquet complexe aux notes de fruits noirs, de tabac et d'épices douces",
        price: "450",
        calories: "125",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        plans: ["silver", "gold"],
        mealTypes: ["boissons"],
        prepTime: "Service à 18°C",
        protein: "0g",
        carbs: "3g",
        fat: "0g",
        fiber: "0g",
        origin: "Château Margaux, Bordeaux, France",
        story: "Un des vins les plus prestigieux au monde, issu du célèbre terroir de Margaux. Le millésime 2015 est exceptionnel, offrant une structure parfaite et un potentiel de garde remarquable.",
        ingredients: [
            { name: "Raisin Cabernet Sauvignon", type: "Raisin", essential: true },
            { name: "Raisin Merlot", type: "Raisin", essential: true },
            { name: "Raisin Petit Verdot", type: "Raisin", essential: true },
            { name: "Levures indigènes", type: "Levure", essential: true }
        ]
    },
    {
        id: 8,
        title: "Cocktail Signature 'Golden Truffle'",
        category: "boissons",
        description: "Vodka Beluga Gold, infusion de truffe noire, litchi frais, jus de citron vert pressé, sirop de rose de Damas et blanc d'œuf battu en mousse",
        price: "24",
        calories: "180",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        plans: ["bronze", "silver", "gold"],
        mealTypes: ["boissons"],
        popular: true,
        prepTime: "10 min",
        protein: "1g",
        carbs: "12g",
        fat: "0g",
        fiber: "0g",
        origin: "Vodka russe, truffe du Périgord, roses de Damas",
        story: "Création exclusive de notre barman étoilé, ce cocktail allie la puissance de la vodka Beluga à la rareté de la truffe noire. Un équilibre parfait entre force et délicatesse.",
        ingredients: [
            { name: "Vodka Beluga Gold Line", type: "Alcool", essential: false },
            { name: "Litchi frais dénoyauté", type: "Fruit", essential: true },
            { name: "Jus de citron vert pressé", type: "Jus", essential: true },
            { name: "Sirop de rose de Damas", type: "Sirop", essential: false },
            { name: "Infusion de truffe noire", type: "Infusion", essential: false },
            { name: "Feuille d'or alimentaire 24 carats", type: "Décoration", essential: false }
        ]
    },
    {
        id: 9,
        title: "Petit déjeuner continental signature",
        category: "plats",
        description: "Assortiment de viennoiseries fraîches du jour, jus d'orange pressé à froid, café Arabica de spécialité torréfié maison et plateau de fromages affinés",
        price: "35",
        calories: "450",
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        plans: ["silver", "gold"],
        mealTypes: ["petit-dejeuner"],
        prepTime: "Service immédiat",
        protein: "15g",
        carbs: "55g",
        fat: "22g",
        fiber: "6g",
        origin: "Viennoiseries maison, café d'Éthiopie Yirgacheffe",
        story: "Notre petit-déjeuner continental réinventé, avec des viennoiseries préparées à 4h du matin par notre boulanger maison et un café de spécialité torréfié sur place.",
        ingredients: [
            { name: "Croissants au beurre AOP", type: "Viennoiserie", essential: true },
            { name: "Pains au chocolat Valrhona", type: "Viennoiserie", essential: false },
            { name: "Jus d'orange Valencia pressé", type: "Jus", essential: true },
            { name: "Café Arabica Yirgacheffe", type: "Café", essential: true },
            { name: "Fromages affinés sélection", type: "Fromage", essential: false },
            { name: "Confiture maison aux fruits rouges", type: "Confiture", essential: false }
        ]
    },
    {
        id: 10,
        title: "Brunch dominical gastronomique",
        category: "plats",
        description: "Œufs brouffés au saumon fumé d'Écosse, pancakes moelleux au sirop d'érable, bacon croustillant Black Angus et corbeille de fruits exotiques de saison",
        price: "48",
        calories: "520",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        plans: ["gold"],
        mealTypes: ["brunch"],
        popular: true,
        prepTime: "25 min",
        protein: "30g",
        carbs: "45g",
        fat: "28g",
        fiber: "8g",
        origin: "Saumon d'Écosse, bacon Black Angus, sirop d'érable du Québec",
        story: "Le brunch dominical par excellence, alliant salé et sucré pour une expérience complète. Parfait pour les matinées en famille ou entre amis.",
        ingredients: [
            { name: "Œufs bio de plein air", type: "Œufs", essential: true },
            { name: "Saumon fumé d'Écosse", type: "Poisson", essential: false },
            { name: "Pancakes au babeurre", type: "Pâtisserie", essential: true },
            { name: "Bacon Black Angus", type: "Charcuterie", essential: false },
            { name: "Fruits exotiques de saison", type: "Fruit", essential: true },
            { name: "Sirop d'érable Grade A", type: "Sirop", essential: false },
            { name: "Crème fraîche d'Isigny", type: "Produit laitier", essential: false }
        ]
    }
];

// ==================== ÉTAT DE L'APPLICATION ====================
let currentUser = {
    name: "Invité",
    email: "",
    subscription: {
        plan: null,
        planName: null
    },
    isAuthenticated: false,
    uid: null
};

let currentCategory = "entrees";
let selectedDish = null;
let weeklySelections = {};
let isLoading = false;

// ==================== FONCTIONS UTILITAIRES ====================

// Afficher une notification
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                       type === 'warning' ? 'exclamation-triangle' : 
                       type === 'error' ? 'exclamation-circle' : 
                       'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Vérifier l'abonnement de l'utilisateur
async function checkUserSubscription(userId) {
    try {
        console.log("🔍 Vérification de l'abonnement pour l'utilisateur:", userId);
        
        // 1. Vérifier d'abord dans le document utilisateur
        const userDoc = await getDoc(doc(db, "users", userId));
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Vérifier si l'utilisateur a un abonnement dans Firestore
            if (userData.hasSubscription || userData.subscription) {
                console.log("✅ Abonnement trouvé dans le document utilisateur");
                return {
                    hasSubscription: true,
                    plan: userData.subscription?.plan || userData.subscriptionPlan,
                    planName: userData.subscription?.planName || userData.subscription?.plan || 'Or',
                    subscriptionData: userData.subscription || userData
                };
            }
        }
        
        // 2. Vérifier dans la collection des subscriptions
        const subscriptionsRef = collection(db, "subscriptions");
        const q = query(subscriptionsRef, 
            where("userId", "==", userId),
            where("status", "==", "active")
        );
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const subscriptionDoc = querySnapshot.docs[0].data();
            console.log("✅ Abonnement actif trouvé dans la collection subscriptions");
            
            // Mettre à jour le document utilisateur avec ces informations
            try {
                await updateDoc(doc(db, "users", userId), {
                    hasSubscription: true,
                    subscription: subscriptionDoc,
                    subscriptionUpdated: new Date().toISOString()
                });
            } catch (updateError) {
                console.log("Note: Impossible de mettre à jour le document utilisateur, mais l'abonnement existe");
            }
            
            return {
                hasSubscription: true,
                plan: subscriptionDoc.plan,
                planName: subscriptionDoc.planName || subscriptionDoc.plan,
                subscriptionData: subscriptionDoc
            };
        }
        
        // 3. Vérifier le stockage local
        const localSubscription = localStorage.getItem('userSubscription');
        const hasLocalSubscription = localStorage.getItem('hasSubscription') === 'true';
        
        if (hasLocalSubscription && localSubscription) {
            try {
                const subscriptionData = JSON.parse(localSubscription);
                console.log("📱 Abonnement local trouvé");
                
                // Essayer de synchroniser avec Firestore
                if (subscriptionData.plan && subscriptionData.needsSync !== false) {
                    try {
                        // Créer un document dans la collection subscriptions
                        await addDoc(collection(db, "subscriptions"), {
                            userId: userId,
                            ...subscriptionData,
                            syncedAt: new Date().toISOString(),
                            fromLocal: true,
                            status: 'active'
                        });
                        
                        // Mettre à jour le document utilisateur
                        await updateDoc(doc(db, "users", userId), {
                            hasSubscription: true,
                            subscription: subscriptionData,
                            localSynced: true,
                            updatedAt: new Date().toISOString()
                        });
                        
                        // Mettre à jour le localStorage
                        localStorage.setItem('userSubscription', JSON.stringify({
                            ...subscriptionData,
                            needsSync: false
                        }));
                        
                        console.log("✅ Abonnement local synchronisé avec Firestore");
                        
                    } catch (syncError) {
                        console.log("Impossible de synchroniser l'abonnement local:", syncError);
                    }
                }
                
                return {
                    hasSubscription: true,
                    plan: subscriptionData.plan,
                    planName: subscriptionData.planName || subscriptionData.plan,
                    subscriptionData: subscriptionData,
                    isLocal: true
                };
            } catch (parseError) {
                console.error("Erreur lors de l'analyse de l'abonnement local:", parseError);
            }
        }
        
        // Aucun abonnement trouvé
        console.log("❌ Aucun abonnement trouvé");
        return {
            hasSubscription: false,
            plan: null,
            planName: null,
            subscriptionData: null
        };
        
    } catch (error) {
        console.error("❌ Erreur lors de la vérification de l'abonnement:", error);
        
        // Fallback au localStorage en cas d'erreur
        const hasLocalSubscription = localStorage.getItem('hasSubscription') === 'true';
        const localSubscription = localStorage.getItem('userSubscription');
        
        if (hasLocalSubscription && localSubscription) {
            try {
                const subscriptionData = JSON.parse(localSubscription);
                return {
                    hasSubscription: true,
                    plan: subscriptionData.plan,
                    planName: subscriptionData.planName || subscriptionData.plan,
                    subscriptionData: subscriptionData,
                    isLocal: true,
                    offline: true
                };
            } catch (parseError) {
                // Continue to return no subscription
            }
        }
        
        return {
            hasSubscription: false,
            plan: null,
            planName: null,
            subscriptionData: null,
            error: error.message
        };
    }
}

// Afficher un écran de chargement
function showLoadingOverlay(message = "Chargement...") {
    // Supprimer les overlays existants
    document.querySelectorAll('.auth-overlay').forEach(el => el.remove());
    
    const overlay = document.createElement('div');
    overlay.className = 'auth-overlay';
    overlay.innerHTML = `
        <div class="spinner"></div>
        <p class="loading-message">${message}</p>
    `;
    
    document.body.appendChild(overlay);
}

// Cacher l'écran de chargement
function hideLoadingOverlay() {
    document.querySelectorAll('.auth-overlay').forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 300);
    });
}

// ==================== VÉRIFICATION D'AUTHENTIFICATION ====================

// Fonction pour initialiser l'application
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Initialisation de l'application Yummy Premium");
    
    // Vérifier l'authentification avant de charger quoi que ce soit
    checkAuthentication();
    
    // Initialiser le bouton flottant
    initializeFloatingButton();
});

// Vérifier l'authentification de l'utilisateur
async function checkAuthentication() {
    console.log("🔐 Vérification de l'authentification...");
    
    // Afficher un écran de chargement
    showLoadingOverlay("Vérification de votre session...");
    
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("✅ Utilisateur authentifié:", user.email);
            
            // Vérifier l'abonnement
            const subscriptionCheck = await checkUserSubscription(user.uid);
            
            if (!subscriptionCheck.hasSubscription) {
                // Pas d'abonnement, rediriger vers la page d'abonnement
                console.log("❌ Aucun abonnement trouvé, redirection...");
                hideLoadingOverlay();
                showNotification("Veuillez souscrire à un abonnement pour accéder au menu.", "warning");
                
                setTimeout(() => {
                    window.location.href = 'subscription.html';
                }, 2000);
                return;
            }
            
            // Utilisateur a un abonnement, initialiser l'application
            await initializeApplication(user, subscriptionCheck);
            
        } else {
            // Pas d'utilisateur connecté, rediriger vers la page d'authentification
            console.log("❌ Aucun utilisateur connecté, redirection...");
            hideLoadingOverlay();
            showNotification("Veuillez vous connecter pour accéder au menu.", "warning");
            
            setTimeout(() => {
                window.location.href = 'auth.html';
            }, 2000);
        }
    });
}

// Initialiser le bouton flottant
function initializeFloatingButton() {
    const viewSelectionBtn = document.getElementById('view-selection-btn');
    if (viewSelectionBtn) {
        viewSelectionBtn.addEventListener('click', toggleWeeklyOverview);
    }
}

// ==================== INITIALISATION DE L'APPLICATION ====================

// Initialiser l'application après vérification d'authentification
async function initializeApplication(user, subscriptionCheck) {
    console.log("🎯 Initialisation de l'application pour l'utilisateur:", user.email);
    
    isLoading = true;
    
    try {
        // Mettre à jour l'état de l'utilisateur
        currentUser = {
            name: localStorage.getItem('userName') || user.displayName || user.email.split('@')[0],
            email: user.email,
            subscription: {
                plan: subscriptionCheck.plan,
                planName: subscriptionCheck.planName
            },
            isAuthenticated: true,
            uid: user.uid
        };
        
        // Sauvegarder les informations d'abonnement dans localStorage
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userPlan', subscriptionCheck.plan);
        localStorage.setItem('userPlanName', subscriptionCheck.planName);
        localStorage.setItem('hasSubscription', 'true');
        
        if (subscriptionCheck.subscriptionData) {
            localStorage.setItem('userSubscription', JSON.stringify(subscriptionCheck.subscriptionData));
        }
        
        // Charger les infos utilisateur
        loadUserInfo();
        
        // Initialiser les catégories
        initializeCategories();
        
        // Charger les plats initiaux
        loadDishes();
        
        // Initialiser les sélecteurs de jour
        initializeDaySelector();
        
        // Initialiser les événements
        attachEventListeners();
        
        // Charger les sélections sauvegardées
        loadWeeklySelections();
        
        // Initialiser la navigation du modal
        initializeModalNavigation();
        
        // Mettre à jour le badge flottant
        updateFloatingBadge();
        
        // Cacher l'overlay de chargement
        setTimeout(() => {
            hideLoadingOverlay();
            showNotification(`Bienvenue ${currentUser.name} ! Profitez de notre menu premium.`, 'success');
        }, 500);
        
        console.log("✅ Application initialisée avec succès");
        console.log(`📋 Abonnement: ${currentUser.subscription.planName} (${currentUser.subscription.plan})`);
        
    } catch (error) {
        console.error("❌ Erreur lors de l'initialisation:", error);
        showNotification("Erreur lors du chargement de l'application", "error");
        hideLoadingOverlay();
    } finally {
        isLoading = false;
    }
}

// ==================== FONCTIONS DE GESTION UTILISATEUR ====================

// Charger les infos utilisateur depuis localStorage
function loadUserInfo() {
    // Récupérer les infos depuis localStorage
    const userName = localStorage.getItem('userName') || currentUser.name;
    const userEmail = localStorage.getItem('userEmail') || currentUser.email;
    const userPlan = localStorage.getItem('userPlan') || currentUser.subscription.plan;
    const userPlanName = localStorage.getItem('userPlanName') || currentUser.subscription.planName;
    
    // Mettre à jour l'état global
    currentUser.name = userName;
    currentUser.email = userEmail;
    currentUser.subscription.plan = userPlan;
    currentUser.subscription.planName = userPlanName;
    
    // Mettre à jour l'interface
    updateUserInfo();
    
    console.log(`👤 Utilisateur: ${currentUser.name}`);
    console.log(`📋 Abonnement: ${currentUser.subscription.planName}`);
}

// Mettre à jour les informations utilisateur dans l'interface
function updateUserInfo() {
    // Mettre à jour le header
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = `Bonjour, ${currentUser.name.split(' ')[0]}`;
    }
    
    // Mettre à jour le modal
    const modalUserName = document.getElementById('modal-user-name');
    const modalUserPlan = document.getElementById('modal-user-plan');
    
    if (modalUserName) {
        modalUserName.textContent = currentUser.name;
    }
    
    if (modalUserPlan) {
        const planColors = {
            'bronze': '#CD7F32',
            'silver': '#C0C0C0', 
            'gold': '#D4AF37'
        };
        modalUserPlan.textContent = `Abonnement ${currentUser.subscription.planName}`;
        modalUserPlan.style.color = planColors[currentUser.subscription.plan] || '#D4AF37';
    }
    
    // Mettre à jour le badge dans le header principal
    updateSubscriptionBadge();
    
    // ==================== AJOUTER: AFFICHER LE BOUTON DE DÉCONNEXION ====================
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.style.display = 'flex';
    }
    
    // Mettre à jour les informations utilisateur dans le header
    updateUserHeaderInfo();
}

function updateUserHeaderInfo() {
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
        userInfoElement.innerHTML = `
            <div class="user-header-info">
                <div class="user-greeting">
                    <strong>${currentUser.name}</strong>
                    <span class="user-email">${currentUser.email}</span>
                </div>
                <div class="user-plan-badge ${currentUser.subscription.plan}">
                    ${currentUser.subscription.planName}
                </div>
            </div>
        `;
    }
}

// Mettre à jour le badge d'abonnement dans le header
function updateSubscriptionBadge() {
    const planBadge = document.querySelector('.user-plan');
    if (planBadge) {
        planBadge.textContent = currentUser.subscription.planName.toUpperCase();
        
        // Ajouter une classe selon le plan
        planBadge.className = 'user-plan';
        planBadge.classList.add(currentUser.subscription.plan);
    }
}

// ==================== FONCTIONS DE GESTION DU MENU ====================

// Initialiser les catégories
function initializeCategories() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    // Mettre à jour les compteurs initiaux
    updateCategoryCounts();
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Retirer la classe active de toutes les catégories
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Ajouter la classe active à la catégorie cliquée
            this.classList.add('active');
            
            // Mettre à jour la catégorie courante
            currentCategory = this.dataset.category;
            
            // Recharger les plats
            loadDishes();
            
            // Animation douce
            animateCategoryChange();
        });
    });
    
    // Sélectionner la première catégorie par défaut
    if (categoryItems.length > 0) {
        categoryItems[0].classList.add('active');
        currentCategory = categoryItems[0].dataset.category;
    }
}

// Mettre à jour les compteurs de catégories
function updateCategoryCounts() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        const category = item.dataset.category;
        const count = menuData.filter(dish => 
            dish.mealTypes.includes(category) || dish.category === category
        ).length;
        
        const countElement = item.querySelector('.category-count');
        if (countElement) {
            countElement.textContent = count;
        }
    });
}

// Animation lors du changement de catégorie
function animateCategoryChange() {
    const dishList = document.getElementById('dish-list');
    if (dishList) {
        dishList.style.opacity = '0.5';
        dishList.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            dishList.style.opacity = '1';
            dishList.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Charger les plats de la catégorie active
function loadDishes() {
    const dishList = document.getElementById('dish-list');
    if (!dishList) return;
    
    // Afficher un indicateur de chargement
    dishList.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Préparation des plats...</p>
        </div>
    `;
    
    // Filtrer les plats par catégorie et abonnement
    setTimeout(() => {
        const filteredDishes = menuData.filter(dish => {
            // Filtrer par catégorie
            const matchesCategory = dish.mealTypes.includes(currentCategory) || dish.category === currentCategory;
            
            // Filtrer par abonnement
            const matchesSubscription = dish.plans.includes(currentUser.subscription.plan);
            
            return matchesCategory && matchesSubscription;
        });
        
        if (filteredDishes.length === 0) {
            dishList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <h3>Aucun plat disponible</h3>
                    <p>Aucun plat n'est disponible dans cette catégorie pour votre abonnement ${currentUser.subscription.planName}.</p>
                    ${currentUser.subscription.plan !== 'gold' ? 
                        '<a href="subscription.html" class="btn btn-primary">Améliorer mon abonnement</a>' : ''
                    }
                </div>
            `;
            return;
        }
        
        // Générer le HTML des plats
        dishList.innerHTML = filteredDishes.map(dish => `
            <div class="dish-item" data-id="${dish.id}">
                ${dish.popular ? '<div class="popular-badge">★ Chef Recommande</div>' : ''}
                <div class="dish-image-container">
                    <img src="${dish.image}" alt="${dish.title}" class="dish-image" loading="lazy">
                    <div class="image-overlay">
                        <span class="plan-badge ${dish.plans[0]}">${getPlanBadgeText(dish.plans)}</span>
                    </div>
                </div>
                <div class="dish-content">
                    <div class="dish-header">
                        <h3 class="dish-title">${dish.title}</h3>
                        <div class="dish-price">${dish.price}€</div>
                    </div>
                    <p class="dish-description">${dish.description}</p>
                    <div class="dish-tags">
                        ${generateDishTags(dish)}
                    </div>
                    <div class="dish-meta">
                        <span class="meta-item">
                            <i class="fas fa-clock"></i> ${dish.prepTime}
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-fire"></i> ${dish.calories} kcal
                        </span>
                    </div>
                </div>
                <div class="dish-actions">
                    <button class="btn-icon btn-favorite" data-id="${dish.id}" title="Ajouter aux favoris">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="btn-outline btn-details" data-id="${dish.id}">
                        <i class="fas fa-eye"></i> Détails
                    </button>
                    <button class="btn-primary btn-select" data-id="${dish.id}">
                        <i class="fas fa-plus"></i> Sélectionner
                    </button>
                </div>
            </div>
        `).join('');
        
        // Réattacher les événements aux boutons
        attachDishEventListeners();
        
        // Initialiser les favoris
        initializeFavorites();
        
    }, 500); // Petit délai pour l'effet de chargement
}

// Obtenir le texte du badge de plan
function getPlanBadgeText(plans) {
    if (plans.includes('gold') && !plans.includes('silver') && !plans.includes('bronze')) {
        return 'OR';
    } else if (plans.includes('silver') && !plans.includes('bronze')) {
        return 'ARGENT';
    } else if (plans.includes('bronze')) {
        return 'BRONZE';
    }
    return 'TOUS';
}

// Générer les tags d'un plat
function generateDishTags(dish) {
    const tags = [];
    
    // Détecter si le plat est végétarien
    const isVegetarian = dish.ingredients.every(ing => 
        !['viande', 'poisson', 'fruit de mer', 'chair', 'meat', 'fish', 'seafood', 'volaille', 'charcuterie', 'bacon'].some(word => 
            ing.type.toLowerCase().includes(word)
        )
    );
    
    // Tags basés sur les caractéristiques
    if (isVegetarian) tags.push({ text: 'VÉGÉTARIEN', class: 'vegetarian' });
    if (dish.popular) tags.push({ text: 'POPULAIRE', class: 'popular' });
    if (dish.prepTime && dish.prepTime.includes('min') && parseInt(dish.prepTime) < 20) {
        tags.push({ text: 'RAPIDE', class: 'fast' });
    }
    if (dish.category === 'boissons' && dish.title.toLowerCase().includes('cocktail')) {
        tags.push({ text: 'SIGNATURE', class: 'signature' });
    }
    
    return tags.map(tag => `<span class="dish-tag ${tag.class}">${tag.text}</span>`).join('');
}

// Attacher les événements aux plats
function attachDishEventListeners() {
    // Boutons de détails
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', function() {
            const dishId = this.dataset.id;
            const dish = menuData.find(d => d.id == dishId);
            if (dish) {
                openDishModal(dish);
            }
        });
    });
    
    // Boutons de sélection
    document.querySelectorAll('.btn-select').forEach(button => {
        button.addEventListener('click', function() {
            const dishId = this.dataset.id;
            const dish = menuData.find(d => d.id == dishId);
            if (dish) {
                selectDishForDay(dish);
            }
        });
    });
    
    // Boutons favoris
    document.querySelectorAll('.btn-favorite').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const dishId = this.dataset.id;
            const dish = menuData.find(d => d.id == dishId);
            if (dish) {
                toggleFavorite(dish, this);
            }
        });
    });
    
    // Clic sur la carte du plat
    document.querySelectorAll('.dish-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Ne pas ouvrir le modal si on clique sur un bouton
            if (!e.target.closest('button')) {
                const dishId = this.dataset.id;
                const dish = menuData.find(d => d.id == dishId);
                if (dish) {
                    openDishModal(dish);
                }
            }
        });
    });
}

// Initialiser les favoris
function initializeFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    document.querySelectorAll('.btn-favorite').forEach(button => {
        const dishId = button.dataset.id;
        const isFavorite = favorites.some(fav => fav.id == dishId);
        
        if (isFavorite) {
            button.innerHTML = '<i class="fas fa-heart"></i>';
            button.classList.add('active');
        }
    });
}

// Basculer le statut favori
function toggleFavorite(dish, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    const index = favorites.findIndex(fav => fav.id === dish.id);
    
    if (index === -1) {
        // Ajouter aux favoris
        favorites.push({
            id: dish.id,
            title: dish.title,
            image: dish.image,
            price: dish.price,
            addedAt: new Date().toISOString()
        });
        
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.classList.add('active');
        
        showNotification(`"${dish.title}" ajouté aux favoris`, 'success');
        
        // Animation
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 300);
        
    } else {
        // Retirer des favoris
        favorites.splice(index, 1);
        
        button.innerHTML = '<i class="far fa-heart"></i>';
        button.classList.remove('active');
        
        showNotification(`"${dish.title}" retiré des favoris`, 'info');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ==================== GESTION DES SÉLECTIONS QUOTIDIENNES ====================

// Initialiser le sélecteur de jour
function initializeDaySelector() {
    const dayButtons = document.querySelectorAll('.day-btn');
    const currentDay = new Date().getDay(); // 0 = Dimanche, 1 = Lundi, etc.
    
    // Convertir en format français (1 = Lundi)
    const frenchDayIndex = currentDay === 0 ? 6 : currentDay - 1;
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    
    dayButtons.forEach((button, index) => {
        // Sélectionner le jour actuel par défaut
        if (index === frenchDayIndex) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', function() {
            dayButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mettre à jour le sélecteur dans le modal
            updateModalDaySelector(this.dataset.day);
            
            // Afficher le nombre de plats sélectionnés pour ce jour
            showDaySelectionCount(this.dataset.day);
        });
    });
    
    // Mettre à jour le sélecteur initial
    if (dayButtons[frenchDayIndex]) {
        updateModalDaySelector(dayButtons[frenchDayIndex].dataset.day);
    }
}

// Mettre à jour le sélecteur de jour dans le modal
function updateModalDaySelector(day) {
    const selectElement = document.getElementById('select-day');
    if (selectElement) {
        const dayMap = {
            'lundi': 'Lundi',
            'mardi': 'Mardi',
            'mercredi': 'Mercredi',
            'jeudi': 'Jeudi',
            'vendredi': 'Vendredi',
            'samedi': 'Samedi',
            'dimanche': 'Dimanche'
        };
        
        selectElement.value = dayMap[day] || 'Lundi';
    }
}

// Afficher le nombre de plats sélectionnés pour un jour
function showDaySelectionCount(day) {
    const selections = weeklySelections[day] || { dishes: [] };
    const count = selections.dishes.length;
    
    console.log(`📅 ${count} plat(s) sélectionné(s) pour ${day}`);
}

// Charger les sélections hebdomadaires
function loadWeeklySelections() {
    weeklySelections = JSON.parse(localStorage.getItem('weeklySelections')) || {};
    console.log(`📋 ${Object.keys(weeklySelections).length} jour(s) avec sélection(s) chargée(s)`);
    
    // Mettre à jour le compteur de sélections
    updateSelectionCount();
    updateFloatingBadge();
}

// Mettre à jour le compteur de sélections
function updateSelectionCount() {
    let totalSelections = 0;
    
    Object.values(weeklySelections).forEach(day => {
        totalSelections += day.dishes.length;
    });
    
    // Mettre à jour le badge dans l'interface
    const selectionBadge = document.querySelector('.selection-count');
    if (totalSelections > 0) {
        if (!selectionBadge) {
            const nav = document.querySelector('.premium-nav');
            if (nav) {
                const badge = document.createElement('div');
                badge.className = 'selection-count';
                badge.textContent = totalSelections;
                nav.appendChild(badge);
            }
        } else {
            selectionBadge.textContent = totalSelections;
        }
    } else if (selectionBadge) {
        selectionBadge.remove();
    }
    
    console.log(`📊 Total des sélections: ${totalSelections} plat(s)`);
    return totalSelections;
}

// Mettre à jour le badge flottant
function updateFloatingBadge() {
    const floatingBadge = document.getElementById('floating-badge');
    if (floatingBadge) {
        const totalSelections = calculateTotalDishes();
        floatingBadge.textContent = totalSelections;
        floatingBadge.style.display = totalSelections > 0 ? 'flex' : 'none';
    }
}

// Initialiser la navigation du modal
function initializeModalNavigation() {
    const navButtons = document.querySelectorAll('.modal-nav-btn');
    const sections = document.querySelectorAll('.modal-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            // Mettre à jour les boutons de navigation
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Afficher la section correspondante
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `section-${targetSection}`) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// ==================== GESTION DU MODAL ====================

// Ouvrir le modal des détails
function openDishModal(dish) {
    selectedDish = dish;
    const modal = document.getElementById('dish-modal');
    
    if (!modal) return;
    
    // Mettre à jour le contenu du modal
    updateModalContent(dish);
    
    // Mettre à jour le bouton favori
    updateModalFavoriteButton(dish);
    
    // Afficher le modal avec animation
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');
    
    // Animation d'entrée
    const modalContainer = modal.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.style.animation = 'modalSlideUp 0.4s ease-out';
    }
    
    console.log(`🍽️ Modal ouvert: ${dish.title}`);
}

// Mettre à jour le contenu du modal
function updateModalContent(dish) {
    // Titre et informations principales
    document.getElementById('modal-dish-title').textContent = dish.title;
    document.getElementById('modal-dish-price').textContent = `${dish.price}€`;
    
    // Image du plat
    const modalImage = document.getElementById('modal-dish-image');
    if (modalImage) {
        modalImage.src = dish.image;
        modalImage.alt = dish.title;
        
        // Précharger l'image
        const img = new Image();
        img.src = dish.image;
        img.onload = () => {
            modalImage.style.opacity = '1';
        };
    }
    
    // Origine et calories
    document.getElementById('modal-dish-origin').innerHTML = `
        <i class="fas fa-map-marker-alt"></i> ${dish.origin}
    `;
    document.getElementById('modal-calories').innerHTML = `
        <i class="fas fa-fire"></i> ${dish.calories} kcal
    `;
    
    // Description et histoire
    document.getElementById('modal-dish-description').textContent = dish.description;
    const storyElement = document.getElementById('modal-dish-story');
    if (storyElement && dish.story) {
        storyElement.textContent = dish.story;
    }
    
    // Temps de préparation
    document.getElementById('modal-prep-time').textContent = dish.prepTime || '25 min';
    
    // Informations nutritionnelles
    document.getElementById('modal-protein').textContent = dish.protein || '28g';
    document.getElementById('modal-carbs').textContent = dish.carbs || '35g';
    document.getElementById('modal-fat').textContent = dish.fat || '22g';
    document.getElementById('modal-fiber').textContent = dish.fiber || '8g';
    
    // Ingrédients
    const ingredientsGrid = document.getElementById('modal-ingredients-grid');
    if (ingredientsGrid) {
        ingredientsGrid.innerHTML = dish.ingredients.map(ingredient => `
            <div class="ingredient-card ${!ingredient.essential ? 'optional' : ''}">
                <div class="ingredient-icon">${getIngredientIcon(ingredient.type)}</div>
                <div class="ingredient-name">${ingredient.name}</div>
                <div class="ingredient-type">${ingredient.type}</div>
                ${!ingredient.essential ? '<div class="ingredient-optional">Optionnel</div>' : ''}
            </div>
        `).join('');
    }
    
    // Options de personnalisation
    const customizationOptions = document.getElementById('customization-options');
    if (customizationOptions) {
        const nonEssentialIngredients = dish.ingredients.filter(ing => !ing.essential);
        
        if (nonEssentialIngredients.length > 0) {
            customizationOptions.innerHTML = nonEssentialIngredients.map(ingredient => `
                <div class="customization-option">
                    <div class="option-label">
                        <span class="option-name">Retirer ${ingredient.name}</span>
                        <span class="option-desc">Ingrédient non essentiel</span>
                    </div>
                    <label class="customization-switch">
                        <input type="checkbox" value="${ingredient.name}">
                        <span class="customization-slider"></span>
                    </label>
                </div>
            `).join('');
        } else {
            customizationOptions.innerHTML = `
                <div class="no-customization">
                    <i class="fas fa-info-circle"></i>
                    <p>Tous les ingrédients de ce plat sont essentiels à sa préparation.</p>
                </div>
            `;
        }
    }
}

// Mettre à jour le bouton favori dans le modal
function updateModalFavoriteButton(dish) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(fav => fav.id === dish.id);
    const favoriteButton = document.getElementById('modal-favorite');
    
    if (favoriteButton) {
        if (isFavorite) {
            favoriteButton.innerHTML = '<i class="fas fa-heart"></i>';
            favoriteButton.classList.add('active');
        } else {
            favoriteButton.innerHTML = '<i class="far fa-heart"></i>';
            favoriteButton.classList.remove('active');
        }
    }
}

// Obtenir l'icône d'un ingrédient
function getIngredientIcon(type) {
    const icons = {
        'Fruit': '🍎',
        'Légume': '🥦',
        'Viande': '🥩',
        'Poisson': '🐟',
        'Fruit de mer': '🦐',
        'Volaille': '🍗',
        'Charcuterie': '🥓',
        'Fromage': '🧀',
        'Œufs': '🥚',
        'Pain': '🥖',
        'Viennoiserie': '🥐',
        'Pâtisserie': '🧁',
        'Chocolat': '🍫',
        'Glace': '🍨',
        'Sorbet': '🍧',
        'Café': '☕',
        'Jus': '🧃',
        'Vin': '🍷',
        'Alcool': '🥃',
        'Sauce': '🥫',
        'Épicerie': '🧂',
        'Produit laitier': '🥛',
        'Aromate': '🌿',
        'Champignon': '🍄',
        'Fruit à coque': '🥜',
        'Raisin': '🍇',
        'Caramel': '🍮',
        'Sirop': '🍯',
        'Pâte': '🥟',
        'Décoration': '💫',
        'Infusion': '🍵',
        'Levure': '🧫',
        'Sel': '🧂',
        'Épice': '🌶️',
        'Confiture': '🍓'
    };
    
    return icons[type] || '🥘';
}

// Sélectionner un plat pour un jour
function selectDishForDay(dish) {
    const activeDayButton = document.querySelector('.day-btn.active');
    if (!activeDayButton) {
        showNotification('Veuillez sélectionner un jour', 'warning');
        return;
    }
    
    const selectedDay = activeDayButton.dataset.day;
    const dayName = getDayName(selectedDay);
    
    // Récupérer les ingrédients retirés (depuis le modal si ouvert)
    const removedIngredients = getRemovedIngredients();
    
    // Récupérer les notes spéciales
    const specialNotes = document.getElementById('special-notes') ? 
        document.getElementById('special-notes').value : '';
    
    // Initialiser le jour s'il n'existe pas
    if (!weeklySelections[selectedDay]) {
        weeklySelections[selectedDay] = {
            date: new Date().toISOString().split('T')[0],
            dishes: []
        };
    }
    
    // Vérifier si le plat n'est pas déjà sélectionné pour ce jour
    const existingSelection = weeklySelections[selectedDay].dishes.find(d => d.id === dish.id);
    
    if (existingSelection) {
        showNotification(`"${dish.title}" est déjà sélectionné pour ${dayName}`, 'warning');
        return;
    }
    
    // Vérifier la limite de plats par jour (par exemple 3)
    if (weeklySelections[selectedDay].dishes.length >= 3) {
        showNotification(`Maximum 3 plats par jour. ${dayName} a déjà ${weeklySelections[selectedDay].dishes.length} plat(s).`, 'warning');
        return;
    }
    
    // Ajouter le plat aux sélections du jour
    const dishSelection = {
        id: dish.id,
        title: dish.title,
        price: dish.price,
        image: dish.image,
        removedIngredients: removedIngredients,
        specialNotes: specialNotes,
        selectedAt: new Date().toISOString(),
        category: dish.category,
        mealTypes: dish.mealTypes
    };
    
    weeklySelections[selectedDay].dishes.push(dishSelection);
    
    // Sauvegarder dans le localStorage
    localStorage.setItem('weeklySelections', JSON.stringify(weeklySelections));
    
    // Afficher une confirmation
    showNotification(`"${dish.title}" ajouté au menu du ${dayName}`, 'success');
    
    // Mettre à jour les compteurs
    updateSelectionCount();
    updateFloatingBadge();
    
    // Animation de confirmation
    const dayButton = document.querySelector(`.day-btn[data-day="${selectedDay}"]`);
    if (dayButton) {
        dayButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            dayButton.style.transform = 'scale(1)';
        }, 300);
    }
    
    console.log(`✅ Plat ajouté: ${dish.title} pour ${selectedDay}`);
}

// Obtenir le nom du jour
function getDayName(dayKey) {
    const days = {
        'lundi': 'Lundi',
        'mardi': 'Mardi',
        'mercredi': 'Mercredi',
        'jeudi': 'Jeudi',
        'vendredi': 'Vendredi',
        'samedi': 'Samedi',
        'dimanche': 'Dimanche'
    };
    return days[dayKey] || dayKey;
}

// Récupérer les ingrédients retirés
function getRemovedIngredients() {
    const removed = [];
    const checkboxes = document.querySelectorAll('#customization-options input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        removed.push(checkbox.value);
    });
    
    return removed;
}

// ==================== OVERVIEW HEBDOMADAIRE ====================

// Basculer l'affichage de l'overview
function toggleWeeklyOverview() {
    const overviewSection = document.getElementById('weekly-overview');
    const viewButton = document.getElementById('view-selection-btn');
    
    if (!overviewSection || !viewButton) return;
    
    if (overviewSection.style.display === 'none' || !overviewSection.style.display) {
        // Afficher l'overview
        overviewSection.style.display = 'block';
        viewButton.innerHTML = '<i class="fas fa-times"></i>';
        viewButton.style.background = '#6c757d';
        
        // Mettre à jour le contenu de l'overview
        updateWeeklyOverview();
        
        // Défiler vers l'overview
        overviewSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Cacher l'overview
        overviewSection.style.display = 'none';
        viewButton.innerHTML = '<i class="fas fa-calendar-check"></i>';
        viewButton.style.background = 'var(--primary-color)';
    }
}

// Mettre à jour l'overview hebdomadaire
function updateWeeklyOverview() {
    updateTimetable();
    updateSummary();
    updateUserInfoSummary();
}

// Mettre à jour le tableau des plats
function updateTimetable() {
    const timetableBody = document.querySelector('.timetable-body');
    if (!timetableBody) return;
    
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    const timeSlots = ['petit-dejeuner', 'dejeuner', 'diner'];
    
    if (Object.keys(weeklySelections).length === 0) {
        timetableBody.innerHTML = `
            <div class="empty-timetable">
                <i class="fas fa-calendar-times"></i>
                <h3>Aucune sélection</h3>
                <p>Commencez par sélectionner des plats pour voir votre planning hebdomadaire.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    days.forEach(day => {
        const daySelections = weeklySelections[day] || { dishes: [] };
        const dayName = getDayName(day);
        
        html += `
            <div class="timetable-day" data-day="${day}">
                <div class="day-header">
                    <span class="day-name">${dayName}</span>
                    <span class="day-count">${daySelections.dishes.length} plat(s)</span>
                </div>
                <div class="day-slots">
        `;
        
        // Créer des emplacements pour chaque créneau horaire
        timeSlots.forEach(slot => {
            // Trouver les plats pour ce créneau horaire (basé sur la catégorie/mealTypes)
            const slotDishes = daySelections.dishes.filter(dish => {
                const dishData = menuData.find(d => d.id === dish.id);
                if (!dishData) return false;
                
                // Mapper les types de repas aux créneaux horaires
                const timeSlotMap = {
                    'petit-dejeuner': ['petit-dejeuner', 'brunch'],
                    'dejeuner': ['entrees', 'plats', 'brunch'],
                    'diner': ['plats', 'desserts', 'entrees']
                };
                
                return dishData.mealTypes.some(mealType => 
                    timeSlotMap[slot]?.includes(mealType)
                );
            });
            
            html += `<div class="slot ${slotDishes.length > 0 ? 'has-dish' : ''}">`;
            
            if (slotDishes.length > 0) {
                // Afficher le premier plat (vous pourriez modifier pour afficher plusieurs)
                const dishData = menuData.find(d => d.id === slotDishes[0].id);
                if (dishData) {
                    html += `
                        <div class="slot-content">
                            <div class="slot-dish">
                                <img src="${dishData.image}" alt="${dishData.title}" class="dish-image-small">
                                <div class="dish-title-small">${dishData.title}</div>
                                <div class="dish-category">${getMealTypeLabel(dishData.mealTypes[0])}</div>
                                <button class="remove-dish-btn" data-day="${day}" data-id="${dishData.id}">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    `;
                }
            } else {
                html += `
                    <div class="slot-content">
                        <div class="slot-empty">
                            <i class="fas fa-utensils"></i>
                            <p>Pas encore sélectionné</p>
                        </div>
                    </div>
                `;
            }
            
            html += '</div>';
        });
        
        html += '</div></div>';
    });
    
    timetableBody.innerHTML = html;
    
    // Attacher les événements aux boutons de suppression
    attachRemoveDishListeners();
}

// Obtenir le libellé du type de repas
function getMealTypeLabel(mealType) {
    const labels = {
        'entrees': 'Entrée',
        'plats': 'Plat principal',
        'desserts': 'Dessert',
        'boissons': 'Boisson',
        'petit-dejeuner': 'Petit-déjeuner',
        'brunch': 'Brunch'
    };
    return labels[mealType] || mealType;
}

// Mettre à jour le résumé
function updateSummary() {
    let totalDishes = 0;
    let selectedDays = 0;
    let totalValue = 0;
    
    Object.values(weeklySelections).forEach(day => {
        if (day.dishes.length > 0) {
            selectedDays++;
            totalDishes += day.dishes.length;
            
            // Calculer la valeur totale
            day.dishes.forEach(dish => {
                const dishData = menuData.find(d => d.id === dish.id);
                if (dishData) {
                    totalValue += parseFloat(dishData.price) || 0;
                }
            });
        }
    });
    
    // Mettre à jour l'interface
    document.getElementById('total-dishes').textContent = totalDishes;
    document.getElementById('selected-days').textContent = selectedDays;
    document.getElementById('estimated-value').textContent = `${totalValue}€`;
    
    // Mettre à jour le badge du plan
    const planBadge = document.getElementById('user-plan-badge');
    if (planBadge) {
        planBadge.textContent = currentUser.subscription.planName.toUpperCase();
        planBadge.className = 'summary-value plan-badge';
        planBadge.classList.add(currentUser.subscription.plan);
    }
}

// Mettre à jour les informations utilisateur dans le résumé
async function updateUserInfoSummary() {
    try {
        // Obtenir les données utilisateur de Firestore pour des informations complètes
        if (currentUser.uid) {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                
                document.getElementById('summary-name').textContent = userData.name || currentUser.name;
                document.getElementById('summary-email').textContent = userData.email || currentUser.email;
                document.getElementById('summary-phone').textContent = userData.phone || 'Non renseigné';
                document.getElementById('summary-address').textContent = userData.address || 'Non renseignée';
                return;
            }
        }
        
        // Fallback au localStorage
        document.getElementById('summary-name').textContent = currentUser.name;
        document.getElementById('summary-email').textContent = currentUser.email;
        document.getElementById('summary-phone').textContent = localStorage.getItem('userPhone') || 'Non renseigné';
        document.getElementById('summary-address').textContent = localStorage.getItem('userAddress') || 'Non renseignée';
        
    } catch (error) {
        console.error('Erreur lors du chargement des infos utilisateur:', error);
        // Utiliser les informations de base
        document.getElementById('summary-name').textContent = currentUser.name;
        document.getElementById('summary-email').textContent = currentUser.email;
        document.getElementById('summary-phone').textContent = 'Chargement...';
        document.getElementById('summary-address').textContent = 'Chargement...';
    }
}

// Attacher les écouteurs d'événements de suppression
function attachRemoveDishListeners() {
    document.querySelectorAll('.remove-dish-btn').forEach(button => {
        button.addEventListener('click', function() {
            const day = this.dataset.day;
            const dishId = parseInt(this.dataset.id);
            
            removeDishFromDay(day, dishId);
        });
    });
}

// Supprimer un plat d'un jour
function removeDishFromDay(day, dishId) {
    if (weeklySelections[day]) {
        weeklySelections[day].dishes = weeklySelections[day].dishes.filter(d => d.id !== dishId);
        
        // Si aucun plat restant, supprimer l'entrée du jour
        if (weeklySelections[day].dishes.length === 0) {
            delete weeklySelections[day];
        }
        
        // Sauvegarder dans localStorage
        localStorage.setItem('weeklySelections', JSON.stringify(weeklySelections));
        
        // Mettre à jour l'interface
        updateTimetable();
        updateSummary();
        updateSelectionCount();
        updateFloatingBadge();
        
        showNotification('Plat retiré de votre sélection', 'success');
    }
}

// Calculer le total des plats
function calculateTotalDishes() {
    let total = 0;
    Object.values(weeklySelections).forEach(day => {
        total += day.dishes.length;
    });
    return total;
}

// ==================== ENVOI DES SÉLECTIONS À FIREBASE ====================

async function sendWeeklySelectionsToFirebase() {
    if (!currentUser.uid) {
        showNotification('Veuillez vous reconnecter', 'error');
        return false;
    }
    
    if (Object.keys(weeklySelections).length === 0) {
        showNotification('Veuillez sélectionner au moins un plat', 'warning');
        return false;
    }
    
    try {
        showLoadingOverlay('Envoi de votre commande...');
        
        // Obtenir les informations complètes de l'utilisateur
        let userData = {};
        try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
                userData = userDoc.data();
            }
        } catch (userError) {
            console.log('Utilisation des données utilisateur de base');
        }
        
        // Préparer les données de commande
        const orderData = {
            userId: currentUser.uid,
            userName: userData.name || currentUser.name,
            userEmail: userData.email || currentUser.email,
            userPhone: userData.phone || 'Non renseigné',
            userAddress: userData.address || 'Non renseignée',
            
            subscriptionPlan: currentUser.subscription.plan,
            subscriptionPlanName: currentUser.subscription.planName,
            
            selections: weeklySelections,
            totalDishes: calculateTotalDishes(),
            estimatedValue: calculateEstimatedValue(),
            
            orderDate: new Date().toISOString(),
            deliveryStartDate: getNextMonday(),
            deliveryEndDate: getNextSunday(),
            
            status: 'pending',
            paymentStatus: 'pending',
            deliveryStatus: 'scheduled',
            
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Sauvegarder dans Firestore
        const ordersRef = collection(db, "weeklyOrders");
        const orderRef = await addDoc(ordersRef, orderData);
        
        console.log('✅ Commande enregistrée avec ID:', orderRef.id);
        
        // Sauvegarder également dans la sous-collection des commandes de l'utilisateur
        const userOrdersRef = collection(db, "users", currentUser.uid, "orders");
        await addDoc(userOrdersRef, {
            orderId: orderRef.id,
            ...orderData
        });
        
        // Mettre à jour la commande actuelle de l'utilisateur
        await updateDoc(doc(db, "users", currentUser.uid), {
            currentOrder: orderRef.id,
            lastOrderDate: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        
        // Effacer les sélections locales après sauvegarde réussie
        weeklySelections = {};
        localStorage.removeItem('weeklySelections');
        updateSelectionCount();
        updateFloatingBadge();
        updateTimetable();
        updateSummary();
        
        hideLoadingOverlay();
        showNotification('🎉 Commande confirmée avec succès !', 'success');
        
        // Afficher le message de confirmation
        setTimeout(() => {
            showOrderConfirmation(orderRef.id, orderData);
        }, 1000);
        
        return true;
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'enregistrement de la commande:', error);
        hideLoadingOverlay();
        showNotification('Erreur lors de l\'envoi de la commande', 'error');
        return false;
    }
}

// Calculer la valeur estimée
function calculateEstimatedValue() {
    let total = 0;
    Object.values(weeklySelections).forEach(day => {
        day.dishes.forEach(dish => {
            const dishData = menuData.find(d => d.id === dish.id);
            if (dishData) {
                total += parseFloat(dishData.price) || 0;
            }
        });
    });
    return total;
}

// Obtenir le prochain lundi (début de livraison)
function getNextMonday() {
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7));
    nextMonday.setHours(0, 0, 0, 0);
    return nextMonday.toISOString();
}

// Obtenir le prochain dimanche (fin de livraison)
function getNextSunday() {
    const nextMonday = new Date(getNextMonday());
    const nextSunday = new Date(nextMonday);
    nextSunday.setDate(nextMonday.getDate() + 6);
    nextSunday.setHours(23, 59, 59, 999);
    return nextSunday.toISOString();
}

// Afficher la confirmation de commande
function showOrderConfirmation(orderId, orderData) {
    const confirmationHTML = `
        <div class="order-confirmation">
            <div class="confirmation-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Commande Confirmée !</h2>
            <p class="confirmation-subtitle">Votre commande a été enregistrée avec succès</p>
            
            <div class="confirmation-details">
                <div class="detail-item">
                    <span class="detail-label">Numéro de commande:</span>
                    <span class="detail-value">${orderId.substring(0, 8)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Date de livraison:</span>
                    <span class="detail-value">${formatDate(orderData.deliveryStartDate)} - ${formatDate(orderData.deliveryEndDate)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Total plats:</span>
                    <span class="detail-value">${orderData.totalDishes}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Valeur estimée:</span>
                    <span class="detail-value">${orderData.estimatedValue}€</span>
                </div>
            </div>
            
            <p class="confirmation-message">
                Vous recevrez un email de confirmation avec les détails de votre commande.
                Notre équipe vous contactera pour finaliser les détails de livraison.
            </p>
            
            <div class="confirmation-actions">
                <button class="btn btn-primary" id="close-confirmation-btn">
                    <i class="fas fa-check"></i> Parfait !
                </button>
                <button class="btn btn-outline" id="print-confirmation-btn">
                    <i class="fas fa-print"></i> Imprimer
                </button>
            </div>
        </div>
    `;
    
    // Créer le modal
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.innerHTML = confirmationHTML;
    
    // Ajouter les styles
    const style = document.createElement('style');
    style.textContent = `
        .confirmation-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
        }
        
        .order-confirmation {
            background: white;
            border-radius: 20px;
            padding: 3rem;
            max-width: 500px;
            width: 100%;
            text-align: center;
            animation: modalSlideUp 0.4s ease-out;
        }
        
        .confirmation-icon {
            font-size: 4rem;
            color: #4CAF50;
            margin-bottom: 1.5rem;
        }
        
        .order-confirmation h2 {
            color: var(--dark-color);
            margin-bottom: 0.5rem;
        }
        
        .confirmation-subtitle {
            color: var(--text-light);
            margin-bottom: 2rem;
        }
        
        .confirmation-details {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 1.5rem;
            margin: 2rem 0;
            text-align: left;
        }
        
        .detail-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.75rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .detail-item:last-child {
            margin-bottom: 0;
            border-bottom: none;
        }
        
        .detail-label {
            color: var(--text-light);
        }
        
        .detail-value {
            font-weight: 600;
            color: var(--dark-color);
        }
        
        .confirmation-message {
            color: var(--text-color);
            line-height: 1.6;
            margin: 2rem 0;
        }
        
        .confirmation-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        @media (max-width: 768px) {
            .order-confirmation {
                padding: 2rem;
            }
            
            .confirmation-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Ajouter les écouteurs d'événements
    document.getElementById('close-confirmation-btn').addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    document.getElementById('print-confirmation-btn').addEventListener('click', () => {
        window.print();
    });
}

// Formater la date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
}

// ==================== GESTION DES ÉVÉNEMENTS ====================

// Attacher les événements globaux
function attachEventListeners() {
    // Fermer le modal
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Confirmer la sélection dans le modal
    const confirmButton = document.getElementById('confirm-selection');
    if (confirmButton) {
        confirmButton.addEventListener('click', function() {
            if (selectedDish) {
                selectDishForDay(selectedDish);
                closeModal();
            }
        });
    }
    
    // Bouton favori dans le modal
    const modalFavorite = document.getElementById('modal-favorite');
    if (modalFavorite) {
        modalFavorite.addEventListener('click', function() {
            if (selectedDish) {
                toggleFavorite(selectedDish, this);
            }
        });
    }
    
    // Bouton ajouter aux favoris dans le footer du modal
    const addToFavorites = document.getElementById('add-to-favorites');
    if (addToFavorites) {
        addToFavorites.addEventListener('click', function() {
            if (selectedDish) {
                const favoriteButton = document.querySelector(`.btn-favorite[data-id="${selectedDish.id}"]`);
                if (favoriteButton) {
                    toggleFavorite(selectedDish, favoriteButton);
                }
                updateModalFavoriteButton(selectedDish);
            }
        });
    }
    
    // Échap pour fermer le modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // ==================== GESTION DE LA DÉCONNEXION ====================
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', async function() {
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                try {
                    showLoadingOverlay('Déconnexion en cours...');
                    await signOut(auth);
                    
                    // Effacer les données de session
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('userPhone');
                    localStorage.removeItem('userAddress');
                    localStorage.removeItem('userSubscription');
                    localStorage.removeItem('hasSubscription');
                    localStorage.removeItem('userPlan');
                    localStorage.removeItem('userPlanName');
                    localStorage.removeItem('weeklySelections');
                    localStorage.removeItem('favorites');
                    
                    showNotification('Déconnexion réussie', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'auth.html';
                    }, 1500);
                    
                } catch (error) {
                    console.error('❌ Erreur lors de la déconnexion:', error);
                    hideLoadingOverlay();
                    showNotification('Erreur lors de la déconnexion', 'error');
                }
            }
        });
    }
    
    // ==================== BOUTON RETOUR AU MENU ====================
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    if (backToMenuBtn) {
        backToMenuBtn.addEventListener('click', () => {
            document.getElementById('weekly-overview').style.display = 'none';
            const viewButton = document.getElementById('view-selection-btn');
            if (viewButton) {
                viewButton.innerHTML = '<i class="fas fa-calendar-check"></i>';
                viewButton.style.background = 'var(--primary-color)';
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ==================== BOUTON CONFIRMER LA SÉLECTION ====================
    const confirmSelectionBtn = document.getElementById('confirm-selection-btn');
    if (confirmSelectionBtn) {
        confirmSelectionBtn.addEventListener('click', async () => {
            const confirmed = confirm(
                'Confirmer votre commande ?\n\n' +
                'Votre sélection hebdomadaire sera envoyée à notre équipe.\n' +
                'Vous ne pourrez plus modifier cette commande.'
            );
            
            if (confirmed) {
                await sendWeeklySelectionsToFirebase();
            }
        });
    }
    
    // ==================== BOUTON DE MISE À NIVEAU D'ABONNEMENT ====================
    const upgradeButton = document.querySelector('.btn-upgrade-subscription');
    if (upgradeButton) {
        upgradeButton.addEventListener('click', function() {
            window.location.href = 'subscription.html';
        });
    }
}

// Fermer le modal
function closeModal() {
    const modal = document.getElementById('dish-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        selectedDish = null;
        
        // Réinitialiser les champs
        const specialNotes = document.getElementById('special-notes');
        if (specialNotes) specialNotes.value = '';
        
        const checkboxes = document.querySelectorAll('#customization-options input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
    }
}

// ==================== STYLES CSS DYNAMIQUES ====================

// Ajout de styles CSS dynamiques
const style = document.createElement('style');
style.textContent = `
    /* Styles pour les notifications */
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        z-index: 9999;
        border-left: 4px solid var(--primary-color);
        max-width: 350px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: #4CAF50;
        background: linear-gradient(135deg, #f6ffed 0%, #e6f7ff 100%);
    }
    
    .notification-warning {
        border-left-color: #FF9800;
        background: linear-gradient(135deg, #fff7e6 0%, #fff2e8 100%);
    }
    
    .notification-error {
        border-left-color: #f44336;
        background: linear-gradient(135deg, #fff2f0 0%, #ffe6e6 100%);
    }
    
    .notification-info {
        border-left-color: #2196F3;
        background: linear-gradient(135deg, #e6f7ff 0%, #f0f5ff 100%);
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification-success i {
        color: #4CAF50;
    }
    
    .notification-warning i {
        color: #FF9800;
    }
    
    .notification-error i {
        color: #f44336;
    }
    
    .notification-info i {
        color: #2196F3;
    }
    
    /* Auth overlay */
    .auth-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9998;
        transition: opacity 0.3s ease;
    }
    
    .auth-overlay .spinner {
        width: 60px;
        height: 60px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }
    
    .auth-overlay .loading-message {
        font-size: 1.1rem;
        color: var(--text-color);
        margin-top: 1rem;
    }
    
    /* Badge de sélection */
    .selection-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--secondary-color);
        color: var(--dark-color);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    /* Boutons favoris */
    .btn-favorite.active {
        color: #e74c3c;
        border-color: #e74c3c;
    }
    
    .btn-favorite.active i {
        color: #e74c3c;
    }
    
    /* États vides */
    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-light);
        grid-column: 1 / -1;
    }
    
    .empty-icon {
        font-size: 4rem;
        margin-bottom: 1.5rem;
        color: var(--border-color);
        opacity: 0.5;
    }
    
    .empty-state h3 {
        margin-bottom: 1rem;
        color: var(--dark-color);
        font-family: var(--font-heading);
        font-weight: 300;
    }
    
    /* Chargement */
    .loading-state {
        text-align: center;
        padding: 4rem 2rem;
        grid-column: 1 / -1;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--light-color);
        border-top: 3px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Images des plats */
    .dish-image-container {
        position: relative;
        width: 100%;
        height: 200px;
        overflow: hidden;
        border-radius: 8px 8px 0 0;
    }
    
    .dish-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.5s ease;
    }
    
    .dish-item:hover .dish-image {
        transform: scale(1.05);
    }
    
    .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%);
    }
    
    .plan-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        z-index: 1;
    }
    
    .plan-badge.bronze {
        background: rgba(205, 127, 50, 0.9);
        color: white;
    }
    
    .plan-badge.silver {
        background: rgba(192, 192, 192, 0.9);
        color: var(--dark-color);
    }
    
    .plan-badge.gold {
        background: rgba(212, 175, 55, 0.9);
        color: var(--dark-color);
    }
    
    /* Badge populaire */
    .popular-badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: linear-gradient(135deg, var(--secondary-color), #ffd700);
        color: var(--dark-color);
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        z-index: 1;
        animation: glow 2s infinite alternate;
    }
    
    @keyframes glow {
        from { box-shadow: 0 0 5px var(--secondary-color); }
        to { box-shadow: 0 0 15px var(--secondary-color); }
    }
    
    /* Tags des plats */
    .dish-tag {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: inline-block;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
    
    .dish-tag.vegetarian {
        background: rgba(76, 175, 80, 0.1);
        color: #2E7D32;
        border: 1px solid rgba(76, 175, 80, 0.3);
    }
    
    .dish-tag.popular {
        background: rgba(255, 193, 7, 0.1);
        color: #FF9800;
        border: 1px solid rgba(255, 193, 7, 0.3);
    }
    
    .dish-tag.fast {
        background: rgba(33, 150, 243, 0.1);
        color: #2196F3;
        border: 1px solid rgba(33, 150, 243, 0.3);
    }
    
    .dish-tag.signature {
        background: rgba(156, 39, 176, 0.1);
        color: #9C27B0;
        border: 1px solid rgba(156, 39, 176, 0.3);
    }
    
    /* Métadonnées */
    .dish-meta {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        color: var(--text-light);
        font-size: 0.9rem;
    }
    
    .meta-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
    /* User plan dans le header */
    .user-plan.bronze {
        color: #CD7F32;
    }
    
    .user-plan.silver {
        color: #C0C0C0;
    }
    
    .user-plan.gold {
        color: #D4AF37;
    }
    
    /* Floating button */
    .btn-floating {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    }
    
    .btn-floating:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
    }
    
    .floating-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: var(--secondary-color);
        color: var(--dark-color);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        animation: pulse 2s infinite;
    }
    
    /* Weekly Overview Styles */
    .weekly-overview {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        padding: 4rem 0;
        margin-top: 4rem;
        border-top: 1px solid var(--border-color);
    }
    
    .overview-header {
        text-align: center;
        margin-bottom: 3rem;
    }
    
    .overview-header h2 {
        color: var(--dark-color);
        margin-bottom: 0.5rem;
        font-size: 2.2rem;
    }
    
    .overview-subtitle {
        color: var(--text-light);
        font-size: 1.1rem;
    }
    
    /* Weekly Timetable */
    .weekly-timetable {
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        overflow: hidden;
        margin-bottom: 2rem;
    }
    
    .timetable-header {
        background: var(--primary-color);
        color: white;
        padding: 1.5rem;
    }
    
    .time-slots {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        text-align: center;
    }
    
    .time-slot {
        padding: 0.75rem;
        background: rgba(255,255,255,0.1);
        border-radius: 8px;
        font-weight: 600;
    }
    
    .timetable-body {
        padding: 1.5rem;
    }
    
    .timetable-day {
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 1rem;
    }
    
    .timetable-day:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .day-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .day-name {
        font-weight: 600;
        color: var(--dark-color);
        font-size: 1.1rem;
    }
    
    .day-count {
        background: var(--primary-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.9rem;
    }
    
    .day-slots {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }
    
    .slot {
        min-height: 120px;
        border: 2px dashed var(--border-color);
        border-radius: 10px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;
        background: #f8f9fa;
    }
    
    .slot.has-dish {
        border: 2px solid var(--primary-color);
        background: linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%);
    }
    
    .slot-content {
        text-align: center;
    }
    
    .slot-empty {
        color: var(--text-light);
        font-size: 0.9rem;
    }
    
    .slot-empty i {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--border-color);
    }
    
    .slot-dish {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    
    .dish-image-small {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        object-fit: cover;
        margin-bottom: 0.5rem;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .dish-title-small {
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        text-align: center;
        color: var(--dark-color);
    }
    
    .dish-category {
        font-size: 0.75rem;
        color: var(--primary-color);
        background: rgba(76, 175, 80, 0.1);
        padding: 0.1rem 0.5rem;
        border-radius: 10px;
        margin-bottom: 0.25rem;
    }
    
    .remove-dish-btn {
        background: #f8f9fa;
        border: 1px solid var(--border-color);
        color: var(--text-light);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 0.5rem;
        transition: all 0.2s ease;
    }
    
    .remove-dish-btn:hover {
        background: #f44336;
        border-color: #f44336;
        color: white;
    }
    
    /* Selection Summary */
    .selection-summary {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .summary-card {
        background: white;
        border-radius: 15px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    }
    
    .summary-card h3 {
        color: var(--dark-color);
        margin-bottom: 1.5rem;
        padding-bottom: 0.75rem;
        border-bottom: 2px solid var(--border-color);
    }
    
    .summary-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    
    .summary-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .summary-label {
        color: var(--text-light);
        font-size: 0.9rem;
    }
    
    .summary-value {
        font-weight: 600;
        color: var(--dark-color);
    }
    
    #user-plan-badge {
        background: var(--primary-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        text-transform: uppercase;
    }
    
    .user-info-summary {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .info-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .info-item i {
        color: var(--primary-color);
        width: 20px;
        text-align: center;
    }
    
    /* Confirmation Actions */
    .confirmation-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);
    }
    
    /* Empty states */
    .empty-timetable {
        text-align: center;
        padding: 3rem;
        color: var(--text-light);
    }
    
    .empty-timetable i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: var(--border-color);
    }
    
    /* Responsive */
    @media (max-width: 992px) {
        .selection-summary {
            grid-template-columns: 1fr;
        }
        
        .weekly-timetable {
            overflow-x: auto;
        }
        
        .timetable-body {
            min-width: 700px;
        }
    }
    
    @media (max-width: 768px) {
        .confirmation-actions {
            flex-direction: column;
            gap: 1rem;
        }
        
        .confirmation-actions .btn {
            width: 100%;
            text-align: center;
        }
        
        .time-slots {
            grid-template-columns: 1fr;
        }
        
        .day-slots {
            grid-template-columns: 1fr;
            gap: 0.5rem;
        }
        
        .slot {
            min-height: 100px;
        }
        
        .btn-floating {
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            font-size: 1.3rem;
        }
        
        .auth-overlay .spinner {
            width: 50px;
            height: 50px;
        }
        
        .auth-overlay .loading-message {
            font-size: 1rem;
            padding: 0 20px;
            text-align: center;
        }
    }
`;

document.head.appendChild(style);

// ==================== FONCTIONS DE DÉBOGAGE ET EXPORT ====================

// Exporter certaines fonctions pour le débogage
window.YummyApp = {
    getCurrentUser: () => currentUser,
    getMenuData: () => menuData,
    getWeeklySelections: () => weeklySelections,
    reloadDishes: loadDishes,
    showNotification: showNotification,
    clearSelections: () => {
        weeklySelections = {};
        localStorage.removeItem('weeklySelections');
        updateSelectionCount();
        updateFloatingBadge();
        updateTimetable();
        updateSummary();
        showNotification('Toutes les sélections ont été effacées', 'info');
    },
    checkSubscription: async () => {
        if (currentUser.uid) {
            return await checkUserSubscription(currentUser.uid);
        }
        return null;
    },
    logout: async () => {
        await signOut(auth);
        window.location.href = 'auth.html';
    }
};

console.log("🌟 Yummy Premium App - Prêt à servir l'excellence culinaire !");