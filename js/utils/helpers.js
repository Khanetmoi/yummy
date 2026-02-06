// Fonctions réutilisables partout

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
};

export const calculateDeliveryTime = (itemCount) => {
    const hours = Math.ceil(itemCount / 2) * 24;
    return hours <= 24 ? '24h' : `${hours}h`;
};

export const showAlert = (message, type = 'success') => {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 400;
        min-width: 250px;
        padding: 1rem;
        border-radius: 8px;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
    `;
    
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};