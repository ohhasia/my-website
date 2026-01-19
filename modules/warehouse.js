const WarehouseModule = {
 pledges: [
 { id: 1, warehouseNo: 'WH20240115001', product: '精品苹果', quantity: 500, unit: '箱', value: 42500, pledgeAmount: 34000, rate: 0.08, term: 90, status: 'approved', applyDate: '2024-01-15', approveDate: '2024-01-16', financial: '农业银行' },
 { id: 2, warehouseNo: 'WH20240114002', product: '五常大米', quantity: 200, unit: '袋', value: 16400, pledgeAmount: 13120, rate: 0.075, term: 60, status: 'approved', applyDate: '2024-01-14', approveDate: '2024-01-15', financial: '工商银行' },
 { id: 3, warehouseNo: 'WH20240113003', product: '土鸡蛋', quantity: 300, unit: '盒', value: 16500, pledgeAmount: 13200, rate: 0.085, term: 120, status: 'pending', applyDate: '2024-01-13', financial: '建设银行' },
 { id: 4, warehouseNo: 'WH20240112004', product: '新疆红枣', quantity: 150, unit: '袋', value: 14250, pledgeAmount: 11400, rate: 0.078, term: 90, status: 'rejected', applyDate: '2024-01-12', rejectReason: '仓单信息不全', financial: '中国银行' }
 ],
 
 render() {
 const mainContent = document.getElementById('mainContent');
 mainContent.innerHTML = `
 <div class="warehouse-page">
 <div class="page-header">
 <h1>仓单质押 🏭</h1>
 <button class="btn btn-primary" onclick="WarehouseModule.showApplyModal()">申请质押</button>
 </div>
 
 <div class="status-cards">
 <div class="status-card pending">
 <div class="status-count">${this.pledges.filter(p => p.status === 'pending').length}</div>
 <div class="status-label">待审核</div>
 </div>
 <div class="status-card approved">
 <div class="status-count">${this.pledges.filter(p => p.status === 'approved').length}</div>
 <div class="status-label">已通过</div>
 </div>
 <div class="status-card rejected">
 <div class="status-count">${this.pledges.filter(p => p.status === 'rejected').length}</div>
 <div class="status-label">已拒绝</div>
 </div>
 </div>
 
 <div class="pledge-list">
 ${this.pledges.map(pledge => `
 <div class="pledge-item">
 <div class="pledge-header">
 <span class="pledge-no">仓单编号：${pledge.warehouseNo}</span>
 <span class="pledge-status ${pledge.status}">${this.getStatusText(pledge.status)}</span>
 </div>
 
 <div class="pledge-body">
 <div class="pledge-info">
 <h3>${pledge.product}</h3>
 <div class="info-row">
 <span>数量：${pledge.quantity} ${pledge.unit}</span>
 <span>货物价值：¥${pledge.value.toLocaleString()}</span>
 <span>质押金额：¥${pledge.pledgeAmount.toLocaleString()}</span>
 </div>
 <div class="info-row">
 <span>年利率：${(pledge.rate * 100).toFixed(2)}%</span>
 <span>期限：${pledge.term}天</span>
 <span>金融机构：${pledge.financial}</span>
 </div>
 </div>
 </div>
 
 <div class="pledge-footer">
 <span>申请日期：${pledge.applyDate}</span>
 ${pledge.status === 'approved' ? `<span>审核通过：${pledge.approveDate}</span>` : ''}
 ${pledge.status === 'rejected' ? `<span class="reject-reason">拒绝原因：${pledge.rejectReason}</span>` : ''}
 </div>
 
 <div class="pledge-actions">
 ${pledge.status === 'pending' ? `<button class="btn btn-secondary" onclick="WarehouseModule.cancelPledge(${pledge.id})">撤销申请</button>` : ''}
 <button class="btn btn-primary" onclick="WarehouseModule.viewDetail(${pledge.id})">查看详情</button>
 </div>
 </div>
 `).join('')}
 </div>
 </div>
 `;
 
 this.addStyles();
 },
 
 getStatusText(status) {
 const texts = {
 pending: '待审核',
 approved: '已通过',
 rejected: '已拒绝'
 };
 return texts[status];
 },
 
 showApplyModal() {
 const modal = document.createElement('div');
 modal.className = 'modal';
 modal.innerHTML = `
 <div class="modal-content">
 <div class="modal-header">
 <h2>申请仓单质押</h2>
 <button class="modal-close" onclick="modal.remove()">×</button>
 </div>
 <div class="modal-body">
 <form id="pledgeForm" onsubmit="WarehouseModule.handleApply(event, this)">
 <div class="form-group">
 <label>仓单编号 *</label>
 <input type="text" name="warehouseNo" required placeholder="如：WH20240115001">
 </div>
 
 <div class="form-group">
 <label>质押货物 *</label>
 <input type="text" name="product" required placeholder="如：精品苹果">
 </div>
 
 <div class="form-group">
 <label>数量 *</label>
 <input type="number" name="quantity" required min="1">
 </div>
 
 <div class="form-group">
 <label>单位 *</label>
 <input type="text" name="unit" required placeholder="如：箱、袋、公斤">
 </div>
 
 <div class="form-group">
 <label>货物价值(元) *</label>
 <input type="number" name="value" required min="1">
 </div>
 
 <div class="form-group">
 <label>申请质押金额(元) *</label>
 <input type="number" name="pledgeAmount" required min="1">
 </div>
 
 <div class="form-group">
 <label>质押期限(天) *</label>
 <select name="term" required>
 <option value="30">30天</option>
 <option value="60">60天</option>
 <option value="90">90天</option>
 <option value="120">120天</option>
 <option value="180">180天</option>
 </select>
 </div>
 
 <div class="form-group">
 <label>选择金融机构 *</label>
 <select name="financial" required>
 <option value="农业银行">农业银行</option>
 <option value="工商银行">工商银行</option>
 <option value="建设银行">建设银行</option>
 <option value="中国银行">中国银行</option>
 <option value="农村信用社">农村信用社</option>
 </select>
 </div>
 
 <div class="form-group">
 <label>上传仓单文件</label>
 <input type="file" name="warehouseFile" accept=".pdf,.jpg,.png">
 <p class="form-tip">支持PDF、JPG、PNG格式，大小不超过10MB</p>
 </div>
 
 <button type="submit" class="btn btn-primary btn-block">提交申请</button>
 </form>
 </div>
 </div>
 `;
 document.body.appendChild(modal);
 },
 
 handleApply(event, form) {
 event.preventDefault();
 const formData = new FormData(form);
 const data = Object.fromEntries(formData);
 
 data.id = this.pledges.length + 1;
 data.status = 'pending';
 data.applyDate = new Date().toISOString().split('T')[0];
 data.rate = 0.08;
 
 this.pledges.unshift(data);
 document.querySelector('.modal').remove();
 this.render();
 alert('质押申请已提交！我们将在3个工作日内完成审核。');
 },
 
 cancelPledge(id) {
 if (confirm('确定要撤销此质押申请吗？')) {
 const pledge = this.pledges.find(p => p.id === id);
 if (pledge) {
 pledge.status = 'cancelled';
 this.render();
 alert('已撤销质押申请！');
 }
 }
 },
 
 viewDetail(id) {
 const pledge = this.pledges.find(p => p.id === id);
 if (!pledge) return;
 
 const modal = document.createElement('div');
 modal.className = 'modal';
 modal.innerHTML = `
 <div class="modal-content detail-modal">
 <div class="modal-header">
 <h2>仓单质押详情</h2>
 <button class="modal-close" onclick="modal.remove()">×</button>
 </div>
 <div class="modal-body">
 <div class="detail-section">
 <h3>仓单信息</h3>
 <div class="detail-grid">
 <div class="detail-item">
 <span class="detail-label">仓单编号：</span>
 <span class="detail-value">${pledge.warehouseNo}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">质押状态：</span>
 <span class="detail-value status-${pledge.status}">${this.getStatusText(pledge.status)}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">申请日期：</span>
 <span class="detail-value">${pledge.applyDate}</span>
 </div>
 ${pledge.status === 'approved' ? `<div class="detail-item"><span class="detail-label">审核通过：</span><span class="detail-value">${pledge.approveDate}</span></div>` : ''}
 </div>
 </div>
 
 <div class="detail-section">
 <h3>货物信息</h3>
 <div class="detail-grid">
 <div class="detail-item">
 <span class="detail-label">货物名称：</span>
 <span class="detail-value">${pledge.product}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">数量：</span>
 <span class="detail-value">${pledge.quantity} ${pledge.unit}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">货物价值：</span>
 <span class="detail-value">¥${pledge.value.toLocaleString()}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">质押金额：</span>
 <span class="detail-value price-highlight">¥${pledge.pledgeAmount.toLocaleString()}</span>
 </div>
 </div>
 </div>
 
 <div class="detail-section">
 <h3>金融信息</h3>
 <div class="detail-grid">
 <div class="detail-item">
 <span class="detail-label">金融机构：</span>
 <span class="detail-value">${pledge.financial}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">年利率：</span>
 <span class="detail-value">${(pledge.rate * 100).toFixed(2)}%</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">质押期限：</span>
 <span class="detail-value">${pledge.term}天</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">预计利息：</span>
 <span class="detail-value">¥${((pledge.pledgeAmount * pledge.rate * pledge.term) / 365).toFixed(2)}</span>
 </div>
 </div>
 </div>
 
 ${pledge.status === 'rejected' ? `
 <div class="detail-section">
 <h3>审核结果</h3>
 <div class="reject-notice">
 <p><strong>拒绝原因：</strong>${pledge.rejectReason}</p>
 <p>建议：请完善仓单信息后重新提交申请</p>
 </div>
 </div>
 ` : ''}
 
 <button class="btn btn-primary btn-block" onclick="modal.remove()">关闭</button>
 </div>
 </div>
 `;
 document.body.appendChild(modal);
 },
 
 addStyles() {
 const style = document.createElement('style');
 style.textContent = `
 .warehouse-page {
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
 
 .status-cards {
 display: flex;
 gap: 20px;
 margin-bottom: 30px;
 flex-wrap: wrap;
 }
 
 .status-card {
 flex: 1;
 min-width: 150px;
 background: white;
 border-radius: 12px;
 padding: 25px;
 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 text-align: center;
 border-left: 4px solid #667eea;
 }
 
 .status-card.pending {
 border-left-color: #faad14;
 }
 
 .status-card.approved {
 border-left-color: #52c41a;
 }
 
 .status-card.rejected {
 border-left-color: #ff4d4f;
 }
 
 .status-count {
 font-size: 2.5rem;
 font-weight: bold;
 color: #333;
 margin-bottom: 10px;
 }
 
 .status-label {
 font-size: 1.1rem;
 color: #666;
 }
 
 .pledge-list {
 display: grid;
 gap: 20px;
 }
 
 .pledge-item {
 background: white;
 border-radius: 12px;
 padding: 25px;
 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 }
 
 .pledge-header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 20px;
 padding-bottom: 15px;
 border-bottom: 1px solid #f0f0f0;
 }
 
 .pledge-no {
 font-weight: 600;
 color: #333;
 }
 
 .pledge-status {
 padding: 6px 14px;
 border-radius: 20px;
 font-size: 0.9rem;
 font-weight: 600;
 }
 
 .pledge-status.pending {
 background: #fff7e6;
 color: #faad14;
 }
 
 .pledge-status.approved {
 background: #f6ffed;
 color: #52c41a;
 }
 
 .pledge-status.rejected {
 background: #fff1f0;
 color: #ff4d4f;
 }
 
 .pledge-body h3 {
 font-size: 1.5rem;
 margin-bottom: 15px;
 color: #333;
 }
 
 .info-row {
 display: flex;
 justify-content: space-between;
 margin-bottom: 10px;
 font-size: 0.95rem;
 color: #666;
 flex-wrap: wrap;
 gap: 10px;
 }
 
 .pledge-footer {
 display: flex;
 justify-content: space-between;
 margin: 20px 0;
 padding: 15px;
 background: #f5f7fa;
 border-radius: 8px;
 font-size: 0.9rem;
 color: #666;
 flex-wrap: wrap;
 gap: 10px;
 }
 
 .reject-reason {
 color: #ff4d4f;
 font-weight: 600;
 }
 
 .pledge-actions {
 display: flex;
 gap: 12px;
 padding-top: 20px;
 border-top: 1px solid #f0f0f0;
 }
 
 .reject-notice {
 background: #fff1f0;
 padding: 20px;
 border-radius: 8px;
 color: #ff4d4f;
 }
 
 .status-pending { color: #faad14; }
 .status-approved { color: #52c41a; }
 .status-rejected { color: #ff4d4f; }
 
 @media (max-width: 768px) {
 .page-header {
 flex-direction: column;
 align-items: flex-start;
 gap: 15px;
 }
 
 .status-cards {
 flex-direction: column;
 }
 
 .info-row {
 flex-direction: column;
 }
 
 .pledge-actions {
 flex-direction: column;
 }
 }
 `;
 document.head.appendChild(style);
 }
};
