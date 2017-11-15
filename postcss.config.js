const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    precss(),
    autoprefixer({ browsers: ['last 2 versions','iOS >= 7',"Android >= 4.4"] })
  ]
};