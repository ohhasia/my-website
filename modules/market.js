const MarketModule = {
 data: {
 apple: {
 name: '苹果',
 currentPrice: 8.5,
 previousPrice: 8.2,
 change: '+3.66%',
 changeAmount: '+0.30',
 high: 8.8,
 low: 8.1,
 volume: '12,580',
 unit: '元/公斤',
 trend: 'up',
 daily: [8.2, 8.3, 8.4, 8.5, 8.6, 8.5, 8.7, 8.8, 8.7, 8.6, 8.5, 8.4, 8.5, 8.6, 8.7, 8.8, 8.7, 8.6, 8.5, 8.4, 8.5, 8.6, 8.7, 8.5],
 weekly: [7.8, 7.9, 8.0, 8.1, 8.2, 8.3, 8.5],
 monthly: [7.2, 7.4, 7.5, 7.6, 7.8, 7.9, 8.0, 8.1, 8.2, 8.3, 8.4, 8.5]
 },
 rice: {
 name: '大米',
 currentPrice: 4.2,
 previousPrice: 4.15,
 change: '+1.20%',
 changeAmount: '+0.05',
 high: 4.3,
 low: 4.1,
 volume: '28,450',
 unit: '元/公斤',
 trend: 'up',
 daily: [4.15, 4.16, 4.17, 4.18, 4.19, 4.18, 4.19, 4.2, 4.21, 4.2, 4.19, 4.18, 4.19, 4.2, 4.21, 4.22, 4.21, 4.2, 4.19, 4.2, 4.21, 4.2, 4.2, 4.2],
 weekly: [4.0, 4.05, 4.08, 4.1, 4.12, 4.15, 4.2],
 monthly: [3.8, 3.85, 3.9, 3.92, 3.95, 3.98, 4.0, 4.05, 4.1, 4.12, 4.15, 4.2]
 },
 vegetable: {
 name: '蔬菜',
 currentPrice: 5.8,
 previousPrice: 6.0,
 change: '-3.33%',
 changeAmount: '-0.20',
 high: 6.2,
 low: 5.6,
 volume: '15,230',
 unit: '元/公斤',
 trend: 'down',
 daily: [6.0, 5.95, 5.9, 5.85, 5.8, 5.85, 5.8, 5.75, 5.7, 5.75, 5.8, 5.85, 5.8, 5.75, 5.7, 5.75, 5.8, 5.85, 5.8, 5.75, 5.8, 5.85, 5.8, 5.8],
 weekly: [5.5, 5.6, 5.7, 5.8, 5.9, 6.0, 5.8],
 monthly: [5.0, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6.0, 5.9, 5.8]
 },
 egg: {
 name: '鸡蛋',
 currentPrice: 11.2,
 previousPrice: 11.0,
 change: '+1.82%',
 changeAmount: '+0.20',
 high: 11.5,
 low: 10.8,
 volume: '22,680',
 unit: '元/公斤',
 trend: 'up',
 daily: [11.0, 11.05, 11.1, 11.15, 11.2, 11.15, 11.2, 11.25, 11.3, 11.25, 11.2, 11.15, 11.2, 11.25, 11.3, 11.35, 11.3, 11.25, 11.2, 11.15, 11.2, 11.25, 11.2, 11.2],
 weekly: [10.5, 10.6, 10.7, 10.8, 10.9, 11.0, 11.2],
 monthly: [10.0, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11.0, 11.2]
 },
 meat: {
 name: '肉类',
 currentPrice: 38.5,
 previousPrice: 39.0,
 change: '-1.28%',
 changeAmount: '-0.50',
 high: 39.5,
 low: 38.0,
 volume: '8,920',
 unit: '元/公斤',
 trend: 'down',
 daily: [39.0, 38.9, 38.8, 38.7, 38.6, 38.7, 38.8, 38.7, 38.6, 38.5, 38.6, 38.7, 38.6, 38.5, 38.4, 38.5, 38.6, 38.7, 38.6, 38.5, 38.6, 38.5, 38.5, 38.5],
 weekly: [37.5, 37.8, 38.0, 38.5, 38.8, 39.0, 38.5],
 monthly: [35.0, 35.5, 36.0, 36.5, 37.0, 37.5, 37.8, 38.0, 38.5, 38.8, 39.0, 38.5]
 }
 },
 currentChart: null,
 currentPeriod: 'daily',
 
 render() {
 const mainContent = document.getElementById('mainContent');
 mainContent.innerHTML = `
 <div class="market-page">
 <div class="page-header">
 <h1>农产品行情 📊</h1>
 <p class="page-subtitle">实时掌握市场动态，把握交易时机</p>
 </div>
 
 <div class="market-overview">
 <h2>市场概览</h2>
 <div class="market-grid">
 ${Object.values(this.data).map(item => `
 <div class="market-card ${item.trend}">
 <div class="market-header">
 <h3>${item.name}</h3>
 <span class="market-trend">${item.trend === 'up' ? '↑' : '↓'}</span>
 </div>
 <div class="market-price">
 <span class="price-main">${item.currentPrice}</span>
 <span class="price-unit">${item.unit}</span>
 </div>
 <div class="market-change">
 <span class="change-amount">${item.changeAmount}</span>
 <span class="change-rate">${item.change}</span>
 </div>
 <div class="market-meta">
 <span>最高：${item.high}</span>
 <span>最低：${item.low}</span>
 <span>成交量：${item.volume}</span>
 </div>
 <button class="btn btn-primary" onclick="MarketModule.showDetail('${Object.keys(this.data).find(key => this.data[key] === item)}')">查看详情</button>
 </div>
 `).join('')}
 </div>
 </div>
 
 <div class="chart-section">
 <h2>行情走势</h2>
 <div class="chart-controls">
 <select id="productSelect" onchange="MarketModule.updateChart()">
 ${Object.entries(this.data).map(([key, item]) => `<option value="${key}">${item.name}</option>`).join('')}
 </select>
 <div class="period-buttons">
 <button class="period-btn active" data-period="daily" onclick="MarketModule.changePeriod('daily')">日K线</button>
 <button class="period-btn" data-period="weekly" onclick="MarketModule.changePeriod('weekly')">周K线</button>
 <button class="period-btn" data-period="monthly" onclick="MarketModule.changePeriod('monthly')">月K线</button>
 </div>
 </div>
 <div id="marketChart" style="width: 100%; height: 500px;"></div>
 </div>
 
 <div class="market-news">
 <h2>市场资讯</h2>
 <div class="news-list">
 <div class="news-item">
 <span class="news-date">2024-01-15</span>
 <span class="news-title">春节临近，农产品需求旺盛，价格稳中有升</span>
 </div>
 <div class="news-item">
 <span class="news-date">2024-01-14</span>
 <span class="news-title">南方蔬菜供应充足，价格有所回落</span>
 </div>
 <div class="news-item">
 <span class="news-date">2024-01-13</span>
 <span class="news-title">东北地区大米产量创新高，市场供应充足</span>
 </div>
 <div class="news-item">
 <span class="news-date">2024-01-12</span>
 <span class="news-title">鸡蛋价格持续上涨，养殖户补栏积极性提高</span>
 </div>
 <div class="news-item">
 <span class="news-date">2024-01-11</span>
 <span class="news-title">国家储备肉投放市场，稳定肉类价格</span>
 </div>
 </div>
 </div>
 </div>
 `;
 
 this.addStyles();
 this.initChart();
 },
 
 initChart() {
 const chartDom = document.getElementById('marketChart');
 this.currentChart = echarts.init(chartDom);
 this.updateChart();
 
 window.addEventListener('resize', () => {
 if (this.currentChart) this.currentChart.resize();
 });
 },
 
 updateChart() {
 const selectedProduct = document.getElementById('productSelect').value;
 const product = this.data[selectedProduct];
 const period = this.currentPeriod;
 
 const data = product[period];
 const dates = this.generateDates(period, data.length);
 
 const option = {
 title: {
 text: `${product.name} ${period === 'daily' ? '日' : period === 'weekly' ? '周' : '月'}K线走势`,
 left: 'center'
 },
 tooltip: {
 trigger: 'axis',
 formatter: function(params) {
 return `${params[0].axisValue}<br/>价格：${params[0].value} 元/公斤`;
 }
 },
 grid: {
 left: '3%',
 right: '4%',
 bottom: '3%',
 containLabel: true
 },
 xAxis: {
 type: 'category',
 boundaryGap: false,
 data: dates
 },
 yAxis: {
 type: 'value',
 scale: true,
 axisLabel: {
 formatter: '{value} 元'
 }
 },
 series: [{
 name: '价格',
 type: 'line',
 smooth: true,
 symbol: 'circle',
 symbolSize: 6,
 lineStyle: {
 width: 3,
 color: product.trend === 'up' ? '#52c41a' : '#ff4d4f'
 },
 itemStyle: {
 color: product.trend === 'up' ? '#52c41a' : '#ff4d4f'
 },
 areaStyle: {
 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
 { offset: 0, color: product.trend === 'up' ? 'rgba(82, 196, 26, 0.3)' : 'rgba(255, 77, 79, 0.3)' },
 { offset: 1, color: product.trend === 'up' ? 'rgba(82, 196, 26, 0.1)' : 'rgba(255, 77, 79, 0.1)' }
 ])
 },
 data: data
 }]
 };
 
 this.currentChart.setOption(option);
 },
 
 generateDates(period, count) {
 const dates = [];
 const today = new Date();
 
 if (period === 'daily') {
 for (let i = count - 1; i >= 0; i--) {
 const date = new Date(today);
 date.setDate(date.getDate() - i);
 dates.push(`${date.getMonth() + 1}/${date.getDate()}`);
 }
 } else if (period === 'weekly') {
 for (let i = count - 1; i >= 0; i--) {
 const date = new Date(today);
 date.setDate(date.getDate() - i * 7);
 dates.push(`第${count - i}周`);
 }
 } else {
 for (let i = count - 1; i >= 0; i--) {
 const date = new Date(today);
 date.setMonth(date.getMonth() - i);
 dates.push(`${date.getMonth() + 1}月`);
 }
 }
 
 return dates;
 },
 
 changePeriod(period) {
 this.currentPeriod = period;
 
 document.querySelectorAll('.period-btn').forEach(btn => {
 btn.classList.remove('active');
 });
 event.target.classList.add('active');
 
 this.updateChart();
 },
 
 showDetail(productKey) {
 const product = this.data[productKey];
 const modal = document.createElement('div');
 modal.className = 'modal';
 modal.innerHTML = `
 <div class="modal-content detail-modal">
 <div class="modal-header">
 <h2>${product.name} - 详细行情</h2>
 <button class="modal-close" onclick="modal.remove()">×</button>
 </div>
 <div class="modal-body">
 <div class="detail-grid">
 <div class="detail-item">
 <span class="detail-label">当前价格：</span>
 <span class="detail-value price-big">${product.currentPrice} ${product.unit}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">涨跌幅：</span>
 <span class="detail-value ${product.trend}">${product.change}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">较昨日：</span>
 <span class="detail-value ${product.trend}">${product.changeAmount}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">最高价：</span>
 <span class="detail-value">${product.high} ${product.unit}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">最低价：</span>
 <span class="detail-value">${product.low} ${product.unit}</span>
 </div>
 <div class="detail-item">
 <span class="detail-label">成交量：</span>
 <span class="detail-value">${product.volume} 公斤</span>
 </div>
 </div>
 
 <div class="recommendations">
 <h3>交易建议</h3>
 <p>${product.trend === 'up' ? '当前价格呈上涨趋势，建议关注后续走势，可考虑适时买入。' : '当前价格呈下跌趋势，建议观望或择机卖出。'}</p>
 </div>
 
 <button class="btn btn-primary btn-block" onclick="modal.remove()">关闭</button>
 </div>
 </div>
 `;
 document.body.appendChild(modal);
 },
 
 addStyles() {
 const style = document.createElement('style');
 style.textContent = `
 .market-page {
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
 
 .market-overview {
 margin-bottom: 50px;
 }
 
 .market-overview h2 {
 font-size: 1.8rem;
 margin-bottom: 25px;
 color: #333;
 }
 
 .market-grid {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
 gap: 20px;
 }
 
 .market-card {
 background: white;
 border-radius: 12px;
 padding: 25px;
 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 transition: all 0.3s ease;
 border-left: 4px solid #52c41a;
 }
 
 .market-card.down {
 border-left-color: #ff4d4f;
 }
 
 .market-card:hover {
 transform: translateY(-5px);
 box-shadow: 0 8px 24px rgba(0,0,0,0.15);
 }
 
 .market-header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 15px;
 }
 
 .market-header h3 {
 font-size: 1.4rem;
 color: #333;
 }
 
 .market-trend {
 font-size: 1.5rem;
 font-weight: bold;
 color: #52c41a;
 }
 
 .market-card.down .market-trend {
 color: #ff4d4f;
 }
 
 .market-price {
 margin-bottom: 10px;
 }
 
 .price-main {
 font-size: 2.5rem;
 font-weight: bold;
 color: #333;
 }
 
 .price-unit {
 font-size: 1rem;
 color: #666;
 margin-left: 5px;
 }
 
 .market-change {
 margin-bottom: 15px;
 }
 
 .change-amount {
 font-size: 1.3rem;
 font-weight: bold;
 color: #52c41a;
 }
 
 .market-card.down .change-amount {
 color: #ff4d4f;
 }
 
 .change-rate {
 font-size: 1rem;
 color: #666;
 margin-left: 8px;
 }
 
 .market-meta {
 display: flex;
 justify-content: space-between;
 margin-bottom: 20px;
 font-size: 0.9rem;
 color: #666;
 }
 
 .chart-section {
 margin-bottom: 50px;
 }
 
 .chart-section h2 {
 font-size: 1.8rem;
 margin-bottom: 20px;
 color: #333;
 }
 
 .chart-controls {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 20px;
 flex-wrap: wrap;
 gap: 15px;
 }
 
 #productSelect {
 padding: 10px 20px;
 border: 2px solid #e8e8e8;
 border-radius: 8px;
 font-size: 1rem;
 min-width: 150px;
 }
 
 .period-buttons {
 display: flex;
 gap: 10px;
 }
 
 .period-btn {
 padding: 10px 20px;
 border: 2px solid #e8e8e8;
 background: white;
 border-radius: 8px;
 cursor: pointer;
 transition: all 0.3s;
 }
 
 .period-btn.active {
 background: #667eea;
 color: white;
 border-color: #667eea;
 }
 
 #marketChart {
 background: white;
 border-radius: 12px;
 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 }
 
 .market-news {
 background: white;
 border-radius: 12px;
 padding: 30px;
 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 }
 
 .market-news h2 {
 font-size: 1.8rem;
 margin-bottom: 20px;
 color: #333;
 }
 
 .news-list {
 display: flex;
 flex-direction: column;
 gap: 15px;
 }
 
 .news-item {
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 15px;
 border-bottom: 1px solid #f0f0f0;
 cursor: pointer;
 transition: all 0.3s;
 }
 
 .news-item:hover {
 background: #f5f7fa;
 }
 
 .news-date {
 color: #667eea;
 font-weight: 600;
 }
 
 .news-title {
 color: #333;
 flex: 1;
 margin-left: 20px;
 }
 
 .recommendations {
 margin-top: 25px;
 padding: 20px;
 background: #f5f7fa;
 border-radius: 10px;
 }
 
 .recommendations h3 {
 margin-bottom: 10px;
 color: #667eea;
 }
 
 .recommendations p {
 color: #666;
 line-height: 1.6;
 }
 
 @media (max-width: 768px) {
 .market-grid {
 grid-template-columns: 1fr;
 }
 
 .chart-controls {
 flex-direction: column;
 align-items: stretch;
 }
 
 .period-buttons {
 justify-content: center;
 }
 }
 `;
 document.head.appendChild(style);
 }
};
