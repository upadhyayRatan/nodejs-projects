const {celciusToFahreneit,add}=require('../Math')
test('Hello test',()=>{})
// test('Hello test',()=>{
//     throw new Error("Falied")
// })

test('Check celcieus to fahreneit',()=>{
    const result=celciusToFahreneit(10);
    expect(result).toBe(50);
})

test('async test demo',(done)=>{
    setTimeout(()=>{
        expect(2).toBe(2);
        done();
    },2000)
})

test('test async using then',(done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5);
        done()
    })
})

test('async using async await',async()=>{
    const sum=await add(3,5);
    expect(sum).toBe(8);
})