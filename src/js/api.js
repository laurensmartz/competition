export default {
  // 登录
  login: 'pubadmin/login/checkLogin.json',
  // 2.2 获取验证码
  vfCode: '?act=Api/VerifyCode/sendVerifyCode',
  // 3.1 注册
  signup: '?act=Api/Login/requestRegister',
  // 4.1 获取个人信息
  memberInfo: '?act=Api/User/userInfo',
  // 4.2 修改个人信息
  updateMemberInfo: '?act=Api/User/updateUserInfo',
  // 4.3 找回密码/修改密码
  retrievePwd: '?act=Api/User/forgotPassword',
  // 4.4 实名认证
  certify: '?act=Api/User/certify',
  // 4.10 我要收款--获取验证码（华付通）
  hftReceivablesSms: '?act=Api/UserRecharge/hftReceivablesSms',
  // 5.1 首页轮播图+公告+我的信用卡
  allInfo: '?act=Api/HomePage/allInfo',
  // 6.1 我的银行卡
  bankCardList: '?act=Api/Bank/bankCardList',
  // 6.14 银行卡列表（用于下拉选择-我要收款）
  bankCardSelectList: '?act=Api/Bank/bankCardSelectList',
  // 7.2 添加信用卡
  addCreditCard: '?act=Api/Bank/addCreditCard',
  // 7.3 提现
  withdraw: '?act=Api/Bank/withdraw',
  // 8.1 银行卡账单
  bill: '?act=Api/Bank/billList',
  // 8.2 用户账户流水
  flowList: '?act=Api/User/flowList',
  // 9.1 获取系统配置
  config: '?act=Api/System/config',
  // 10.1 快捷签约短信
  HLBBindCardSms: '?act=Api/BankHLB/BindCardSms',
  // 注册（新）
  signupFromSina: '/Api/Login/requestRegisterFromSina',
};
