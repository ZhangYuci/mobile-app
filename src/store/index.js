import { createStore } from 'vuex';

const moduleFiles = import.meta.glob('./modules/*.js', {
    eager: true,
});

let modules = {};
for (let key in moduleFiles) {
    let prop = /\.\/modules\/(\w+)\.js/.exec(key)[1];
    let value = moduleFiles[key].default;
    modules[prop] = value;
}

export default createStore({
    modules
});
