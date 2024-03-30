setTimeout(function(){
    console.log('timeout1')
})
new Promise(function(reolve){
    console.log('promise1');
    // for(var i=0;i<3;i++){
    //     console.log(i);
        reolve()
    // }
    console.log('promise2');
    
}).then(function(){
    console.log('then1');
})
console.log("global1");
