let traverse = require("ast-traverse");
let parser = require("@babel/parser");

const b = `export default {
    setup() {
        const message = ref("Hello, Vue 3!");
        const ceshi = () => {
            console.log("ceshi1")
            console.log("ceshi2")
        }
            
        const ceshi222 = () => {
            console.log("ceshi1")
            console.log("ceshi2")
        }
        return {
            message,
            ceshi
        }
    },
};`;

function extractLines(str, startLine, endLine) {
  const lines = str.split("\n");
  return lines.slice(startLine - 1, endLine).join("\n");
}

const ast = parser.parse(b, {
  sourceType: "module",
});

const config = {};

traverse(ast, {
  pre: function (node, parent, prop, idx) {
    if (
      node.type === "VariableDeclarator" &&
      node.init &&
      node.init.type === "ArrowFunctionExpression"
    ) {
      console.log(extractLines(b, node.loc.start.line, node.loc.end.line));
    }
  },
});
