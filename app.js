// Coleção Mãe Segura - Portal da Comunidade
// Sistema de Login e Dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginPage = document.getElementById('loginPage');
    const dashboardPage = document.getElementById('dashboardPage');
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameSpan = document.getElementById('userName');

    // Demo credentials - Em produção, isso seria validado no servidor
    const validCredentials = {
        email: 'mae@segura.com',
        password: 'maesegura123',
        name: 'Mãe Especial'
    };

    // Check if user is already logged in
    checkAuthStatus();

    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validate credentials
        if (email === validCredentials.email && password === validCredentials.password) {
            // Success - save session
            const session = {
                email: email,
                name: validCredentials.name,
                loggedIn: true,
                timestamp: Date.now()
            };

            localStorage.setItem('maeSeguraSession', JSON.stringify(session));

            // Show success animation
            showLoginSuccess();
        } else {
            showError('E-mail ou senha incorretos. Tente novamente.');
        }
    });

    // Logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('maeSeguraSession');
        showLogoutAnimation();
    });

    // Download buttons - Real file downloads
    document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemName = this.parentElement.querySelector('span').textContent;
            const filePath = this.getAttribute('data-file');

            if (filePath) {
                showNotification(`Preparando download: ${itemName}`, 'success');

                // Create download link
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = filePath;
                    link.download = filePath.split('/').pop();
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    showNotification(`${itemName} baixado com sucesso!`, 'success');
                }, 500);
            } else {
                showNotification(`Arquivo não disponível: ${itemName}`, 'warning');
            }
        });
    });

    // Play buttons - Audio/Video playback
    document.querySelectorAll('.btn-play').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemName = this.parentElement.querySelector('span').textContent;
            const videoPath = this.getAttribute('data-video');
            const audioPath = this.getAttribute('data-audio');

            if (videoPath || audioPath) {
                const mediaPath = videoPath || audioPath;
                showNotification(`Iniciando: ${itemName}`, 'info');

                // Open media in new tab or modal (you can customize this)
                setTimeout(() => {
                    window.open(mediaPath, '_blank');
                }, 500);
            } else {
                showNotification(`Mídia não disponível: ${itemName}`, 'warning');
            }
        });
    });

    // Access buttons
    document.querySelectorAll('.btn-access').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemName = this.parentElement.querySelector('span').textContent;
            showNotification(`Acessando: ${itemName}`, 'info');

            // You can add specific URLs here
            // window.open('https://your-group-link.com', '_blank');
        });
    });

    // Helper Functions
    function checkAuthStatus() {
        const session = JSON.parse(localStorage.getItem('maeSeguraSession'));

        if (session && session.loggedIn) {
            // Check if session is not expired (24 hours)
            const now = Date.now();
            const sessionAge = now - session.timestamp;
            const maxAge = 24 * 60 * 60 * 1000; // 24 hours

            if (sessionAge < maxAge) {
                userNameSpan.textContent = session.name;
                loginPage.style.display = 'none';
                dashboardPage.style.display = 'block';
            } else {
                localStorage.removeItem('maeSeguraSession');
            }
        }
    }

    function showLoginSuccess() {
        const btn = loginForm.querySelector('.btn-login');
        btn.innerHTML = '<i class="fas fa-check"></i> Sucesso!';
        btn.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';

        setTimeout(() => {
            loginPage.style.opacity = '0';
            loginPage.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                loginPage.style.display = 'none';
                dashboardPage.style.display = 'block';
                dashboardPage.style.opacity = '0';

                requestAnimationFrame(() => {
                    dashboardPage.style.transition = 'opacity 0.5s ease';
                    dashboardPage.style.opacity = '1';
                });

                const session = JSON.parse(localStorage.getItem('maeSeguraSession'));
                userNameSpan.textContent = session.name;

                // Reset button
                btn.innerHTML = '<span>Entrar</span><i class="fas fa-arrow-right"></i>';
                btn.style.background = '';
            }, 500);
        }, 1000);
    }

    function showLogoutAnimation() {
        dashboardPage.style.opacity = '0';
        dashboardPage.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            dashboardPage.style.display = 'none';
            loginPage.style.display = 'flex';
            loginPage.style.opacity = '0';

            // Reset form
            loginForm.reset();

            requestAnimationFrame(() => {
                loginPage.style.transition = 'opacity 0.5s ease';
                loginPage.style.opacity = '1';
            });
        }, 500);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');

        // Shake the form
        const card = document.querySelector('.login-card');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
            card.style.animation = 'shake 0.5s ease-in-out';
        });

        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 4000);
    }

    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';

        const iconMap = {
            success: 'fa-check-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle',
            error: 'fa-times-circle'
        };

        const colorMap = {
            success: '#4caf50',
            info: '#2196f3',
            warning: '#ff9800',
            error: '#f44336'
        };

        notification.innerHTML = `
            <i class="fas ${iconMap[type]}" style="color: ${colorMap[type]}"></i>
            <span>${message}</span>
        `;

        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            z-index: 9999;
            animation: slideInRight 0.5s ease-out;
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added here for offline functionality
    });
}
