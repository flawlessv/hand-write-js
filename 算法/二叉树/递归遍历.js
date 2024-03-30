const preorderTraversal = function(root) {
    let res=[];
    const dfs=function(root){
        if(root===null)return ;
        //先序遍历所以从父节点开始
        res.push(root.val);
        //递归左子树
        dfs(root.left);
        //递归右子树
        dfs(root.right);
    }
    //只使用一个参数 使用闭包进行存储结果
    dfs(root);
    return res;
   };

const main(root){
  const res=[]
  function tr(root){
     if(root===null) return
     res.push(root.val)
     tr(root.left)
     tr(root.right)

  }
tr(root)
return res
}