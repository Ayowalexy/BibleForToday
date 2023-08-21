import { createSlice } from '@reduxjs/toolkit'

const fontSettings = {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: "",
    textAlign: '',
    color: '#000',
    backgroundColor: '#fff'
}

const initialState = {
    allFonts: fontSettings
}

export const fontSlice = createSlice({
    name: 'fonts',
    initialState,
    reducers: {
        setFontSettings: (state, action) => {
            return {
                ...state,
                allFonts: action.payload
            }
        }
    },

})

export const fontReducer = fontSlice.reducer;
export default fontSlice.reducer;
export const { setFontSettings } = fontSlice.actions