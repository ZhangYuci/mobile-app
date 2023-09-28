export default {
    namespaced: true,
    state: {
        count: 2
    },
    getters: {
        getCount(state) {
            return state.count;
        }
    },
    mutations: {
        addCount(state) {
            state.count++;
        }
    },
    actions: {
        
    }
}