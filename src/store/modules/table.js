import data from '../../assets/users.json'
import _ from 'lodash'
export default ({
    state: {
        tableData: data,
    },
    mutations: {
        addUser(state, payload) {
            state.tableData.users.push(payload)
        },
        sortTable(state, payload) {
            let arrayUser = state.tableData.users
            arrayUser.sort((a, b) => {
                if (payload == 'date') {
                    if (new Date(a[payload]) < new Date(b[payload])) {
                        return -1;
                    }
                    if (new Date((a[payload])) > new Date(b[payload])) {
                        return 1;
                    }
                    return 0;
                } else {
                    if (a[payload] < b[payload]) {
                        return -1;
                    }
                    if (a[payload] > b[payload]) {
                        return 1;
                    }
                    return 0;
                }

            })
        },
        sortTablePlus(state, payload) {
            let arrayUser = state.tableData.users
            arrayUser.sort((a, b) => {
                if (payload == 'date') {
                    if (new Date(a[payload]) < new Date(b[payload])) {
                        return 1;
                    }
                    if (new Date((a[payload])) > new Date(b[payload])) {
                        return -1;
                    }
                    return 0;
                } else {
                    if (a[payload] < b[payload]) {
                        return 1;
                    }
                    if (a[payload] > b[payload]) {
                        return -1;
                    }
                    return 0;
                }
            })
        }
    },
    actions: {
        addUser(context, payload) {
            context.commit('addUser', payload);
        },
        sortTable(context, payload) {
            context.commit('sortTable', payload);
        },
        sortTablePlus(context, payload) {
            context.commit('sortTablePlus', payload);
        },
    },
    getters: {
        tableDataId(state) {
            return state.tableData
        },
        tableData(state) {
            console.log(state.tableData.users);
            let tableData = _.chunk(state.tableData.users, 2)
            return tableData
        }
    }
})