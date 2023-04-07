const fs=require('fs')
const book={
    title:'Ego is the enemy',
    author:'Ryan Holiday'
}

const bufferData=fs.readFileSync('1-json.json');
const jsonData=bufferData.toString();
let data=JSON.parse(jsonData)
data.planet="Earth"
console.log(data)
fs.writeFileSync('1-json.json',JSON.stringify(data))


// const jsonBook=JSON.stringify(book)//converts to JSON
// fs.writeFileSync('1-json.json',jsonBook)
// const dataBuffer=fs.readFileSync('1-json.json')
// const dataJson=dataBuffer.toString();
// console.log(dataJson)
// const data=JSON.parse(dataJson);
// console.log(data.title)
// console.log(jsonBook)
// console.log(JSON.parse(jsonBook))