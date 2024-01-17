function cal(salary) {
  // TODO: 在此处补充代码
  if (salary <= 5000) {
    return 0;
  } else if (5000 < salary&& salary<= 9000) {
    let result = (salary - 5000) * 0.03;
    console.log(result,'5000 < salary <= 9000');

    return result;
  } else if (9000 < salary&& salary <= 15000) {
    let result = (salary - 5000) * 0.05;
    console.log(result,'9000 < salary <= 15000');
    return result;
  } else {
    let result = (salary - 5000) * 0.1;
    console.log(result,'15000+0');

    return result;
  }
}
module.exports = cal; //请勿删除
