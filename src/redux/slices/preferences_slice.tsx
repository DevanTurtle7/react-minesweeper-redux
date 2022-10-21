import {createSlice} from '@reduxjs/toolkit';

export interface preferencesState {
  width: number;
  height: number;
  mineCount: number;
}

const initialState: preferencesState = {
  width: 20,
  height: 10,
  mineCount: 50,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setPreferences: (state, {payload}) => {
      return payload;
    },
  },
  extraReducers: {},
});

const {actions, reducer: preferences_reducers} = preferencesSlice;
export const {setPreferences} = actions;
export default preferences_reducers;
