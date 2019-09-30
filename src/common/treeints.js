"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var pathList = [];
var flattenList = [];
var findRecursive = function (obj, childrenKey, fn) {
    if (fn(obj))
        return obj;
    else if (obj[childrenKey]) {
        for (var _i = 0, _a = obj[childrenKey]; _i < _a.length; _i++) {
            var child = _a[_i];
            var childrenResult = findRecursive(child, childrenKey, fn);
            if (childrenResult)
                return childrenResult;
        }
    }
    return null;
};
var findPathRecursive = function (obj, childrenKey, fn) {
    pathList.push(obj);
    if (fn(obj))
        return pathList;
    else if (obj[childrenKey]) {
        for (var _i = 0, _a = obj[childrenKey]; _i < _a.length; _i++) {
            var child = _a[_i];
            var childrenResult = findPathRecursive(child, childrenKey, fn);
            if (childrenResult)
                return childrenResult;
        }
        pathList.pop();
    }
    else {
        pathList.pop();
    }
    return null;
};
var flattenRecursive = function (obj, childrenKey) {
    flattenList.push(obj);
    if (obj[childrenKey]) {
        for (var _i = 0, _a = obj[childrenKey]; _i < _a.length; _i++) {
            var child = _a[_i];
            flattenRecursive(child, childrenKey);
        }
    }
    return flattenList;
};
var mapRecursive = function (obj, childrenKey, fn) {
    var newItem = __assign({}, fn(obj));
    if (obj[childrenKey])
        newItem[childrenKey] = obj[childrenKey].map(function (child) { return mapRecursive(child, childrenKey, fn); });
    return newItem;
};
var Tree = /** @class */ (function () {
    function Tree(arrOrObj, childrenKey) {
        if (childrenKey === void 0) { childrenKey = 'children'; }
        this.src = arrOrObj || {};
        this.childrenKey = childrenKey;
    }
    /**
     * 获取所有最底层节点，最底层节点为没有子节点的节点
     * @returns {Array<Tree>} 所有最底层节点子树构成的数组
     */
    Tree.prototype.bottoms = function () {
        return this.flatten().filter(function (item) { return !item.children().length; });
    };
    /**
     * 返回该节点的子节点列表, 没有则为空数组
     * @returns {Array<Tree>} 子节点列表
     */
    Tree.prototype.children = function () {
        var _this = this;
        if (!this.src.children)
            return [];
        else
            return this.src.children.map(function (child) { return new Tree(child, _this.childrenKey); });
    };
    /**
     * 判断两棵树是否相等，通过指定的key来判断
     * 如果不传key参数，默认搜索对象中的id判断
     * @param {Tree} anotherTree 另一棵树
     * @param {String} key 判断key
     * @returns {Boolean}
     */
    Tree.prototype.equals = function (anotherTree, key) {
        if (key === void 0) { key = 'id'; }
        return this.src[key] && anotherTree.src[key] && this.src[key] === anotherTree.src[key];
    };
    /**
     * 查找树中的一个节点
     * @param {Function} fn 查找判断方法，通过返回值falsy状态判断是否是查找目标
     * @returns {Tree} 结果节点子树，如果没有找到返回一个空树
     */
    Tree.prototype.find = function (fn) {
        return new Tree(findRecursive(this.src, this.childrenKey, fn), this.childrenKey);
    };
    /**
     * 查找树中到某一节点所经过的路径
     * @param {Function} fn 查找判断方法，通过返回值falsy状态判断是否是查找目标
     * @returns {Array<Tree>} 到所查找项的路径节点子树数组，由上层至下层。
     * 例： [1, 2:[3, 4, 5: [6, 7]]] 查找7 会返回 [2, 5, 7]
     */
    Tree.prototype.findPath = function (fn) {
        var _this = this;
        pathList = [];
        var result = findPathRecursive(this.src, this.childrenKey, fn);
        if (result)
            return result.map(function (item) { return new Tree(item, _this.childrenKey); });
        else
            return [];
    };
    /**
     * 查找树中与某一节点同级节点数组，包括自身
     * @param {Tree} childTree
     * @returns {Array<Tree>}
     */
    Tree.prototype.findSiblings = function (fn) {
        var path = this.findPath(fn);
        if (path.length < 2)
            return this;
        else
            return path[path.length - 2].children();
    };
    /**
     * 将所有层级的节点展平为一个数组
     * @returns {Array<Tree>} 所有节点子树构成的数组
     */
    Tree.prototype.flatten = function () {
        var _this = this;
        flattenList = [];
        return flattenRecursive(this.src, this.childrenKey).map(function (item) { return new Tree(item, _this.childrenKey); });
    };
    /**
     * 判断是否为空树
     * @returns {Boolean}
     */
    Tree.prototype.isEmpty = function () {
        return Object.keys(this.src).length === 0;
    };
    /**
     * 遍历整个树执行动作，返回一棵拓扑结构相同的新树，用法类似Array.map
     * @param {Function} fn 遍历方法，需要返回新节点对象。
     */
    Tree.prototype.map = function (fn) {
        return new Tree(mapRecursive(this.src, this.childrenKey, fn), this.childrenKey);
    };
    /**
     * 返回树的src
     */
    Tree.prototype.findSrc = function () {
        return this.src;
    };
    return Tree;
}());
function default_1(obj, childrenKey) {
    if (childrenKey === void 0) { childrenKey = 'children'; }
    return new Tree(obj || {}, childrenKey);
}
exports["default"] = default_1;
console.log(exports);

