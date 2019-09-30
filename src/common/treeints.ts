
interface findRecursiveType {
    (
        obj: object,
        childrenKey: string,
        fn?: Function
    ): any
}
let pathList: Array<any> = [];
let flattenList: Array<any> = [];



let findRecursive: findRecursiveType = (obj:object, childrenKey: string, fn: Function, ) => {
    if (fn(obj)) return obj;
    else if (obj[childrenKey]) {
      for (let child of obj[childrenKey]) {
        let childrenResult = findRecursive(child, childrenKey, fn);
        if (childrenResult) return childrenResult;
      }
    }
    return null;
  }

  let findPathRecursive: findRecursiveType = (obj:object, childrenKey: string, fn: Function ) => {
    pathList.push(obj);
    if (fn(obj)) return pathList;
    else if (obj[childrenKey]) {
      for (let child of obj[childrenKey]) {
        let childrenResult = findPathRecursive(child, childrenKey, fn);
        if (childrenResult) return childrenResult;
      }
      pathList.pop();
    } else {
      pathList.pop();
    }
    return null;
  }

  let flattenRecursive: findRecursiveType = (obj, childrenKey) => {
    flattenList.push(obj);
    if (obj[childrenKey]) {
      for (let child of obj[childrenKey]) {
        flattenRecursive(child, childrenKey);
      }
    }
    return flattenList;
  }

  let mapRecursive: findRecursiveType = (obj, childrenKey, fn) => {
    let newItem = {...fn(obj)};
    if (obj[childrenKey]) newItem[childrenKey] = obj[childrenKey].map(child=> mapRecursive(child, childrenKey, fn));
    return newItem;
  }


  class Tree {
    childrenKey: string
    src: any
    constructor(arrOrObj: any, childrenKey: string = 'children') {
      this.src = arrOrObj || {};
      this.childrenKey = childrenKey;
    }
  
    /**
     * 获取所有最底层节点，最底层节点为没有子节点的节点
     * @returns {Array<Tree>} 所有最底层节点子树构成的数组
     */
    bottoms() {
      return this.flatten().filter(item => !item.children().length);
    }
  
    /**
     * 返回该节点的子节点列表, 没有则为空数组
     * @returns {Array<Tree>} 子节点列表
     */
    children() {
      if (!this.src.children) return [];
      else return this.src.children.map(child => new Tree(child, this.childrenKey));
    }
  
    /**
     * 判断两棵树是否相等，通过指定的key来判断
     * 如果不传key参数，默认搜索对象中的id判断
     * @param {Tree} anotherTree 另一棵树
     * @param {String} key 判断key
     * @returns {Boolean}
     */
    equals(anotherTree, key = 'id') {
      return this.src[key] && anotherTree.src[key] && this.src[key] === anotherTree.src[key];
    }
  
    /**
     * 查找树中的一个节点
     * @param {Function} fn 查找判断方法，通过返回值falsy状态判断是否是查找目标
     * @returns {Tree} 结果节点子树，如果没有找到返回一个空树
     */
    find(fn) {
      return new Tree(findRecursive(this.src, this.childrenKey, fn), this.childrenKey);
    }
  
    /**
     * 查找树中到某一节点所经过的路径
     * @param {Function} fn 查找判断方法，通过返回值falsy状态判断是否是查找目标
     * @returns {Array<Tree>} 到所查找项的路径节点子树数组，由上层至下层。
     * 例： [1, 2:[3, 4, 5: [6, 7]]] 查找7 会返回 [2, 5, 7]
     */
    findPath(fn) {
      pathList = [];
      let result = findPathRecursive(this.src, this.childrenKey, fn);
      if (result) return result.map(item => new Tree(item, this.childrenKey));
      else return [];
    }
  
    /**
     * 查找树中与某一节点同级节点数组，包括自身
     * @param {Tree} childTree
     * @returns {Array<Tree>}
     */
    findSiblings(fn) {
      let path = this.findPath(fn);
      if (path.length < 2) return this;
      else return path[path.length - 2].children();
    }
  
    /**
     * 将所有层级的节点展平为一个数组
     * @returns {Array<Tree>} 所有节点子树构成的数组
     */
    flatten() {
      flattenList = [];
      return flattenRecursive(this.src, this.childrenKey).map(item => new Tree(item, this.childrenKey));
    }
  
    /**
     * 判断是否为空树
     * @returns {Boolean}
     */
    isEmpty() {
      return Object.keys(this.src).length === 0;
    }
  
  
    /**
     * 遍历整个树执行动作，返回一棵拓扑结构相同的新树，用法类似Array.map
     * @param {Function} fn 遍历方法，需要返回新节点对象。
     */
    map(fn) {
      return new Tree(mapRecursive(this.src, this.childrenKey, fn), this.childrenKey);
    }
  
    /**
     * 返回树的src
     */
    findSrc() {
      return this.src;
    }
  }
  
  
  export default  (obj, childrenKey = 'children') => {
    return new Tree(obj || {}, childrenKey);
  }
  
  