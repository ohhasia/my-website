const App = {
    currentUser: null,
    currentPage: 'home',
    
    // 初始化应用
    init() {
        console.log('农链通平台初始化...');
        this.renderHome();
        this.bindEvents();
        
        // 检查登录状态
        this.checkLoginStatus();
    },
    
    // 绑定事件
    bindEvents() {
        // 页面刷新时保持状态
        window.addEventListener('beforeunload', () => {
            if (this.currentUser) {
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
        });
        
        // 全局弹窗关闭事件委托
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close')) {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.remove();
                }
            }
            // 点击弹窗外部关闭
            if (e.target.classList.contains('modal')) {
                e.target.remove();
            }
        });
    },
    
    // 检查登录状态
    checkLoginStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUserDisplay();
        }
    },
    
    // 导航到指定页面
    navigateTo(page) {
        console.log('导航到:', page);
        this.currentPage = page;
        
        // 更新导航链接状态
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${page}`) {
                link.classList.add('active');
            }
        });
        
        // 渲染对应页面
        switch(page) {
            case 'home':
                this.renderHome();
                break;
            case 'wholesale':
                this.loadModule('wholesale', () => WholesaleModule.render());
                break;
            case 'market':
                this.loadModule('market', () => MarketModule.render());
                break;
            case 'training':
                this.loadModule('training', () => TrainingModule.render());
                break;
            case 'warehouse':
                this.loadModule('warehouse', () => WarehouseModule.render());
                break;
            case 'loan':
                this.loadModule('loan', () => LoanModule.render());
                break;
            default:
                this.renderHome();
        }
    },
    
    // 动态加载模块
    loadModule(moduleName, callback) {
        const moduleMap = {
            'wholesale': 'WholesaleModule',
            'market': 'MarketModule',
            'training': 'TrainingModule',
            'warehouse': 'WarehouseModule',
            'loan': 'LoanModule'
        };
        
        const moduleVar = moduleMap[moduleName];
        
        if (window[moduleVar]) {
            console.log(`${moduleVar} 已加载，直接渲染`);
            callback();
            return;
        }
        
        console.log(`正在加载 ${moduleName} 模块...`);
        
        // 显示加载提示
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="loading-page">
                <div class="loading-spinner">⏳</div>
                <p>正在加载 ${this.getModuleDisplayName(moduleName)}...</p>
            </div>
        `;
        
        // 动态加载模块脚本
        const script = document.createElement('script');
        script.src = `modules/${moduleName}.js`;
        script.onload = () => {
            console.log(`${moduleName} 模块加载成功`);
            callback();
        };
        script.onerror = () => {
            console.error(`${moduleName} 模块加载失败`);
            mainContent.innerHTML = `
                <div class="error-page">
                    <p>加载失败，请刷新页面重试</p>
                    <button class="btn btn-primary" onclick="App.navigateTo('${moduleName}')">重试</button>
                </div>
            `;
        };
        document.head.appendChild(script);
    },
    
    // 获取模块显示名称
    getModuleDisplayName(moduleName) {
        const nameMap = {
            'wholesale': '农产品批发',
            'market': '行情数据',
            'training': '交易培训',
            'warehouse': '仓单质押',
            'loan': '助贷服务'
        };
        return nameMap[moduleName] || moduleName;
    },
    
    // 渲染首页（商城样式）
    renderHome() {
        const mainContent = document.getElementById('mainContent');
        
        // 农产品数据
        const products = [
            { id: 1, name: '精品苹果礼盒', price: 288, originalPrice: 328, image: '🍎', category: '水果', sales: 1250, rating: 4.8, stock: 500 },
            { id: 2, name: '五常大米礼盒', price: 358, originalPrice: 398, image: '🍚', category: '粮油', sales: 890, rating: 4.9, stock: 300 },
            { id: 3, name: '有机蔬菜礼盒', price: 258, originalPrice: 288, image: '🥬', category: '蔬菜', sales: 670, rating: 4.7, stock: 400 },
            { id: 4, name: '土鸡蛋礼盒', price: 228, originalPrice: 258, image: '🥚', category: '禽蛋', sales: 1580, rating: 4.8, stock: 600 },
            { id: 5, name: '优质猪肉礼盒', price: 458, originalPrice: 498, image: '🥩', category: '肉类', sales: 430, rating: 4.9, stock: 200 },
            { id: 6, name: '野生蜂蜜礼盒', price: 388, originalPrice: 428, image: '🍯', category: '特产', sales: 720, rating: 4.8, stock: 250 },
            { id: 7, name: '精选海鲜礼盒', price: 488, originalPrice: 538, image: '🦐', category: '海鲜', sales: 380, rating: 4.7, stock: 150 },
            { id: 8, name: '坚果炒货礼盒', price: 328, originalPrice: 368, image: '🌰', category: '干货', sales: 950, rating: 4.8, stock: 350 },
            { id: 9, name: '茶叶礼盒', price: 428, originalPrice: 468, image: '🍵', category: '饮品', sales: 560, rating: 4.9, stock: 180 },
            { id: 10, name: '五谷杂粮礼盒', price: 268, originalPrice: 298, image: '🌾', category: '粮油', sales: 1120, rating: 4.7, stock: 450 },
            { id: 11, name: '进口水果礼盒', price: 468, originalPrice: 518, image: '🍇', category: '水果', sales: 320, rating: 4.8, stock: 120 },
            { id: 12, name: '有机山珍礼盒', price: 398, originalPrice: 438, image: '🍄', category: '干货', sales: 480, rating: 4.8, stock: 200 }
        ];
        
        mainContent.innerHTML = `
            <div class="home-page">
                <!-- 轮播图 -->
                <div class="carousel-section">
                    <div class="carousel-item active">
                        <div class="carousel-content">
                            <h2>新春特惠</h2>
                            <p>精选农产品礼盒，满300减50</p>
                            <button class="btn btn-primary" onclick="App.scrollToProducts()">立即抢购</button>
                        </div>
                        <div class="carousel-image">🎁</div>
                    </div>
                </div>

                <!-- 搜索栏 -->
                <div class="search-section">
                    <div class="search-container">
                        <input type="text" id="searchInput" class="search-input" placeholder="搜索农产品..." onkeyup="App.searchProducts(event)">
                        <button class="search-btn" onclick="App.searchProducts()">🔍</button>
                    </div>
                    <div class="search-categories">
                        <span class="category-tag active" onclick="App.filterProducts('all')">全部</span>
                        <span class="category-tag" onclick="App.filterProducts('水果')">水果</span>
                        <span class="category-tag" onclick="App.filterProducts('粮油')">粮油</span>
                        <span class="category-tag" onclick="App.filterProducts('蔬菜')">蔬菜</span>
                        <span class="category-tag" onclick="App.filterProducts('肉类')">肉类</span>
                        <span class="category-tag" onclick="App.filterProducts('特产')">特产</span>
                    </div>
                </div>

                <!-- 商品列表 -->
                <div class="products-section">
                    <div class="section-header">
                        <h2>热门推荐</h2>
                        <div class="sort-options">
                            <select id="sortSelect" onchange="App.sortProducts()">
                                <option value="default">默认排序</option>
                                <option value="price-asc">价格从低到高</option>
                                <option value="price-desc">价格从高到低</option>
                                <option value="sales">销量优先</option>
                                <option value="rating">评分优先</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="products-grid" id="productsGrid">
                        ${products.map(product => `
                            <div class="product-card" data-category="${product.category}" data-price="${product.price}" data-sales="${product.sales}" data-rating="${product.rating}">
                                <div class="product-image">${product.image}</div>
                                <div class="product-badge">热销</div>
                                <div class="product-info">
                                    <h3 class="product-name">${product.name}</h3>
                                    <div class="product-rating">
                                        ${this.generateStars(product.rating)}
                                        <span class="rating-number">${product.rating}</span>
                                    </div>
                                    <div class="product-price">
                                        <span class="current-price">¥${product.price}</span>
                                        <span class="original-price">¥${product.originalPrice}</span>
                                        <span class="discount">省${product.originalPrice - product.price}元</span>
                                    </div>
                                    <div class="product-sales">
                                        已售${product.sales}件
                                    </div>
                                    <div class="product-actions">
                                        <button class="btn-cart" onclick="App.addToCart(${product.id})">🛒 加入购物车</button>
                                        <button class="btn-buy" onclick="App.buyNow(${product.id})">立即购买</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 功能模块入口 -->
                <div class="features-section">
                    <h2 class="section-title">更多服务</h2>
                    <div class="feature-grid">
                        <div class="feature-card" onclick="App.navigateTo('wholesale')">
                            <div class="feature-icon">📦</div>
                            <h3>农产品批发</h3>
                            <p>发布供应/需求信息，快速匹配交易</p>
                        </div>
                        <div class="feature-card" onclick="App.navigateTo('market')">
                            <div class="feature-icon">📊</div>
                            <h3>行情数据</h3>
                            <p>实时价格走势，专业数据分析</p>
                        </div>
                        <div class="feature-card" onclick="App.navigateTo('training')">
                            <div class="feature-icon">📚</div>
                            <h3>交易培训</h3>
                            <p>精品课程，提升专业技能</p>
                        </div>
                        <div class="feature-card" onclick="App.navigateTo('warehouse')">
                            <div class="feature-icon">🏭</div>
                            <h3>仓单质押</h3>
                            <p>仓单质押融资，盘活库存资产</p>
                        </div>
                        <div class="feature-card" onclick="App.navigateTo('loan')">
                            <div class="feature-icon">💰</div>
                            <h3>助贷服务</h3>
                            <p>智能评估，快速获取资金</p>
                        </div>
                        <div class="feature-card" onclick="App.showLoginModal()">
                            <div class="feature-icon">👥</div>
                            <h3>用户中心</h3>
                            <p>管理个人信息，查看交易记录</p>
                        </div>
                    </div>
                </div>

                <!-- 品牌推荐 -->
                <div class="brands-section">
                    <h2 class="section-title">合作品牌</h2>
                    <div class="brands-grid">
                        <div class="brand-item">🌾 有机农场</div>
                        <div class="brand-item">🍎 水果之乡</div>
                        <div class="brand-item">🥩 绿色牧场</div>
                        <div class="brand-item">🥚 生态养殖</div>
                        <div class="brand-item">🍯 蜂产品基地</div>
                        <div class="brand-item">🍵 茶叶产区</div>
                    </div>
                </div>
            </div>
        `;
        
        // 保存商品数据
        this.productsData = products;
    },
    
    // 生成星级评分
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) stars += '⭐';
        if (halfStar) stars += '⭐';
        for (let i = 0; i < emptyStars; i++) stars += '☆';
        
        return stars;
    },
    
    // 滚动到商品列表
    scrollToProducts() {
        document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
    },
    
    // 搜索商品
    searchProducts(event) {
        if (event && event.key !== 'Enter') return;
        const keyword = document.getElementById('searchInput').value.toLowerCase();
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const name = product.querySelector('.product-name').textContent.toLowerCase();
            if (keyword === '' || name.includes(keyword)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    },
    
    // 筛选商品
    filterProducts(category) {
        const tags = document.querySelectorAll('.category-tag');
        tags.forEach(tag => tag.classList.remove('active'));
        event.target.classList.add('active');
        
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    },
    
    // 排序商品
    sortProducts() {
        const sortBy = document.getElementById('sortSelect').value;
        const grid = document.getElementById('productsGrid');
        const products = Array.from(grid.querySelectorAll('.product-card'));
        
        products.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                case 'price-desc':
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                case 'sales':
                    return parseInt(b.dataset.sales) - parseInt(a.dataset.sales);
                case 'rating':
                    return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
                default:
                    return 0;
            }
        });
        
        products.forEach(product => grid.appendChild(product));
    },
    
    // 加入购物车
    addToCart(productId) {
        const product = this.productsData.find(p => p.id === productId);
        if (!product) return;
        
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('已加入购物车！');
    },
    
    // 立即购买
    buyNow(productId) {
        const product = this.productsData.find(p => p.id === productId);
        if (!product) return;
        
        if (AuthModule.requireAuth()) {
            alert(`正在跳转到结算页面...\n商品：${product.name}\n价格：¥${product.price}`);
        }
    },
    
    // 保存商品数据
    productsData: [],
    
    // 显示登录模态框
    showLoginModal() {
        document.getElementById('loginModal').classList.remove('hidden');
    },
    
    // 关闭登录模态框
    closeLoginModal() {
        document.getElementById('loginModal').classList.add('hidden');
        document.getElementById('loginForm').reset();
    },
    
    // 处理登录
    handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const userType = formData.get('userType');
        
        // 简单的登录验证（演示用）
        if (username && password) {
            this.currentUser = {
                username: username,
                userType: userType,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateUserDisplay();
            this.closeLoginModal();
            
            // 显示欢迎消息
            const userTypeText = {
                farmer: '农户',
                wholesaler: '批发商',
                financial: '金融机构',
                admin: '管理员'
            };
            
            alert(`欢迎回来，${username}（${userTypeText[userType]}）！`);
        } else {
            alert('请输入用户名和密码！');
        }
    },
    
    // 更新用户显示
    updateUserDisplay() {
        const userMenu = document.getElementById('userMenu');
        const userTypeText = {
            farmer: '农户',
            wholesaler: '批发商',
            financial: '金融机构',
            admin: '管理员'
        };
        
        if (this.currentUser) {
            userMenu.innerHTML = `
                <div class="user-info">
                    <span class="user-avatar">👤</span>
                    <span class="user-name">${this.currentUser.username}</span>
                    <span class="user-type">${userTypeText[this.currentUser.userType]}</span>
                </div>
                <button class="btn btn-secondary" onclick="App.logout()">退出</button>
            `;
            
            // 添加样式
            const style = document.createElement('style');
            style.textContent = `
                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255,255,255,0.1);
                    padding: 8px 16px;
                    border-radius: 20px;
                }
                .user-avatar {
                    font-size: 1.2rem;
                }
                .user-name {
                    font-weight: 600;
                }
                .user-type {
                    font-size: 0.85rem;
                    opacity: 0.8;
                }
            `;
            document.head.appendChild(style);
        }
    },
    
    // 退出登录
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        
        const userMenu = document.getElementById('userMenu');
        userMenu.innerHTML = `
            <span class="user-role">游客</span>
            <button class="btn-login" id="loginBtn" onclick="App.showLoginModal()">登录</button>
        `;
        
        alert('已退出登录！');
    }
};

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    App.init();
});
