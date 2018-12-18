export default function reducerClick (state={}, action) {
    let ret = JSON.parse(JSON.stringify(state));
    switch(action.type) {
        case "FETCHING_END": {
            ret.name = "aaaaaaaaaaaa";
            return ret;
        }
        case "ACTION_TWO": {
            ret.surname = action.payload;
            return ret;
        }
        default:
            return ret;
    }
}