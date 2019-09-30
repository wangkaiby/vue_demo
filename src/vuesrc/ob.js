function defineReactive(data,key,val,vm) {
    observe(val, vm);
    var dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            if (dep.target) {    //Watcher初始化触发
                dep.addSub(this); // 在这里添加一个订阅者
            }
            return val;
        },
        set: function(newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
            dep.notify(); // 如果数据变化，通知所有订阅者
        }
    });
}

function observe(data, vm) {
    if(!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(function(key){
        defineReactive(data,key,data[key],vm);
    });
}

function Dep() {
    this.subs = [];
}

//prototype 属性使您有能力向对象添加属性和方法
//prototype这个属性只有函数对象才有，具体的说就是构造函数具有.只要你声明定义了一个函数对象，这个prototype就会存在
//对象实例是没有这个属性
Dep.prototype = {                        
    addSub:function(sub) {
        this.subs.push(sub);
    },
    notify:function() {
        this.subs.forEach(function(sub) {
            sub.update();        //通知每个订阅者检查更新
        })
    }
}
Dep.target = null;