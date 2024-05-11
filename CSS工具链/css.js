const postcss = require("postcss");
const parser = require("postcss-selector-parser");

function mergeStyles(style1, style2) {
  const rules1 = postcss.parse(style1).rules;
  const rules2 = postcss.parse(style2).rules;

  const mergedRules = [];

  // 遍历第一个CSS对象的规则
  for (const rule1 of rules1) {
    // 查找第二个CSS对象中与当前规则选择器相同的选择器
    const matchingRule2 = rules2.find((rule2) =>
      isMatchingSelector(rule1.selector, rule2.selector)
    );

    if (matchingRule2) {
      // 合并属性
      for (const decl2 of matchingRule2.decls) {
        const existingDecl = rule1.decls.find(
          (decl1) => decl1.prop === decl2.prop
        );
        if (existingDecl) {
          // 如果属性已存在，更新其值
          existingDecl.value = decl2.value;
        } else {
          // 否则，添加新属性
          rule1.append(decl2.clone());
        }
      }
    } else {
      // 如果没有匹配的选择器，直接添加规则1
      mergedRules.push(rule1);
    }
  }

  // 添加剩余的规则2
  for (const rule2 of rules2) {
    if (
      !rules1.some((rule1) =>
        isMatchingSelector(rule1.selector, rule2.selector)
      )
    ) {
      mergedRules.push(rule2);
    }
  }

  // 生成合并后的CSS字符串
  return postcss.root({ nodes: mergedRules }).toString();
}

function isMatchingSelector(selector1, selector2) {
  // 简单的比较两个选择器是否相同，实际应用可能需要更复杂的选择器解析和匹配
  return selector1.trim() === selector2.trim();
}

const style1 = `
    .class1 {
      width: 200px;
      color: red;
    }
  `;

const style2 = `
    .class1 {
      width: 300px;
      font-size: 16px;
    }
    .class2 {
      background-color: blue;
    }
  `;

console.log(mergeStyles(style1, style2));
