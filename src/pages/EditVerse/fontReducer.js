import { TYPES } from "./types";

export const initialState = {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
    opacity: 1
}

const reducer = (state, action) => {
    switch (action.type) {
        case TYPES.FONT_FAMILY:
            return {
                ...state, fontFamily: action.payload
            }
        case TYPES.FONT_SIZE:
            return {
                ...state, fontSize: action.payload
            }
        default:
            return state;
    }
};

export default reducer