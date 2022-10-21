import {createSlice} from '@reduxjs/toolkit';

export interface preferencesState {
  width: number;
  height: number;
  mines: number;
}

const initialState: preferencesState = {
  width: 20,
  height: 10,
  mines: 50,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    updatePreferences: (state, {payload}) => {
      return payload;
    },
  },
  extraReducers: {},
});

const {actions, reducer: preferences_reducers} = preferencesSlice;
export const {updatePreferences} = actions;
export default preferences_reducers;
