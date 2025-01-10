// fetch('')

const remoteMaterials = [
    {
        type: 'feishu',
        description: '飞书文档',
        url: 'https://www.feishu.cn/xxxxx'
    }
]

async function loadRemoteMaterial(url) {
    // const response = await import(url);
    const response = await fetch(url);
}

const BlockRenderer = ({ block }) => {
    
}