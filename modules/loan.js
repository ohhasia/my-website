const LoanModule = {
 products: [
 { id: 1, name: '农易贷', type: '信用贷', maxAmount: 500000, minRate: 0.065, maxTerm: 365, description: '专为农户设计的信用贷款，手续简便，快速到账', requirements: ['农户身份认证', '有稳定经营收入', '信用记录良好'], icon: '🌾' },
 { id: 2, name: '商通贷', type: '经营贷', maxAmount: 2000000, minRate: 0.058, maxTerm: 730, description: '支持农产品批发商扩大经营，额度高，期限灵活', requirements: ['企业营业执照', '近6个月经营流水', '资产证明'], icon: '🏢' },
 { id: 3, name: '供应链贷', type: '供应链', maxAmount: 10000000, minRate: 0.052, maxTerm: 365, description: '基于供应链核心企业信用，为上下游企业提供融资', requirements: ['核心企业推荐', '真实交易背景', '应收账款质押'], icon: '🔗' }
 ],
 applications: [
 { id: 1, product: '农易贷', amount: 200000, term: 180, status: 'pending', applyDate: '2024-01-15', progress: '资料审核中' },
 { id: 2, product: '商通贷', amount: 500000, term: 365, status: 'approved', applyDate: '2024-01-10', approveDate: '2024-01-12', progress: '已放款' },
 { id: 3, product: '供应链贷', amount: 2000000, term: 365, status: 'rejected', applyDate: '2024-01-08', rejectReason: '交易背景不清晰', progress: '审核未通过' }
 ],
 
 render() {
 const mainContent = document.getElementById('mainContent');
 mainContent.innerHTML = `
 <div class="loan-page">
 <div class="page-header">
 <h1>助贷服务 💰</h1>
 <p class="page-subtitle">智能匹配金融产品，解决您的资金需求</p>
 </div>
 
 <div class="products-section">
 <h2>贷款产品</h2>
 <div class="products-grid">
 ${this.products.map(product => `
 <div class="product-card">
 <div class="product-icon">${product.icon}</div>
 <div class="product-info">
 <h3>${product.name}</h3>
 <span class="product-type">${product.type}</span>
 <p class="product-desc">${product.description}</p>
 
 <div class="product-terms">
 <div class="term-item">
 <span class="term-label">最高额度</span>
 <span class="term-value">¥${(product.maxAmount / 10000).toFixed(0)}万</span>
 </div>
 <div class="term-item">
 <span class="term-label">最低利率</span>
 <span class="term-value">${(product.minRate * 100).toFixed(2)}%</span>
 </div>
 <div class="term-item">
 <span class="term-label">最长期限</span>
 <span class="term-value">${product.maxTerm}天</span>
 </div>
 </div>
 
 <div class="product-requirements">
 <h4>申请条件</h4>
 <ul>
 ${product.requirements.map(req => `<li>${req}</li>`).join('')}
 </ul>
 </div>
 
 <button class="btn btn-primary btn-block" onclick="LoanModule.showApplyModal(${product.id})">立即申请</button>
 </div>
 </div>
 `).join('')}
 </div>
 </div>
 
 <div class="applications-section">
 <div class="section-header">
 <h2>我的申请</h2>
 <button class="btn btn-secondary" onclick="LoanModule.showHistory()">查看历史</button>
 </div>
 
 <div class="applications-list">
 ${this.applications.length > 0 ? this.applications.map(app => `
 <div class="application-item">
 <div class="app-header">
 <h3>${app.product}</h3>
 <span class="app-status ${app.status}">${this.getStatusText(app.status)}</span>
 </div>
 
 <div class="app-body">
 <div class="app-info">
 <span>申请金额：¥${(app.amount / 10000).toFixed(2)}万</span>
 <span>贷款期限：${app.term}天</span>
 <span>申请日期：${app.applyDate}</span>
 </div>
 
 <div class="app-progress">
 <div class="progress-bar">
 <div class="progress-fill ${app.status}" style="width: ${this.getProgressWidth(app.status)}"></div>
 </div>
 <span class="progress-text">${app.progress}</span>
 </div>
 
 <div class="app-actions">
 ${app.status === 'pending' ? `<button class="btn btn-secondary" onclick="LoanModule.cancelApplication(${app.id})">撤销申请</button>` : ''}
 <button class="btn btn-primary" onclick="LoanModule.viewApplication(${app.id})">查看详情</button>
 </div>
 </div>
 </div>
 `).join('') : '<div class="empty-state"><p>暂无贷款申请记录</p></div>'}
 </div>
 </div>
 
 <div class="credit-calculator">
 <h2>智能信用评估</h2>
 <div class="calculator-content">
 <div class="calculator-form">
 <h3>计算您的可贷额度</h3>
 <form id="creditForm" onsubmit="LoanModule.calculateCredit(event)">
 <div class="form-row">
 <div class="form-group">
 <label>年经营收入(万元)</label>
 <input type="number" name="income" required min="1" placeholder="请输入">
 </div>
 <div class="form-group">
 <label>资产总额(万元)</label>
 <input type="number" name="assets" required min="1" placeholder="请输入">
 </div>
 </div>
 <div class="form-row">
 <div class="form-group">
 <label>负债总额(万元)</label>
 <input type="number" name="liabilities" required min="0" placeholder="请输入">
 </div>
 <div class="form-group">
 <label>经营年限(年)</label>
 <input type="number" name="years" required min="1" max="50" placeholder="请输入">
 </div>
 </div>
 <button type="submit" class="btn btn-primary btn-block">立即评估</button>
 </form>
 </div>
 
 <div class="calculator-result" id="creditResult" style="display: none;">
 <h3>评估结果</h3>
 <div class="result-content" id="resultContent"></div>
 </div>
 </div>
 </div>
 </div>
 `;
 
 this.addStyles();
 },
 
 getStatusText(status) {
 const texts = {
 pending: '审核中',
 approved: '已通过',
 rejected: '已拒绝'
 };
 return texts[status];
 },
 
 getProgressWidth(status) {
 const widths = {
 pending: '50%',
 approved: '100%',
 rejected: '0%'
 };
 return widths[status];
 },
 
 showApplyModal(productId) {
 const product = this.products.find(p => p.id === productId);
 if (!product) return;
 
 const modal = document.createElement('div');
 modal.className = 'modal';
 modal.innerHTML = `
 <div class="modal-content">
 <div class="modal-header">
 <h2>申请${product.name}</h2>
 <button class="modal-close" onclick="modal.remove()">×</button>
 </div>
 <div class="modal-body">
 <div class="product-summary">
 <h3>产品信息</h3>
 <div class="summary-grid">
 <span>最高额度：¥${(product.maxAmount / 10000).toFixed(0)}万</span>
 <span>最低利率：${(product.minRate * 100).toFixed(2)}%</span>
 <span>最长期限：${product.maxTerm}天</span>
 </div>
 </div>
 
 <form id="loanForm" onsubmit="LoanModule.handleApply(event, ${productId})">
 <div class="form-group">
 <label>申请金额(元) *</label>
 <input type="number" name="amount" required min="10000" max="${product.maxAmount}" placeholder="请输入申请金额">
 </div>
 
 <div class="form-group">
 <label>贷款期限(天) *</label>
 <input type="number" name="term" required min="30" max="${product.maxTerm}" placeholder="请输入贷款期限">
 </div>
 
 <div class="form-group">
 <label>贷款用途 *</label>
 <select name="purpose" required>
 <option value="">请选择用途</option>
 <option value="采购">采购货物</option>
 <option value="扩建">扩建生产</option>
 <option value="周转">资金周转</option>
 <option value="其他">其他用途</option>
 </select>
 </div>
 
 <div class="form-group">
 <label>联系人 *</label>
 <input type="text" name="contactName" required placeholder="请输入联系人姓名">
 </div>
 
 <div class="form-group">
 <label>联系电话 *</label>
 <input type="tel" name="contactPhone" required placeholder="请输入联系电话">
 </div>
 
 <div class="form-group">
 <label>上传资料</label>
 <input type="file" name="documents" multiple accept=".pdf,.jpg,.png">
 <p class="form-tip">请上传身份证、营业执照、银行流水等相关证明材料</p>
 </div>
 
 <button type="submit" class="btn btn-primary btn-block">提交申请</button>
 </form>
 </div>
 </div>
 `;
 document.body.appendChild(modal);
 },
 
 handleApply(event, productId) {
 event.preventDefault();
 const formData = new FormData(event.target);
 const data = Object.fromEntries(formData);
 const product = this.products.find(p => p.id === productId);
 
 this.applications.unshift({
 id: this.applications.length + 1,
 product: product.name,
 amount: parseInt(data.amount),
 term: parseInt(data.term),
 status: 'pending',
 applyDate: new Date().toISOString().split('T')[0],
 progress: '资料审核中'
 });
 
 document.querySelector('.modal').remove();
 this.render();
 alert('贷款申请已提交！我们将在3个工作日内与您联系。');
 },
 
 cancelApplication(id) {
 if (confirm('确定要撤销此贷款申请吗？')) {
 const app = this.applications.find(a => a.id === id);
 if (app) {
 app.status = 'cancelled';
 app.progress = '已撤销';
 this.render();
 alert('已撤销贷款申请！');
 }
 }
 },
 
 viewApplication(id) {
 const app = this.applications.find(a => a.id === id);
 if (!app) return;
 
 const modal = document.createElement('div');
 modal.className = 'modal';
 modal.innerHTML = `
 <div class="modal-content detail-modal">
 <div class="modal-header">
 <h2>贷款申请详情</h2>
 <button class="modal-close" onclick="modal.remove()">×</button>
 </div>
 <div class="modal-body">
 <div class="detail-grid">
 <div class="detail-item">
 <span class="detail-label">贷款产品：</span>
 <span class="detail-value">${app.product}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">申请状态：</span>
 <span class="detail-value status-${app.status}">${this.getStatusText(app.status)}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">申请金额：</span>
 <span class="detail-value">¥${(app.amount / 10000).toFixed(2)}万</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">贷款期限：</span>
 <span class="detail-value">${app.term}天</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">申请日期：</span>
 <span class="detail-value">${app.applyDate}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">当前进度：</span>
 <span class="detail-value">${app.progress}</span>
 </div>
 </div>
 
 ${app.status === 'approved' ? `
 <div class="loan-approval">
 <h3>审批结果</h3>
 <div class="approval-info">
 <p><strong>审批通过日期：</strong>${app.approveDate}</p>
 <p><strong>预计放款日期：</strong>3个工作日内</p>
 <p><strong>温馨提示：</strong>请保持手机畅通，银行客户经理将与您联系</p>
 </div>
 </div>
 ` : ''}
 
 ${app.status === 'rejected' ? `
 <div class="loan-rejection">
 <h3>审批结果</h3>
 <div class="rejection-info">
 <p><strong>拒绝原因：</strong>${app.rejectReason}</p>
 <p><strong>建议：</strong>请完善相关材料后重新提交申请</p>
 </div>
 </div>
 ` : ''}
 
 <button class="btn btn-primary btn-block" onclick="modal.remove()">关闭</button>
 </div>
 </div>
 `;
 document.body.appendChild(modal);
 },
 
 showHistory() {
 alert('历史记录功能开发中...');
 },
 
 calculateCredit(event) {
 event.preventDefault();
 const formData = new FormData(event.target);
 const income = parseFloat(formData.get('income'));
 const assets = parseFloat(formData.get('assets'));
 const liabilities = parseFloat(formData.get('liabilities'));
 const years = parseFloat(formData.get('years'));
 
 const creditScore = Math.min(950, Math.max(300, 
 income * 2 + assets * 0.5 - liabilities * 0.8 + years * 30
 ));
 
 const maxLoan = Math.min(500, income * 3 + assets * 0.3 - liabilities * 0.5);
 
 const resultContent = document.getElementById('resultContent');
 resultContent.innerHTML = `
 <div class="score-display">
 <span class="score-label">信用评分</span>
 <span class="score-value">${creditScore.toFixed(0)}</span>
 <span class="score-level">${this.getCreditLevel(creditScore)}</span>
 </div>
 
 <div class="loan-estimate">
 <div class="estimate-item">
 <span class="estimate-label">可贷额度</span>
 <span class="estimate-value">¥${maxLoan.toFixed(0)}万</span>
 </div>
 <div class="estimate-item">
 <span class="estimate-label">建议利率</span>
 <span class="estimate-value">${this.getSuggestedRate(creditScore)}</span>
 </div>
 <div class="estimate-item">
 <span class="estimate-label">建议期限</span>
 <span class="estimate-value">${this.getSuggestedTerm(years)}天</span>
 </div>
 </div>
 
 <div class="recommendations">
 <h4>推荐产品</h4>
 <ul>
 ${this.getRecommendations(creditScore, maxLoan)}
 </ul>
 </div>
 `;
 
 document.getElementById('creditResult').style.display = 'block';
 },
 
 getCreditLevel(score) {
 if (score >= 800) return '优秀';
 if (score >= 700) return '良好';
 if (score >= 600) return '中等';
 if (score >= 500) return '一般';
 return '较差';
 },
 
 getSuggestedRate(score) {
 if (score >= 800) return '4.5% - 5.5%';
 if (score >= 700) return '5.5% - 6.5%';
 if (score >= 600) return '6.5% - 7.5%';
 return '7.5%以上';
 },
 
 getSuggestedTerm(years) {
 if (years >= 5) return '365 - 730';
 if (years >= 3) return '180 - 365';
 return '90 - 180';
 },
 
 getRecommendations(score, maxLoan) {
 const recs = [];
 if (maxLoan <= 50) recs.push('<li>农易贷 - 适合小额资金需求</li>');
 if (maxLoan > 50 && maxLoan <= 200) recs.push('<li>商通贷 - 适合中小企业经营</li>');
 if (maxLoan > 200) recs.push('<li>供应链贷 - 适合大型企业融资</li>');
 return recs.length > 0 ? recs.join('') : '<li>建议完善信息后重新评估</li>';
 },
 
 addStyles() {
 const style = document.createElement('style');
 style.textContent = `
 .loan-page {
 animation: fadeIn 0.5s ease;
 }
 
 .page-header {
 text-align: center;
 margin-bottom: 40px;
 }
 
 .page-header h1 {
 font-size: 2.5rem;
 margin-bottom: 10px;
 }
 
 .page-subtitle {
 color: #666;
 font-size: 1.1rem;
 }
 
 .products-section {
 margin-bottom: 50px;
 }
 
 .products-section h2 {
 font-size: 1.8rem;
 margin-bottom: 25px;
 color: #333;
 }
 
 .products-grid {
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
 gap: 25px;
 }
 
 .product-card {
 background: white;
 border-radius: 12px;
 overflow: hidden;
 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 transition: all 0.3s ease;
 }
 
 .product-card:hover {
 transform: translateY(-8px);
 box-shadow: 0 8px 24px rgba(0,0,0,0.15);
 }
 
 .product-icon {
 font-size: 5rem;
 text-align: center;
 padding: 40px 20px;
 background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 }
 
 .product-info {
 padding: 25px;
 }
 
 .product-info h3 {
 font-size: 1.5rem;
 margin-bottom: 8px;
 color: #333;
 }
 
 .product-type {
 display: inline-block;
 padding: 4px 12px;
 background: #e6f7ff;
 color: #1890ff;
 border-radius: 20px;
 font-size: 0.85rem;
 margin-bottom: 15px;
 }
 
 .product-desc {
 color: #666;
 line-height: 1.6;
 margin-bottom: 20px;
 }
 
 .product-terms {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 15px;
 margin-bottom: 20px;
 }
 
 .term-item {
 text-align: center;
 padding: 15px;
 background: #f5f7fa;
 border-radius: 8px;
 }
 
 .term-label {
 display: block;
 font-size: 0.85rem;
 color: #666;
 margin-bottom: 8px;
 }
 
 .term-value {
 font-size: 1.3rem;
 font-weight: bold;
 color: #333;
 }
 
 .product-requirements {
 margin-bottom: 25px;
 }
 
 .product-requirements h4 {
 font-size: 1.1rem;
 margin-bottom: 12px;
 color: #333;
 }
 
 .product-requirements ul {
 list-style: none;
 }
 
 .product-requirements li {
 padding: 8px 0;
 color: #666;
 font-size: 0.95rem;
 }
 
 .product-requirements li::before {
 content: '✓ ';
 color: #52c41a;
 font-weight: bold;
 margin-right: 8px;
 }
 
 .applications-section {
 margin-bottom: 50px;
 }
 
 .section-header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 25px;
 }
 
 .section-header h2 {
 font-size: 1.8rem;
 color: #333;
 }
 
 .applications-list {
 display: grid;
 gap: 20px;
 }
 
 .application-item {
 background: white;
 border-radius: 12px;
 padding: 25px;
 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 }
 
 .app-header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 20px;
 padding-bottom: 15px;
 border-bottom: 1px solid #f0f0f0;
 }
 
 .app-header h3 {
 font-size: 1.4rem;
 color: #333;
 }
 
 .app-status {
 padding: 6px 14px;
 border-radius: 20px;
 font-size: 0.9rem;
 font-weight: 600;
 }
 
 .app-status.pending {
 background: #fff7e6;
 color: #faad14;
 }
 
 .app-status.approved {
 background: #f6ffed;
 color: #52c41a;
 }
 
 .app-status.rejected {
 background: #fff1f0;
 color: #ff4d4f;
 }
 
 .app-info {
 display: flex;
 justify-content: space-between;
 margin-bottom: 20px;
 font-size: 0.95rem;
 color: #666;
 flex-wrap: wrap;
 gap: 10px;
 }
 
 .app-progress {
 margin-bottom: 20px;
 }
 
 .progress-bar {
 height: 8px;
 background: #f0f0f0;
 border-radius: 4px;
 overflow: hidden;
 margin-bottom: 10px;
 }
 
 .progress-fill {
 height: 100%;
 transition: width 0.5s ease;
 }
 
 .progress-fill.pending {
 background: #faad14;
 }
 
 .progress-fill.approved {
 background: #52c41a;
 }
 
 .progress-fill.rejected {
 background: #ff4d4f;
 }
 
 .progress-text {
 font-size: 0.95rem;
 color: #666;
 }
 
 .app-actions {
 display: flex;
 gap: 12px;
 padding-top: 20px;
 border-top: 1px solid #f0f0f0;
 }
 
 .credit-calculator {
 background: white;
 border-radius: 12px;
 padding: 30px;
 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 }
 
 .credit-calculator h2 {
 font-size: 1.8rem;
 margin-bottom: 25px;
 color: #333;
 text-align: center;
 }
 
 .calculator-content {
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 30px;
 }
 
 .calculator-form h3 {
 margin-bottom: 20px;
 color: #333;
 }
 
 .form-row {
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 15px;
 }
 
 .calculator-result h3 {
 margin-bottom: 20px;
 color: #333;
 }
 
 .score-display {
 text-align: center;
 padding: 25px;
 background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 border-radius: 12px;
 margin-bottom: 20px;
 color: white;
 }
 
 .score-label {
 display: block;
 font-size: 1rem;
 opacity: 0.9;
 margin-bottom: 10px;
 }
 
 .score-value {
 font-size: 3rem;
 font-weight: bold;
 margin-bottom: 10px;
 }
 
 .score-level {
 font-size: 1.2rem;
 }
 
 .loan-estimate {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 15px;
 margin-bottom: 20px;
 }
 
 .estimate-item {
 text-align: center;
 padding: 15px;
 background: #f5f7fa;
 border-radius: 8px;
 }
 
 .estimate-label {
 display: block;
 font-size: 0.9rem;
 color: #666;
 margin-bottom: 8px;
 }
 
 .estimate-value {
 font-size: 1.2rem;
 font-weight: bold;
 color: #333;
 }
 
 .recommendations h4 {
 margin-bottom: 12px;
 color: #667eea;
 }
 
 .recommendations ul {
 list-style: none;
 }
 
 .recommendations li {
 padding: 8px 0;
 color: #666;
 font-size: 0.95rem;
 }
 
 .summary-grid {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 15px;
 margin-bottom: 25px;
 }
 
 .summary-grid span {
 text-align: center;
 padding: 10px;
 background: #f5f7fa;
 border-radius: 8px;
 }
 
 .loan-approval {
 margin-top: 25px;
 padding: 20px;
 background: #f6ffed;
 border-radius: 10px;
 }
 
 .loan-approval h3 {
 margin-bottom: 15px;
 color: #52c41a;
 }
 
 .loan-rejection {
 margin-top: 25px;
 padding: 20px;
 background: #fff1f0;
 border-radius: 10px;
 }
 
 .loan-rejection h3 {
 margin-bottom: 15px;
 color: #ff4d4f;
 }
 
 .status-pending { color: #faad14; }
 .status-approved { color: #52c41a; }
 .status-rejected { color: #ff4d4f; }
 
 @media (max-width: 768px) {
 .products-grid {
 grid-template-columns: 1fr;
 }
 
 .product-terms {
 grid-template-columns: 1fr;
 }
 
 .calculator-content {
 grid-template-columns: 1fr;
 }
 
 .form-row {
 grid-template-columns: 1fr;
 }
 
 .loan-estimate {
 grid-template-columns: 1fr;
 }
 
 .summary-grid {
 grid-template-columns: 1fr;
 }
 
 .app-info {
 flex-direction: column;
 }
 
 .app-actions {
 flex-direction: column;
 }
 }
 `;
 document.head.appendChild(style);
 }
};
