Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
      // 参数可以不是数组，但必须具有 Iterator 接口
      if (typeof promises[Symbol.iterator] !== "function") {
        reject("Type error");
      }
      if (promises.length === 0) {
        resolve([]);
      } else {
        const res = [];
        let count = 0;
        const len = promises.length;
        for (let i = 0; i < len; i++) {
          //考虑到 promises[i] 可能是 thenable 对象也可能是普通值
          Promise.resolve(promises[i])
            .then((data) => {
              res[i] = data;
              if (++count === len) {
                resolve(res);
              }
            })
            .catch((err) => {
              reject(err);
            });
        }
      }
    });
  };