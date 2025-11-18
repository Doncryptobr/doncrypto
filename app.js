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
            slug: 'cha-de-bebe-perfeito',
            title: 'Chá de Bebê Perfeito',
            subtitle: 'Organize o Chá de Bebê Mais Memorável e Estratégico',
            category: 'eventos',
            rating: 5.0,
            icon: 'fa-baby-carriage',
            image: 'https://i.imgur.com/w7b0Dmy.jpg',
            bullets: [
                '30 jogos e dinâmicas criativas',
                'Lista de presentes estratégica',
                'Economize R$ 2.000+ comprando certo',
                'Templates de convites editáveis'
            ],
            meta: '📄 6 guias em 4 partes • ⏱️ 3–8 horas',
            testimonial: '"Meu chá foi o mais organizado da família!" – Carla M., Curitiba',
            file: 'assets/ebooks/cha-bebe-perfeito.pdf',
            checkoutUrl: 'https://pay.hotmart.com/exemplo-cha-de-bebe',
            price: 'R$ 47,00',
            extras: [
                {
                    id: 1,
                    title: 'Checklist de Planejamento',
                    description: 'Lista completa para organizar cada detalhe',
                    icon: 'fa-list-check',
                    fileUrl: 'assets/extras/cha-bebe-checklist.pdf',
                    fileType: 'pdf'
                },
                {
                    id: 2,
                    title: 'Templates de Convites',
                    description: '10 modelos editáveis no Canva',
                    icon: 'fa-envelope',
                    fileUrl: 'assets/extras/cha-bebe-convites.pdf',
                    fileType: 'pdf'
                },
                {
                    id: 3,
                    title: 'Lista de Presentes Estratégica',
                    description: 'Planilha Excel editável',
                    icon: 'fa-file-excel',
                    fileUrl: 'assets/extras/cha-bebe-lista-presentes.xlsx',
                    fileType: 'xlsx'
                }
            ]
        },
        {
            id: 2,
            slug: 'mala-da-maternidade',
            title: 'Mala da Maternidade Perfeita',
            subtitle: 'Checklist Completo Para Não Esquecer Nada',
            category: 'preparacao',
            rating: 4.9,
            icon: 'fa-suitcase',
            image: 'https://i.imgur.com/Pu8MjoV.jpg',
            bullets: [
                'Checklist completa de 3 malas',
                'Saber exatamente o que não levar',
                'Evite esquecimentos de última hora',
                'Modelos de etiquetas prontas'
            ],
            meta: '📄 18 páginas • ⏱️ 2–3 horas',
            testimonial: '"Não esqueci absolutamente nada!" – Juliana S., São Paulo',
            file: 'assets/ebooks/mala-maternidade.pdf',
            checkoutUrl: 'https://pay.hotmart.com/exemplo-mala',
            price: 'R$ 37,00',
            extras: [
                {
                    id: 4,
                    title: 'Etiquetas para Malas',
                    description: 'Modelos prontos para imprimir',
                    icon: 'fa-tag',
                    fileUrl: 'assets/extras/mala-etiquetas.pdf',
                    fileType: 'pdf'
                },
                {
                    id: 5,
                    title: 'Checklist por Trimestre',
                    description: 'Organizado por fase da gestação',
                    icon: 'fa-calendar',
                    fileUrl: 'assets/extras/mala-checklist-trimestre.pdf',
                    fileType: 'pdf'
                }
            ]
        },
        {
            id: 3,
            slug: 'organizacao-enxoval',
            title: 'Organização do Enxoval do Bebê',
            subtitle: 'Monte o Enxoval Perfeito Gastando Menos',
            category: 'organizacao',
            rating: 5.0,
            icon: 'fa-box-open',
            image: 'https://i.imgur.com/vKNv7Li.jpg',
            bullets: [
                'Economize até R$ 2.500 no enxoval',
                'Checklist completo (150+ itens)',
                'Aprenda onde comprar com melhor preço',
                'Sistema de organização passo a passo'
            ],
            meta: '📄 78 páginas • ⏱️ 8–12 horas',
            testimonial: '"Economizei muito e comprei tudo certo!" – Amanda R., BH',
            file: 'assets/ebooks/organizacao-enxoval.pdf',
            checkoutUrl: 'https://pay.hotmart.com/exemplo-enxoval',
            price: 'R$ 67,00',
            extras: [
                {
                    id: 6,
                    title: 'Planilha de Controle de Gastos',
                    description: 'Gerencie seu orçamento do enxoval',
                    icon: 'fa-calculator',
                    fileUrl: 'assets/extras/enxoval-planilha-gastos.xlsx',
                    fileType: 'xlsx'
                },
                {
                    id: 7,
                    title: 'Guia de Lojas e Fornecedores',
                    description: 'Melhores lugares para comprar',
                    icon: 'fa-store',
                    fileUrl: 'assets/extras/enxoval-guia-lojas.pdf',
                    fileType: 'pdf'
                },
                {
                    id: 8,
                    title: 'Checklist Completo (150+ itens)',
                    description: 'Lista detalhada para não esquecer nada',
                    icon: 'fa-tasks',
                    fileUrl: 'assets/extras/enxoval-checklist-completo.pdf',
                    fileType: 'pdf'
                }
            ]
        }
    ];

    // User Purchases (simulated with localStorage)
    // In production, this would come from database
    function getUserPurchases() {
        const purchases = localStorage.getItem('userPurchases');
        return purchases ? JSON.parse(purchases) : [];
    }

    function addPurchase(guideId) {
        const purchases = getUserPurchases();
        if (!purchases.includes(guideId)) {
            purchases.push(guideId);
            localStorage.setItem('userPurchases', JSON.stringify(purchases));
        }
    }

    function hasAccess(guideId) {
        const purchases = getUserPurchases();
        return purchases.includes(guideId);
    }

    // For testing: Add first guide as purchased by default
    if (getUserPurchases().length === 0) {
        addPurchase(1); // User owns the first guide
    }

    // Check if user is already logged in
    checkAuthStatus();

    // Initialize guides grid
    renderGuides(guidesData);

    // Setup search and filters
    setupSearchAndFilters();

    // Setup navigation
    setupNavigation();

    // Update purchased count
    updatePurchasedCount();

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

        grid.innerHTML = guides.map(guide => {
            const userHas = hasAccess(guide.id);

            return `
            <div class="guide-card" data-category="${guide.category}">
                <div class="card-header">
                    <span class="card-rating">
                        <i class="fas fa-star"></i>
                        ${guide.rating.toFixed(1)}
                    </span>
                    <div class="card-image">
                        ${guide.image
                            ? `<img src="${guide.image}" alt="${guide.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas ${guide.icon}\\'></i>'">`
                            : `<i class="fas ${guide.icon}"></i>`
                        }
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
                        ${userHas ? `
                            <button class="guide-cta guide-access-btn" data-guide-id="${guide.id}">
                                <i class="fas fa-book-open"></i>
                                Acessar guia
                            </button>
                            <div class="guide-owned-badge">
                                <i class="fas fa-check-circle"></i>
                                Você já possui este guia
                            </div>
                        ` : `
                            <button class="guide-cta guide-buy-btn" data-checkout-url="${guide.checkoutUrl}" data-guide-id="${guide.id}">
                                <i class="fas fa-shopping-cart"></i>
                                Comprar guia - ${guide.price}
                            </button>
                        `}
                        <p class="guide-testimonial">${guide.testimonial}</p>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        // Add click events for Access buttons
        grid.querySelectorAll('.guide-access-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const guideId = parseInt(this.getAttribute('data-guide-id'));
                openGuideDetail(guideId);
            });
        });

        // Add click events for Buy buttons
        grid.querySelectorAll('.guide-buy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const checkoutUrl = this.getAttribute('data-checkout-url');
                window.open(checkoutUrl, '_blank');
            });
        });
    }

    // Update purchased count
    function updatePurchasedCount() {
        const totalGuidesEl = document.getElementById('totalGuides');
        const purchasedGuidesEl = document.getElementById('purchasedGuides');

        if (totalGuidesEl) totalGuidesEl.textContent = guidesData.length;
        if (purchasedGuidesEl) purchasedGuidesEl.textContent = getUserPurchases().length;
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

    // Navigation Functions
    function setupNavigation() {
        const backBtn = document.getElementById('backToLibrary');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                showLibraryView();
            });
        }
    }

    function showLibraryView() {
        document.getElementById('libraryView').style.display = 'block';
        document.getElementById('guideDetailView').style.display = 'none';
        document.querySelector('.search-filters').style.display = 'block';
        window.scrollTo(0, 0);
    }

    function showGuideDetailView() {
        document.getElementById('libraryView').style.display = 'none';
        document.getElementById('guideDetailView').style.display = 'block';
        document.querySelector('.search-filters').style.display = 'none';
        window.scrollTo(0, 0);
    }

    function openGuideDetail(guideId) {
        const guide = guidesData.find(g => g.id === guideId);

        if (!guide) {
            showNotification('Guia não encontrado', 'error');
            return;
        }

        // Check access
        if (!hasAccess(guideId)) {
            showNotification('Você precisa comprar este guia para acessá-lo', 'warning');
            setTimeout(() => {
                window.open(guide.checkoutUrl, '_blank');
            }, 1500);
            return;
        }

        // Populate guide detail page
        document.getElementById('guideDetailTitle').textContent = guide.title;
        document.getElementById('guideDetailSubtitle').textContent = guide.subtitle;

        // Render main guide download
        const mainDownload = document.getElementById('mainGuideDownload');
        if (guide.file) {
            mainDownload.innerHTML = `
                <div class="download-card">
                    <div class="download-info">
                        <div class="download-icon">
                            <i class="fas fa-file-pdf"></i>
                        </div>
                        <div class="download-text">
                            <h4>${guide.title} - PDF Completo</h4>
                            <p>Arquivo principal do guia</p>
                        </div>
                    </div>
                    <button class="btn-download-file" data-file="${guide.file}">
                        <i class="fas fa-download"></i>
                        Baixar PDF
                    </button>
                </div>
            `;

            // Add download event
            mainDownload.querySelector('.btn-download-file').addEventListener('click', function() {
                const file = this.getAttribute('data-file');
                downloadFile(file, guide.title);
            });
        } else {
            mainDownload.innerHTML = `
                <div class="empty-message">
                    <i class="fas fa-info-circle"></i>
                    <p>Guia principal ainda não disponível para download</p>
                </div>
            `;
        }

        // Render extras
        const extrasList = document.getElementById('guideExtrasList');
        if (guide.extras && guide.extras.length > 0) {
            extrasList.innerHTML = guide.extras.map(extra => `
                <div class="extra-item">
                    <div class="extra-info">
                        <div class="extra-icon">
                            <i class="fas ${extra.icon}"></i>
                        </div>
                        <div class="extra-text">
                            <h5>${extra.title}</h5>
                            <p>${extra.description}</p>
                        </div>
                    </div>
                    <button class="btn-download-extra" data-file="${extra.fileUrl}" data-title="${extra.title}">
                        <i class="fas fa-download"></i>
                        Download
                    </button>
                </div>
            `).join('');

            // Add download events
            extrasList.querySelectorAll('.btn-download-extra').forEach(btn => {
                btn.addEventListener('click', function() {
                    const file = this.getAttribute('data-file');
                    const title = this.getAttribute('data-title');
                    downloadFile(file, title);
                });
            });
        } else {
            extrasList.innerHTML = `
                <div class="empty-message">
                    <i class="fas fa-gift"></i>
                    <p>Nenhum extra disponível para este guia no momento</p>
                </div>
            `;
        }

        // Show detail view
        showGuideDetailView();
    }

    function downloadFile(filePath, fileName) {
        showNotification(`Preparando download: ${fileName}`, 'success');

        setTimeout(() => {
            const link = document.createElement('a');
            link.href = filePath;
            link.download = filePath.split('/').pop();
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showNotification(`Download iniciado com sucesso!`, 'success');
        }, 500);
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
