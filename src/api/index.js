
const moduleFiles = import.meta.glob('./model/*.js', {
    eager: true,
});

const modules = {};

for (let key in moduleFiles) {
    let prop = /\.\/model\/(\w+)\.js/.exec(key)[1];
    let value = moduleFiles[key].default;
    modules[prop] = value;
}


export default modules;