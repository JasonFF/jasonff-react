
const TRUCK_LOAD = 'TRUCK_LOAD';
const TRUCK_UNLOAD = 'TRUCK_UNLOAD';
const initialState = {
}

function truck_load (data,name){
    return {
        type: TRUCK_LOAD,
        data: data,
        name: name
    }
}

function truck_unload (data,name){
    return {
        type: TRUCK_UNLOAD,
        name: name
    }
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'TRUCK_LOAD':
            return Object.assign({},state,{[action.name]:Object.assign({},state[action.name],action.data[action.name])});
        case 'TRUCK_UNLOAD':
            delete state[action.name]
            return state
        default:
            return state;
    }
}

export function truck (data,name,unload){
    if (unload) {
        return (dispatch)=>{
            dispatch(truck_unload(null,name))
        }
    }
    return (dispatch)=>{
        dispatch(truck_load(data,name))
    }
}
