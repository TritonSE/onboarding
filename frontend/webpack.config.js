const path = require("path");

module.exports = {
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      "src/*": "src/*",
    },
  },
};
