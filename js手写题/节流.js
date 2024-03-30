//节流：在指定时间内，函数只会被调用一次，
function throttled1(fn, delay = 500) {
  let oldtime = Date.now();
  return function (...args) {
    let newtime = Date.now();
    if (newtime - oldtime >= delay) {
      fn(args)
      oldtime = Date.now();
    }
  };
}
































function main(fn,delay) {
  let oldTime=Date.now()
  return function(...args){
    let newTime =Date.now()
    let context =this
    if(newTime - oldTime >= delay){
      fn.apply(context,args)
      oldTime=Date.now()
    }
  }

}