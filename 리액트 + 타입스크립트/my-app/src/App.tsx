import React from 'react';
import './App.css';

let name:string = "jaekwan"
let age:number | string
age = "40"

let isStudent:boolean = false
let hobbies:string[]
let role:[number, string]

let printName = (name:string) => {
  console.log(name)
}
printName("jaekwan")

// type Person = {
//   name: string,
//   age?: number,
// }

// let person:Person = {
//   name: "jaekwan",
//   // age: 40,
// }

// let lotsOfPeaple:Person[]

interface Person {
  name: string,
  age?: number,
}

interface guy extends Person {
  profession: string,
}

let guy:guy = {
  name: 'jaekwan',
  profession: 'a'
}

class User {
  name: string
  constructor(name:string) {
    this.name = name;
  }
}

// Tuple
let arr: [string, number] = ['hi', 10]
console.log(arr[0])

// Enum
enum Avengers {Capt, Ironman, Thor, Hulk}
// 이넘의 인덱스 값을 사용자 편의대로 변경 가능.
// enum Avengers {Capt = 2, Ironman, Thor, Hulk}
let hero = Avengers[2]
console.log(hero)

// Void
let unuseful: void = undefined
const notuse = ():void => {
  console.log('sth')
}
notuse()

// Never
const neverEnd = (): never => {
  while(true) {
    console.log('여기는 실행되지 않아요.')
  }
}
// neverEnd();


function App() {
  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
