// ///<reference types="moment"/>
// import * as moment from 'moment'

declare function setTitle(title: string | number): void

declare function getTitle(): string

declare let documentTitle: string

interface String {
    getFirstLetter(): string
}