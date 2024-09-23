export default defineAppConfig({
  pages: [
    'pages/login/index',
    'pages/index/index',
    'pages/order/index',
    'pages/patient/index'
  ],
  subPackages: [
    {
      root: 'pages/packages/order',
      name: 'order',
      pages: [
        'detail/index'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
