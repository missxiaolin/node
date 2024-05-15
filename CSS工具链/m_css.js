const postcss = require('postcss');

// 样式字符串1
const css1 = `
.my-class {
    font-size: 16px;
    color: blue !important;
}
`;

// 样式字符串2
const css2 = `
.my-class {
    font-size: 18px;
    color: red;
    background-color: yellow;
}
`;

// 创建一个 PostCSS 插件
const mergeStylesPlugin = postcss.plugin('merge-styles', () => {
    return (root) => {
        const mergedRules = {};

        root.walkRules((rule) => {
            const selector = rule.selector;
            const declarations = rule.nodes;

            if (mergedRules[selector]) {
                declarations.forEach((declaration) => {
                    const property = declaration.prop;
                    const value = declaration.value;
                    const important = declaration.important;

                    if (mergedRules[selector][property]) {
                        // Check if the property value is important and update accordingly
                        if (important || !mergedRules[selector][property].important) {
                            mergedRules[selector][property] = {
                                value: value,
                                important: important
                            };
                        } else {
                            const existingValue = mergedRules[selector][property].value;
                            const newValue = value;

                            if (existingValue !== newValue) {
                                // Compare and update if new value is greater
                                if (parseInt(newValue, 10) > parseInt(existingValue, 10)) {
                                    mergedRules[selector][property] = {
                                        value: value,
                                        important: important
                                    };
                                }
                            }
                        }
                    } else {
                        mergedRules[selector][property] = {
                            value: value,
                            important: important
                        };
                    }
                });
            } else {
                mergedRules[selector] = {};
                declarations.forEach((declaration) => {
                    const property = declaration.prop;
                    const value = declaration.value;
                    const important = declaration.important;
                    mergedRules[selector][property] = {
                        value: value,
                        important: important
                    };
                });
            }
        });

        root.removeAll();

        Object.keys(mergedRules).forEach((selector) => {
            const rule = postcss.rule({ selector: selector });

            Object.keys(mergedRules[selector]).forEach((property) => {
                const { value, important } = mergedRules[selector][property];
                const declaration = postcss.decl({ prop: property, value: value });

                if (important) {
                    declaration.important = true;
                }

                rule.append(declaration);
            });

            root.append(rule);
        });
    };
});

// 使用 PostCSS 处理合并样式
postcss([mergeStylesPlugin])
    .process(css1 + css2)
    .then(result => {
        console.log(result.css);
    });
