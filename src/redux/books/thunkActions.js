import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useAxios from "../../utils/useAxios";
import { books_url } from "../../utils/routes";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";



export const getTranslations = createAsyncThunk(
  "verses/translations",
  async (data, thunkAPI) => {

    const url = `${books_url}/translations`

    try {
      const response = await useAxios({
        url: url,
        method: "get",
      });

      return response.data;
    } catch (error) {
      console.log(JSON.stringify(error))
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${error.response.data}` || 'Something went wrong'
      });
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);


export const getVerse = createAsyncThunk(
  "verses/getVerse",
  async (data, thunkAPI) => {

    const {
      book,
      chapter,
      verse,
      translation
    } = data

    const url = `${books_url}/books/${book}/chapters/${chapter}/${verse}`

    try {
      const response = await useAxios({
        url: url,
        method: "get",
        params: {
          translation
        }
      });

      return response.data;
    } catch (error) {
      console.log(JSON.stringify(error))
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${error.response.data}` || 'Something went wrong'
      });
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

