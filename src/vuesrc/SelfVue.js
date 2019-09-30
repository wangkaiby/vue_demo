//将Observer和Watcher关联起来
function SelfVue(data,el,exp) {
    this.data = data;
    observe(data, this);
    // this.data.name = '5'
    el.innerHTML = this.data[exp];
    new Watcher(this,exp,function(value) {
        el.innerHTML = value;
    });
    return this
}
