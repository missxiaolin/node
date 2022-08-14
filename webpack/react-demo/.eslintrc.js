module.exports = {
    extends: ['react-app'],
    rules: {
        'react/jsx-uses-react': [2],
        // 提示要在jsx文件手动引入react
        'react/react-in-jsx-scope': [2]
    },
    overrides: [{
        files: ['*.ts', '*.jsx'],
        parserOptions: {
            project: './tsconfig.json'
        },
        extends: ['airbnb-typescript'],
        rules: {
            '@typescript-eslint/object-curly-spacing': [0],
            'import/prefer-default-export': [0],
            '@typescript-eslint/semi': [0],
            'import/no-anonymous-default-expor': [0]
        }
    }]
}