module.exports = {
  // "*.{js,jsx,vue}": "vue-cli-service lint",
  '*.{js,jsx,vue,ts,tsx}': ['eslint --fix', 'prettier --write', 'git add'],
};
