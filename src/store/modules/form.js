export default ({
    state: {
        listDistance: [{
            id: 1,
            value: "3"
        }, {
            id: 2,
            value: "5"
        }, {
            id: 3,
            value: "10"
        }],
    },
    mutations: {},
    actions: {},
    getters: {
        listDistance(state) {
            return state.listDistance
        }
    }
})