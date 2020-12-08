module.exports = {
  port: 8080,
  mode: {
    DEV: 'development',
    PRO: 'production',
  },
  DEFAULT_PUBLICPATH: '/',

  cdnPath: {
    DEV: '/',
    PRO: '/',
  },
  // antd主题定制
  antdVariable: {
    'primary-color': '#3569fd',
    'link-color': '#3569fd',
    'border-radius-base': '2px',
  },

  moduleFileExtensions: ['.ts', '.tsx', '.js', '.jsx'],
};
