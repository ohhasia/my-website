const WholesaleModule = {
 data: [
 { id: 1, type: 'supply', product: '精品苹果', spec: '5kg/�?, price: 85, quantity: 100, unit: '�?, origin: '山东烟台', supplier: '烟台苹果合作�?, contact: '13800138001', category: '水果', publishDate: '2024-01-15', status: 'active', views: 1250 },
 { id: 2, type: 'supply', product: '五常大米', spec: '5kg/�?, price: 82, quantity: 500, unit: '�?, origin: '黑龙江五�?, supplier: '五常米业集团', contact: '13800138002', category: '粮油', publishDate: '2024-01-14', status: 'active', views: 2100 },
 { id: 3, type: 'demand', product: '有机蔬菜组合', spec: '3kg/�?, price: 65, quantity: 200, unit: '�?, origin: '山东寿光', supplier: '寿光蔬菜合作�?, contact: '13800138003', category: '蔬菜', publishDate: '2024-01-13', status: 'active', views: 890 },
 { id: 4, type: 'supply', product: '土鸡�?, spec: '30�?�?, price: 55, quantity: 1000, unit: '�?, origin: '河北邯郸', supplier: '邯郸禽蛋公司', contact: '13800138004', category: '禽蛋', publishDate: '2024-01-12', status: 'active', views: 3400 },
 { id: 5, type: 'demand', product: '野生蜂蜜', spec: '500g/�?, price: 120, quantity: 150, unit: '�?, origin: '云南西双版纳', supplier: '云南蜂业公司', contact: '13800138005', category: '副食', publishDate: '2024-01-11', status: 'active', views: 670 },
 { id: 6, type: 'supply', product: '新疆红枣', spec: '2kg/�?, price: 95, quantity: 300, unit: '�?, origin: '新疆和田', supplier: '新疆红枣合作�?, contact: '13800138006', category: '干货', publishDate: '2024-01-10', status: 'active', views: 1580 },
 { id: 7, type: 'supply', product: '散养土鸡', spec: '�?.5kg/�?, price: 160, quantity: 200, unit: '�?, origin: '安徽黄山', supplier: '黄山养殖合作�?, contact: '13800138007', category: '肉类', publishDate: '2024-01-09', status: 'active', views: 920 },
 { id: 8, type: 'demand', product: '优质面粉', spec: '10kg/�?, price: 45, quantity: 400, unit: '�?, origin: '河南郑州', supplier: '郑州面粉�?, contact: '13800138008', category: '粮油', publishDate: '2024-01-08', status: 'active', views: 1750 }
 ],
 categories: ['全部', '水果', '粮油', '蔬菜', '禽蛋', '肉类', '副食', '干货'],
 
 render() {
 const mainContent = document.getElementById('mainContent');
 mainContent.innerHTML = `
 <div class="wholesale-page">
 <div class="page-header">
 <h1>农产品批�?📦</h1>
 <button class="btn btn-primary" onclick="WholesaleModule.showPublishModal()">发布信息</button>
 </div>
 
 <div class="page-toolbar">
 <div class="filter-section">
 <select id="wholesaleType" onchange="WholesaleModule.filter()">
 <option value="all">全部类型</option>
 <option value="supply">供应信息</option>
 <option value="demand">求购信息</option>
 </select>
 
 <select id="wholesaleCategory" onchange="WholesaleModule.filter()">
 ${this.categories.map(cat => `<option value="${cat === '全部' ? 'all' : cat}">${cat}</option>`).join('')}
 </select>
 
 <input type="text" id="wholesaleSearch" placeholder="搜索商品名称..." oninput="WholesaleModule.filter()">
 </div>
 
 <div class="view-toggle">
 <button class="view-btn active" data-view="list" onclick="WholesaleModule.switchView('list')">列表视图</button>
 <button class="view-btn" data-view="card" onclick="WholesaleModule.switchView('card')">卡片视图</button>
 </div>
 </div>
 
 <div id="wholesaleList" class="wholesale-list list-view">
 ${this.renderList(this.data)}
 </div>
 </div>
 `;
 
 this.addStyles();
 },
 
 renderList(data) {
 if (data.length === 0) {
 return '<div class="empty-state"><p>暂无数据</p></div>';
 }
 
 return data.map(item => `
 <div class="wholesale-item">
 <div class="item-header">
 <span class="item-type ${item.type}">${item.type === 'supply' ? '供应' : '求购'}</span>
 <span class="item-status ${item.status}">${item.status === 'active' ? '进行�? : '已结�?}</span>
 </div>
 
 <div class="item-body">
 <h3>${item.product}</h3>
 <div class="item-info">
 <span>规格�?{item.spec}</span>
 <span>数量�?{item.quantity} ${item.unit}</span>
 <span>产地�?{item.origin}</span>
 <span>供应商：${item.supplier}</span>
 </div>
 
 <div class="item-price">
 <span class="price-label">价格�?/span>
 <span class="price-value">¥${item.price}/${item.unit}</span>
 </div>
 
 <div class="item-meta">
 <span>📅 ${item.publishDate}</span>
 <span>👁 ${item.views}次浏�?/span>
 </div>
 </div>
 
 <div class="item-actions">
 <button class="btn btn-secondary" onclick="WholesaleModule.contactSupplier(${item.id})">联系供应�?/button>
 <button class="btn btn-primary" onclick="WholesaleModule.viewDetail(${item.id})">查看详情</button>
 </div>
 </div>
 `).join('');
 },
 
 filter() {
 const type = document.getElementById('wholesaleType').value;
 const category = document.getElementById('wholesaleCategory').value;
 const search = document.getElementById('wholesaleSearch').value.toLowerCase();
 
 let filtered = this.data;
 
 if (type !== 'all') {
 filtered = filtered.filter(item => item.type === type);
 }
 
 if (category !== 'all') {
 filtered = filtered.filter(item => item.category === category);
 }
 
 if (search) {
 filtered = filtered.filter(item => item.product.toLowerCase().includes(search));
 }
 
 document.getElementById('wholesaleList').innerHTML = this.renderList(filtered);
 },
 
 switchView(view) {
 const listContainer = document.getElementById('wholesaleList');
 const viewBtns = document.querySelectorAll('.view-btn');
 
 viewBtns.forEach(btn => btn.classList.remove('active'));
 event.target.classList.add('active');
 
 if (view === 'list') {
 listContainer.classList.remove('card-view');
 listContainer.classList.add('list-view');
 } else {
 listContainer.classList.remove('list-view');
 listContainer.classList.add('card-view');
 }
 },
 
 showPublishModal() {
 const modal = document.createElement('div');
 modal.className = 'modal';
 modal.innerHTML = `
 <div class="modal-content">
 <div class="modal-header">
 <h2>发布批发信息</h2>
 <button class="modal-close">×</button>
 </div>
 <div class="modal-body">
 <form id="publishForm" onsubmit="WholesaleModule.handlePublish(event, this)">
 <div class="form-group">
 <label>信息类型 *</label>
 <select name="type" required>
 <option value="supply">供应</option>
 <option value="demand">求购</option>
 </select>
 </div>
 
 <div class="form-group">
 <label>商品名称 *</label>
 <input type="text" name="product" required placeholder="如：精品苹果">
 </div>
 
 <div class="form-group">
 <label>规格 *</label>
 <input type="text" name="spec" required placeholder="如：5kg/�?>
 </div>
 
 <div class="form-group">
 <label>数量 *</label>
 <input type="number" name="quantity" required min="1">
 </div>
 
 <div class="form-group">
 <label>单位 *</label>
 <input type="text" name="unit" required placeholder="如：箱、袋、公�?>
 </div>
 
 <div class="form-group">
 <label>价格(�? *</label>
 <input type="number" name="price" required min="0" step="0.01">
 </div>
 
 <div class="form-group">
 <label>产地 *</label>
 <input type="text" name="origin" required placeholder="如：山东烟台">
 </div>
 
 <div class="form-group">
 <label>供应�?*</label>
 <input type="text" name="supplier" required placeholder="请输入供应商名称">
 </div>
 
 <div class="form-group">
 <label>联系方式 *</label>
 <input type="text" name="contact" required placeholder="如：13800138000">
 </div>
 
 <div class="form-group">
 <label>分类 *</label>
 <select name="category" required>
 ${this.categories.filter(cat => cat !== '全部').map(cat => `<option value="${cat}">${cat}</option>`).join('')}
 </select>
 </div>
 
 <button type="submit" class="btn btn-primary btn-block">发布信息</button>
 </form>
 </div>
 </div>
 `;
 document.body.appendChild(modal);
 },
 
 handlePublish(event, form) {
 event.preventDefault();
 const formData = new FormData(form);
 const data = Object.fromEntries(formData);
 
 data.id = this.data.length + 1;
 data.publishDate = new Date().toISOString().split('T')[0];
 data.status = 'active';
 data.views = 0;
 
 this.data.unshift(data);
 
 // 关闭模态框
 document.querySelector('.modal').remove();
 
 // 重新渲染
 this.render();
 
 alert('发布成功！您的信息已上架展示�?);
 },
 
 contactSupplier(id) {
 const item = this.data.find(item => item.id === id);
 if (item) {
 alert(`联系方式：\n\n供应商：${item.supplier}\n电话�?{item.contact}\n\n提示：您可以直接拨打上述电话联系供应商`);
 }
 },
 
 viewDetail(id) {
 const item = this.data.find(item => item.id === id);
 if (!item) return;
 
 const modal = document.createElement('div');
 modal.className = 'modal';
 modal.innerHTML = `
 <div class="modal-content detail-modal">
 <div class="modal-header">
 <h2>${item.product} - 详情</h2>
 <button class="modal-close">×</button>
 </div>
 <div class="modal-body">
 <div class="detail-section">
 <h3>基本信息</h3>
 <div class="detail-grid">
 <div class="detail-item">
 <span class="detail-label">信息类型�?/span>
 <span class="detail-value">${item.type === 'supply' ? '供应' : '求购'}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">商品名称�?/span>
 <span class="detail-value">${item.product}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">规格�?/span>
 <span class="detail-value">${item.spec}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">数量�?/span>
 <span class="detail-value">${item.quantity} ${item.unit}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">产地�?/span>
 <span class="detail-value">${item.origin}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">分类�?/span>
 <span class="detail-value">${item.category}</span>
 </div>
 </div>
 </div>
 
 <div class="detail-section">
 <h3>价格信息</h3>
 <div class="price-display">
 <span class="price-big">¥${item.price}</span>
 <span class="price-unit">/${item.unit}</span>
 </div>
 </div>
 
 <div class="detail-section">
 <h3>供应商信�?/h3>
 <div class="detail-grid">
 <div class="detail-item">
 <span class="detail-label">供应商名称：</span>
 <span class="detail-value">${item.supplier}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">联系方式�?/span>
 <span class="detail-value">${item.contact}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">发布时间�?/span>
 <span class="detail-value">${item.publishDate}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">浏览次数�?/span>
 <span class="detail-value">${item.views}�?/span>
 </div>
 </div>
 </div>
 
 <div class="detail-actions">
 <button class="btn btn-secondary" onclick="WholesaleModule.contactSupplier(${item.id})">联系供应�?/button>
 <button class="btn btn-primary" >关闭</button>
 </div>
 </div>
 </div>
 `;
 document.body.appendChild(modal);
 },
 
 addStyles() {
 const style = document.createElement('style');
 style.textContent = `
 .wholesale-page {
 animation: fadeIn 0.5s ease;
 }
 
 .page-header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 30px;
 }
 
 .page-header h1 {
 font-size: 2rem;
 color: #333;
 }
 
 .page-toolbar {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 25px;
 flex-wrap: wrap;
 gap: 15px;
 }
 
 .filter-section {
 display: flex;
 gap: 12px;
 flex-wrap: wrap;
 }
 
 .filter-section select,
 .filter-section input {
 padding: 10px 16px;
 border: 2px solid #e8e8e8;
 border-radius: 8px;
 font-size: 0.95rem;
 min-width: 120px;
 transition: all 0.3s;
 }
 
 .filter-section select:focus,
 .filter-section input:focus {
 outline: none;
 border-color: #667eea;
 }
 
 .view-toggle {
 display: flex;
 gap: 8px;
 }
 
 .view-btn {
 padding: 8px 16px;
 border: 2px solid #e8e8e8;
 background: white;
 border-radius: 6px;
 cursor: pointer;
 transition: all 0.3s;
 }
 
 .view-btn.active {
 background: #667eea;
 color: white;
 border-color: #667eea;
 }
 
 .wholesale-list {
 display: grid;
 gap: 20px;
 }
 
 .wholesale-list.list-view {
 grid-template-columns: 1fr;
 }
 
 .wholesale-list.card-view {
 grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
 }
 
 .wholesale-item {
 background: white;
 border-radius: 12px;
 padding: 25px;
 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 transition: all 0.3s ease;
 }
 
 .wholesale-item:hover {
 box-shadow: 0 8px 24px rgba(0,0,0,0.15);
 }
 
 .item-header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 15px;
 }
 
 .item-type {
 padding: 6px 14px;
 border-radius: 20px;
 font-size: 0.85rem;
 font-weight: 600;
 }
 
 .item-type.supply {
 background: #e6f7ff;
 color: #1890ff;
 }
 
 .item-type.demand {
 background: #fff7e6;
 color: #fa8c16;
 }
 
 .item-status {
 padding: 4px 10px;
 border-radius: 4px;
 font-size: 0.8rem;
 }
 
 .item-status.active {
 background: #f6ffed;
 color: #52c41a;
 }
 
 .item-body h3 {
 font-size: 1.4rem;
 margin-bottom: 12px;
 color: #333;
 }
 
 .item-info {
 display: flex;
 flex-wrap: wrap;
 gap: 15px;
 margin-bottom: 15px;
 font-size: 0.95rem;
 color: #666;
 }
 
 .item-price {
 margin-bottom: 15px;
 }
 
 .price-label {
 color: #666;
 margin-right: 8px;
 }
 
 .price-value {
 font-size: 1.5rem;
 font-weight: bold;
 color: #ff4d4f;
 }
 
 .item-meta {
 display: flex;
 gap: 20px;
 font-size: 0.9rem;
 color: #999;
 margin-bottom: 20px;
 }
 
 .item-actions {
 display: flex;
 gap: 12px;
 padding-top: 20px;
 border-top: 1px solid #f0f0f0;
 }
 
 .empty-state {
 text-align: center;
 padding: 60px 20px;
 color: #999;
 }
 
 .detail-modal {
 max-width: 700px;
 }
 
 .detail-section {
 margin-bottom: 25px;
 }
 
 .detail-section h3 {
 font-size: 1.2rem;
 color: #333;
 margin-bottom: 15px;
 padding-bottom: 10px;
 border-bottom: 2px solid #f0f0f0;
 }
 
 .detail-grid {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
 gap: 15px;
 }
 
 .detail-item {
 display: flex;
 justify-content: space-between;
 padding: 10px 0;
 }
 
 .detail-label {
 color: #666;
 }
 
 .detail-value {
 color: #333;
 font-weight: 500;
 }
 
 .price-display {
 display: flex;
 align-items: baseline;
 gap: 8px;
 padding: 20px;
 background: #fff7e6;
 border-radius: 12px;
 }
 
 .price-big {
 font-size: 3rem;
 font-weight: bold;
 color: #ff4d4f;
 }
 
 .price-unit {
 font-size: 1.2rem;
 color: #666;
 }
 
 .detail-actions {
 display: flex;
 gap: 12px;
 justify-content: center;
 margin-top: 30px;
 padding-top: 20px;
 border-top: 1px solid #f0f0f0;
 }
 
 @media (max-width: 768px) {
 .page-header {
 flex-direction: column;
 align-items: flex-start;
 gap: 15px;
 }
 
 .page-toolbar {
 flex-direction: column;
 align-items: flex-start;
 }
 
 .filter-section {
 width: 100%;
 }
 
 .filter-section select,
 .filter-section input {
 flex: 1;
 min-width: 0;
 }
 
 .wholesale-list.card-view {
 grid-template-columns: 1fr;
 }
 
 .item-actions {
 flex-direction: column;
 }
 }
 `;
 document.head.appendChild(style);
 }
};

