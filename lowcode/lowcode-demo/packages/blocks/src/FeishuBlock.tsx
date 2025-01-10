/**
 * 数据协议
 * type FeishuBlock = {
    type: 'feishu',
    props: {
        docId: string;
    },
    style: {
        color: string;
        bgColor: string;
        lineHeight: number | string
    },
    events: {

    },
    lifeCircle: {
        onInit() {},
        onDestroy() {}
    }
}
 */

export const FeishuBlockRenderer = () => {
  return (
    <div>
      <h1>Feishu Block</h1>
      <p>Feishu Block Content</p>
    </div>
  );
};
