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
      //   console.log("node", node);
      //   console.log("parent", parent);
      console.log(extractLines(b, node.loc.start.line, node.loc.end.line));
      //   console.log("prop", prop);
      //   console.log("idx", idx);
    }
    // if (
    //   node.type === "CallExpression" &&
    //   node.callee.type === "MemberExpression"
    // ) {
    //   console.log("node.arguments[0]", node.arguments[0]);
    //   console.log(JSON.stringify(node));
    //   // return node;
    // }
    // if (
    //   node.type === "CallExpression" &&
    //   node.callee.type === "MemberExpression" &&
    //   node.arguments[0] != undefined &&
    //   node.arguments[0].type === "ObjectExpression"
    // ) {
    //   if (
    //     node.callee.property.type === "Identifier" &&
    //     config[node.callee.property.name] != undefined
    //   ) {
    //     let PROP_name = node.callee.property.name; //api的名称
    //     let PROP = config[PROP_name]; //替换的参数对象
    //     node.arguments[0].properties.forEach(function (element) {
    //       if (PROP[element.key.name] != undefined) {
    //         end = element.key.start;
    //         let head = content.substring(begin, end); //element.key.start
    //         begin = element.key.end;
    //         contentArray.push(head, PROP[element.key.name]);
    //       }
    //     });
    //   }
    // }
  },
});
