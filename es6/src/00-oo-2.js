class People {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    eat() {
        console.log(`${this.name} eat something`)
    }
    speak() {
        alconsole.logert(`My name is ${this.name}, age ${this.age}`)
    }
}

class Student extends People {
    constructor(name, age, number) {
        super(name, age)
        this.number = number
    }
    study() {
        console.log(`${this.name} study`)
    }
}

let xiaoming = new Student('xiaoming', 10, 'A1')
xiaoming.study()
console.log(xiaoming.number)
let xiaohong = new Student('xiaohong', 11, 'A2')
xiaohong.study()

