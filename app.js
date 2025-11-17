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

    // Guides Data
    const guidesData = [
        {
            id: 1,
            title: 'Chá de Bebê Perfeito',
            subtitle: 'Organize o Chá de Bebê Mais Memorável e Estratégico',
            category: 'eventos',
            free: true,
            rating: 5.0,
            icon: 'fa-baby-carriage',
            bullets: [
                '30 jogos e dinâmicas criativas',
                'Lista de presentes estratégica',
                'Economize R$ 2.000+ comprando certo',
                'Templates de convites editáveis'
            ],
            meta: '📄 6 guias em 4 partes • ⏱️ 3–8 horas',
            testimonial: '"Meu chá foi o mais organizado da família!" – Carla M., Curitiba',
            userHasGuide: true,
            file: 'assets/ebooks/cha-bebe-perfeito.pdf'
        },
        {
            id: 2,
            title: 'Mala da Maternidade Perfeita',
            subtitle: 'Checklist Completo Para Não Esquecer Nada',
            category: 'preparacao',
            free: true,
            rating: 4.9,
            icon: 'fa-suitcase',
            bullets: [
                'Checklist completa de 3 malas',
                'Saber exatamente o que não levar',
                'Evite esquecimentos de última hora',
                'Modelos de etiquetas prontas'
            ],
            meta: '📄 18 páginas • ⏱️ 2–3 horas',
            testimonial: '"Não esqueci absolutamente nada!" – Juliana S., São Paulo',
            userHasGuide: false,
            file: 'assets/ebooks/mala-maternidade.pdf'
        },
        {
            id: 3,
            title: 'Organização do Enxoval do Bebê',
            subtitle: 'Monte o Enxoval Perfeito Gastando Menos',
            category: 'organizacao',
            free: true,
            rating: 5.0,
            icon: 'fa-box-open',
            bullets: [
                'Economize até R$ 2.500 no enxoval',
                'Checklist completo (150+ itens)',
                'Aprenda onde comprar com melhor preço',
                'Sistema de organização passo a passo'
            ],
            meta: '📄 78 páginas • ⏱️ 8–12 horas',
            testimonial: '"Economizei muito e comprei tudo certo!" – Amanda R., BH',
            userHasGuide: false,
            file: 'assets/ebooks/organizacao-enxoval.pdf'
        }
    ];

    // Check if user is already logged in
    checkAuthStatus();

    // Initialize guides grid
    renderGuides(guidesData);

    // Setup search and filters
    setupSearchAndFilters();

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

    // Render Guides Function
    function renderGuides(guides) {
        const grid = document.getElementById('guidesGrid');
        if (!grid) return;

        grid.innerHTML = guides.map(guide => `
            <div class="guide-card" data-category="${guide.category}">
                <div class="card-header">
                    <span class="card-badge ${guide.free ? 'badge-free' : 'badge-premium'}">
                        ${guide.free ? 'Grátis' : 'Premium'}
                    </span>
                    <span class="card-rating">
                        <i class="fas fa-star"></i>
                        ${guide.rating.toFixed(1)}
                    </span>
                    <div class="card-image">
                        <i class="fas ${guide.icon}"></i>
                    </div>
                </div>
                <div class="card-body">
                    <h3>${guide.title}</h3>
                    <p class="guide-subtitle">${guide.subtitle}</p>
                    <ul class="guide-bullets">
                        ${guide.bullets.map(bullet => `
                            <li>
                                <i class="fas fa-check"></i>
                                ${bullet}
                            </li>
                        `).join('')}
                    </ul>
                    <div class="guide-meta">${guide.meta}</div>
                    <div class="card-footer">
                        <button class="guide-cta included" data-file="${guide.file}" data-title="${guide.title}">
                            <i class="fas fa-check-circle"></i>
                            Incluído no seu plano
                        </button>
                        <p class="guide-testimonial">${guide.testimonial}</p>
                        ${guide.userHasGuide ? `
                            <div class="guide-read-status">
                                <i class="fas fa-check-circle"></i>
                                Você já leu este guia
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // Add click events for CTA buttons
        grid.querySelectorAll('.guide-cta').forEach(btn => {
            btn.addEventListener('click', function() {
                const file = this.getAttribute('data-file');
                const title = this.getAttribute('data-title');

                showNotification(`Preparando download: ${title}`, 'success');

                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = file;
                    link.download = file.split('/').pop();
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    showNotification(`${title} baixado com sucesso!`, 'success');
                }, 500);
            });
        });
    }

    // Setup Search and Filters
    function setupSearchAndFilters() {
        const searchInput = document.getElementById('searchInput');
        const filterChips = document.querySelectorAll('.filter-chip');
        let currentFilter = 'todos';

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                filterAndSearchGuides(currentFilter, searchTerm);
            });
        }

        // Filter chips functionality
        filterChips.forEach(chip => {
            chip.addEventListener('click', function() {
                filterChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.getAttribute('data-filter');

                const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                filterAndSearchGuides(currentFilter, searchTerm);
            });
        });
    }

    // Filter and Search Guides
    function filterAndSearchGuides(filter, searchTerm) {
        let filteredGuides = guidesData;

        // Apply category filter
        if (filter !== 'todos') {
            filteredGuides = filteredGuides.filter(guide => guide.category === filter);
        }

        // Apply search filter
        if (searchTerm) {
            filteredGuides = filteredGuides.filter(guide =>
                guide.title.toLowerCase().includes(searchTerm) ||
                guide.subtitle.toLowerCase().includes(searchTerm) ||
                guide.bullets.some(bullet => bullet.toLowerCase().includes(searchTerm))
            );
        }

        renderGuides(filteredGuides);
    }

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
