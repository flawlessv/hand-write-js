var arr = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
   ]
const resultArr=[]
const length=arr.length
let count=1
for(let i=length;i>0;i--){
    for(let row=0;row<i;row++){
      let clo=length-i
      const value=arr[row][clo]
      resultArr.push(value)
    }
    let arrSlice=arr[length-count].slice(count++)
    resultArr.push(...arrSlice)
}
console.log(resultArr);