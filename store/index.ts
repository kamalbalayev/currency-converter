import {defineStore} from 'pinia'

interface Param {
    key: string,
    value: any
}

export const useStore = defineStore('app', () => {

    const state: any = reactive({})

    const GET_STATE = (key: string) => state[key]

    const SET_STATE = (param: Param) => state[param.key] = param.value

    return {
        state,
        GET_STATE,
        SET_STATE,
    }

})
