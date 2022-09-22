<template>
    <div ref="list" class="list-container" @scroll="scrollEvent(e)">
        <div class="list-real" :style="{ height: listHeight + 'px' }"></div>
        <div class="list" :style="{ transform: getTransform }">
            <div class="item" v-for="item in viewData" :key="item.id">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
let mockData = [];
for (let i = 0; i < 10000; i++) {
    mockData.push({ id: i, name: '前端' + i });
}
export default {
    name: 'List',
    data() {
        return {
            //可视区域高度
            screenHeight: 500,
            //偏移量
            startOffset: 0,
            //起始索引
            start: 0,
            //结束索引
            end: null,
            itemSize: 50,
            listData: mockData
        };
    },
    computed: {
        //列表总高度
        listHeight() {
            return this.listData.length * this.itemSize;
        },
        //可显示的列表项数
        count() {
            return Math.ceil(this.screenHeight / this.itemSize);
        },
        //偏移量对应的style
        getTransform() {
            return `translate3d(0,${this.startOffset}px,0)`;
        },
        //获取真实显示列表数据
        viewData() {
            return this.listData.slice(this.start, Math.min(this.end, this.listData.length));
        }
    },
    mounted() {
        // this.screenHeight = 500;
        this.start = 0;
        this.end = this.start + this.count;
    },
    methods: {
        scrollEvent() {
            //当前滚动位置
            let scrollTop = this.$refs.list.scrollTop;
            //此时的开始索引
            this.start = Math.floor(scrollTop / this.itemSize);
            //此时的结束索引
            this.end = this.start + this.count;
            //此时的偏移量
            this.startOffset = scrollTop - (scrollTop % this.itemSize);
        }
    }
};
</script>

<style scoped>
.list-container {
    height: 500px;
    overflow: auto;
    position: relative;
}

.list-real {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

.list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    text-align: center;
}

.item {
    padding: 10px;
    color: #555;
    box-sizing: border-box;
    border-bottom: 1px solid #999;
    height: 50px;
    line-height: 50px;
    font-weight: 500;
    background: #47e960;
}
</style>