const TrainingModule = {
 courses: [
 { id: 1, title: '农产品行情分析入门', instructor: '张教授', duration: '4小时', level: '初级', price: 99, students: 1250, rating: 4.8, cover: '📈', description: '学习农产品价格走势分析方法，掌握基本分析技巧。', lessons: 8 },
 { id: 2, title: '交易实战技巧', instructor: '李老师', duration: '6小时', level: '中级', price: 199, students: 890, rating: 4.9, cover: '⚔️', description: '实战交易策略与技巧，提高交易成功率。', lessons: 12 },
 { id: 3, title: '农产品供应链管理', instructor: '王经理', duration: '5小时', level: '中级', price: 149, students: 670, rating: 4.7, cover: '📦', description: '了解农产品供应链运作模式，优化交易流程。', lessons: 10 },
 { id: 4, title: '风险控制与资金管理', instructor: '赵专家', duration: '4.5小时', level: '高级', price: 249, students: 450, rating: 4.9, cover: '🛡️', description: '学习风险控制方法，合理管理交易资金。', lessons: 9 },
 { id: 5, title: '电子商务与农产品营销', instructor: '陈老师', duration: '5.5小时', level: '中级', price: 169, students: 780, rating: 4.8, cover: '💻', description: '利用互联网平台推广农产品，拓展销售渠道。', lessons: 11 }
 ],
 
 render() {
 const mainContent = document.getElementById('mainContent');
 mainContent.innerHTML = `
 <div class="training-page">
 <div class="page-header">
 <h1>交易培训 📚</h1>
 <p class="page-subtitle">提升专业技能，成为交易高手</p>
 </div>
 
 <div class="courses-grid">
 ${this.courses.map(course => `
 <div class="course-card">
 <div class="course-cover">${course.cover}</div>
 <div class="course-info">
 <h3>${course.title}</h3>
 <div class="course-meta">
 <span>讲师：${course.instructor}</span>
 <span>时长：${course.duration}</span>
 <span>难度：${course.level}</span>
 </div>
 <p class="course-desc">${course.description}</p>
 <div class="course-stats">
 <span>📚 ${course.lessons}课时</span>
 <span>👥 ${course.students}人学习</span>
 <span>⭐ ${course.rating}分</span>
 </div>
 <div class="course-footer">
 <span class="course-price">¥${course.price}</span>
 <button class="btn btn-primary" onclick="TrainingModule.enroll(${course.id})">立即报名</button>
 </div>
 </div>
 </div>
 `).join('')}
 </div>
 
 <div class="learning-path">
 <h2>学习路径推荐</h2>
 <div class="path-steps">
 <div class="path-step">
 <div class="step-number">1</div>
 <div class="step-content">
 <h4>入门阶段</h4>
 <p>学习基础概念，了解市场运作</p>
 <span>推荐课程：农产品行情分析入门</span>
 </div>
 </div>
 <div class="path-arrow">→</div>
 <div class="path-step">
 <div class="step-number">2</div>
 <div class="step-content">
 <h4>进阶阶段</h4>
 <p>掌握交易技巧，实践操作</p>
 <span>推荐课程：交易实战技巧</span>
 </div>
 </div>
 <div class="path-arrow">→</div>
 <div class="path-step">
 <div class="step-number">3</div>
 <div class="step-content">
 <h4>高级阶段</h4>
 <p>风险管理，资金规划</p>
 <span>推荐课程：风险控制与资金管理</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 `;
 
 this.addStyles();
 },
 
 enroll(courseId) {
 const course = this.courses.find(c => c.id === courseId);
 if (!course) return;
 
 const modal = document.createElement('div');
 modal.className = 'modal';
 modal.innerHTML = `
 <div class="modal-content">
 <div class="modal-header">
 <h2>报名课程：${course.title}</h2>
 <button class="modal-close" onclick="modal.remove()">×</button>
 </div>
 <div class="modal-body">
 <div class="course-summary">
 <h3>课程信息</h3>
 <div class="info-grid">
 <div class="info-item">
 <span class="info-label">讲师：</span>
 <span class="info-value">${course.instructor}</span>
 </div>
 <div class="info-item">
 <span class="info-label">时长：</span>
 <span class="info-value">${course.duration}</span>
 </div>
 <div class="info-item">
 <span class="info-label">难度：</span>
 <span class="info-value">${course.level}</span>
 </div>
 <div class="info-item">
 <span class="info-label">课时：</span>
 <span class="info-value">${course.lessons}课时</span>
 </div>
 <div class="info-item">
 <span class="info-label">价格：</span>
 <span class="info-value price-highlight">¥${course.price}</span>
 </div>
 </div>
 </div>
 
 <div class="enroll-form">
 <h3>报名信息</h3>
 <form id="enrollForm">
 <div class="form-group">
 <label>姓名 *</label>
 <input type="text" name="name" required placeholder="请输入您的姓名">
 </div>
 <div class="form-group">
 <label>手机号 *</label>
 <input type="tel" name="phone" required placeholder="请输入您的手机号">
 </div>
 <div class="form-group">
 <label>邮箱</label>
 <input type="email" name="email" placeholder="请输入您的邮箱">
 </div>
 <button type="submit" class="btn btn-primary btn-block">确认报名</button>
 </form>
 </div>
 </div>
 </div>
 `;
 document.body.appendChild(modal);
 
 document.getElementById('enrollForm').onsubmit = (e) => {
 e.preventDefault();
 alert('报名成功！我们会尽快与您联系，安排课程学习。');
 modal.remove();
 };
 },
 
 addStyles() {
 const style = document.createElement('style');
 style.textContent = `
 .training-page {
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
 
 .courses-grid {
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
 gap: 25px;
 margin-bottom: 50px;
 }
 
 .course-card {
 background: white;
 border-radius: 12px;
 overflow: hidden;
 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 transition: all 0.3s ease;
 }
 
 .course-card:hover {
 transform: translateY(-8px);
 box-shadow: 0 8px 24px rgba(0,0,0,0.15);
 }
 
 .course-cover {
 font-size: 6rem;
 text-align: center;
 padding: 40px 20px;
 background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 }
 
 .course-info {
 padding: 25px;
 }
 
 .course-info h3 {
 font-size: 1.4rem;
 margin-bottom: 12px;
 color: #333;
 }
 
 .course-meta {
 display: flex;
 justify-content: space-between;
 margin-bottom: 15px;
 font-size: 0.9rem;
 color: #666;
 flex-wrap: wrap;
 gap: 8px;
 }
 
 .course-desc {
 color: #666;
 line-height: 1.6;
 margin-bottom: 15px;
 }
 
 .course-stats {
 display: flex;
 justify-content: space-between;
 margin-bottom: 20px;
 font-size: 0.9rem;
 color: #666;
 }
 
 .course-footer {
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding-top: 15px;
 border-top: 1px solid #f0f0f0;
 }
 
 .course-price {
 font-size: 1.8rem;
 font-weight: bold;
 color: #ff4d4f;
 }
 
 .learning-path {
 background: white;
 border-radius: 12px;
 padding: 40px;
 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
 }
 
 .learning-path h2 {
 font-size: 1.8rem;
 margin-bottom: 30px;
 text-align: center;
 color: #333;
 }
 
 .path-steps {
 display: flex;
 justify-content: space-between;
 align-items: stretch;
 gap: 20px;
 flex-wrap: wrap;
 }
 
 .path-step {
 flex: 1;
 min-width: 250px;
 background: #f5f7fa;
 border-radius: 12px;
 padding: 25px;
 position: relative;
 }
 
 .step-number {
 position: absolute;
 top: -15px;
 left: 50%;
 transform: translateX(-50%);
 width: 35px;
 height: 35px;
 background: #667eea;
 color: white;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-weight: bold;
 font-size: 1.2rem;
 }
 
 .step-content h4 {
 font-size: 1.2rem;
 margin-bottom: 10px;
 color: #333;
 text-align: center;
 }
 
 .step-content p {
 color: #666;
 margin-bottom: 10px;
 text-align: center;
 }
 
 .step-content span {
 display: block;
 text-align: center;
 color: #667eea;
 font-weight: 600;
 font-size: 0.9rem;
 }
 
 .path-arrow {
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 2rem;
 color: #667eea;
 }
 
 .course-summary {
 margin-bottom: 25px;
 }
 
 .course-summary h3 {
 margin-bottom: 15px;
 color: #333;
 }
 
 .info-grid {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
 gap: 15px;
 }
 
 .info-item {
 display: flex;
 justify-content: space-between;
 padding: 10px 0;
 }
 
 .info-label {
 color: #666;
 }
 
 .info-value {
 color: #333;
 font-weight: 500;
 }
 
 .price-highlight {
 color: #ff4d4f;
 font-weight: bold;
 font-size: 1.2rem;
 }
 
 .enroll-form h3 {
 margin-bottom: 15px;
 color: #333;
 }
 
 @media (max-width: 768px) {
 .courses-grid {
 grid-template-columns: 1fr;
 }
 
 .path-steps {
 flex-direction: column;
 }
 
 .path-arrow {
 transform: rotate(90deg);
 }
 }
 `;
 document.head.appendChild(style);
 }
};
