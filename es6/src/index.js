class Person {
    constructor(name){
        this.name = name
    }
    
    getNanem(){
        return this.name
    }
}
let p = new Person('xiaolin')
alert(p.getNanem())