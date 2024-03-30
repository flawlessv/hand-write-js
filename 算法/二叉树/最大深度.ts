var maxdepth = function(root) {
    if (root === null) return 0;
    return 1 + Math.max(maxdepth(root.left), maxdepth(root.right))
};