import React, {useContext, createContext, useState} from "react";

const BookContext = createContext({});


const BookContextProvider = ({ children }) => {
    const [currentBook, setCurrentBook] = useState({
        selectedBook: 'Genesis',
        selectedChapter: 1
    });
    const [selectedVerseToEdit, setSelectedVerseToEdit] = useState({
        verse: '',
        verseNumber: '',
        verseChapter: '',
        verseBook: '',
        verseImage: ''
    })

    const [fontData, setFontData] = useState({
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: '#000',
        opacity: 1,
        blur: 0,
        brightness: 0
    })

    const [
        compareModalVisible, setCompareModalVisible
    ] = useState(false)


    const [version, setVersion] = useState({})

    const value = { 
        currentBook, 
        setCurrentBook, 
        selectedVerseToEdit, 
        setSelectedVerseToEdit,
        fontData,
        setFontData,
        compareModalVisible,
        setCompareModalVisible,
        version,
        setVersion
     }
    return <BookContext.Provider value={value}>{children}</BookContext.Provider>

}

export const useBook = () => useContext(BookContext);

export default BookContextProvider