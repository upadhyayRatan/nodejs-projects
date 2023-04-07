const sum=(a=1,b=2)=>{
    console.log(a+b);
}

const transaction=(type,{label,stock=0}={})=>{
    console.log(type,label,stock);
}
transaction('saving')
sum(2,3);
sum();