const sass = require("sass");

const scss = `
.demonstration-element {
    margin-bottom: 10px;
    .a1 {
      margin-top: 20px;
    }
  }
`;

const renderConfig = {
  data: scss,
};

const res = sass.renderSync(renderConfig);
console.log(res.css.toString())