const AuthModule = {
 checkLogin() {
 return !!App.currentUser;
 },
 
 requireAuth(callback) {
 if (!this.checkLogin()) {
 alert('请先登录后再进行操作！');
 App.showLoginModal();
 return false;
 }
 if (callback) callback();
 return true;
 }
};
