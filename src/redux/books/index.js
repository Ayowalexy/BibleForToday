import { createSlice } from '@reduxjs/toolkit'
import { getTranslations, getVerse } from './thunkActions'

const bootmarkTypes = {
    like: false,
    verse: '',
    verseNumber: '',
    verseChapter: '',
    verseBook: '',
    verseImage: '',
    date: ''
}

const notesTypes = {
    like: false,
    verse: '',
    verseNumber: '',
    verseChapter: '',
    verseBook: '',
    verseImage: '',
    note: '',
    date: ''
}

const initialState = {
    loading: false,
    verses: [],
    compareVersion: [],
    isLoading: 'idle',
    versionTitles: [{
        abbr: '',
        full: ''
    }],
    notes: [],
    bookmarks: []
}

export const verseSlice = createSlice({
    name: 'verses',
    initialState,
    reducers: {
        removeVersion: (state, action) => {
            const bookId = state.compareVersion.findIndex(ele => ele.abbr === action.payload.abbr);

            console.log('Matching book', bookId)
            return {
                ...state
            }
        },
        addVersionTitle: (state, action) => {
            const added = state.versionTitles.find(ele => ele.abbr === action.payload.abbr)            
            return {
                ...state,
                versionTitles: added ? [...state.versionTitles] : [...state.versionTitles, action.payload]
            }
        },
        clearBooks: (state, action) => {
            return {
                ...state,
                versionTitles: [],
                compareVersion: []
            }
        },
        addNote: (state, action) => {
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        }, 
        deleteNote: (state, action) => {
            const index = state.notes.findIndex(ele => ele.verse === action.payload);
            const res = [...state.notes]
            res.splice(index, 1)
            return {
                ...state,
                notes: res
            }
        },
        addBookmark: (state, action) => {
            return {
                ...state,
                bookmarks: [...state.bookmarks, action.payload]
            }
        },
        deleteBookmark: (state, action) => {
            const index = state.bookmarks.findIndex(ele => ele.verse === action.payload);
            const res = [...state.bookmarks]
            res.splice(index, 1)
            return {
                ...state,
                bookmarks: res
            }
        },
        likeNote: (state, action) => {
            return {
                ...state,
                notes: action.payload
            }

        },
        likeBookmark: (state, action) => {
            return {
                ...state,
                bookmarks: action.payload
            }

        }
    },

    extraReducers: (builder) => {

        builder.addCase(getTranslations.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(getTranslations.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                verses: action.payload
            }
        })

        builder.addCase(getTranslations.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

        //get verse translation
        builder.addCase(getVerse.pending, (state) => {
            return { ...state, isLoading: 'pending' }
        });

        builder.addCase(getVerse.fulfilled, (state, action) => {

            const data = state.versionTitles[state.versionTitles.length - 1]

            return {
                ...state,
                isLoading: 'successful',
                compareVersion: [...state.compareVersion, {...action.payload, abbr: data?.abbr, full: data?.full}]
            }
        })

        builder.addCase(getVerse.rejected, (state, action) => {
            return { ...state, isLoading: 'failed' }
        })


    },

})

export const verseReducer = verseSlice.reducer;
export default verseSlice.reducer;
export const { 
    removeVersion, 
    addVersionTitle, 
    clearBooks,
    addNote,
    addBookmark,
    deleteNote,
    deleteBookmark,
    likeNote,
    likeBookmark
 } = verseSlice.actions
