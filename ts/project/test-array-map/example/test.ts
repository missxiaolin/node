import arrayMap = require('test-array-map')
arrayMap([1, 2], (item) => {
    return item + 2
}).forEach((item) => {
    item.toFixed()
})
