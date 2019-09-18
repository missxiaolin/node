// import { name } from './b'
// import * as info from './b'
// import { name as nameProp } from './b'
// import moment from 'moment'
// import * as moment from 'moment'
// import moment = require('moment')
/// <reference path="./letter-validation.ts"/>
/// <reference path="./number-validation.ts"/>
// import './a'
// import * as AData from './a'
// import name = require('./c')
// import name from './c'
// console.log(moment)
let isLetter = Validation.checkLetter('abc')
let isNumber = Validation.checkNumber('abc')
// console.log(isLetter, isNumber)

namespace Shapes {
    export namespace Polygons {
        export class Triangle {}
        export class Squaire {}
    }
}
import polygons = Shapes.Polygons
let triangle = new polygons.Triangle()

// 相对导入  /  ./  ../
// './a'
// '../modules/a.js'
