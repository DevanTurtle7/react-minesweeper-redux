import {createSelector} from '@reduxjs/toolkit';
import {preferencesState} from 'redux/slices/preferences_slice';
import {ReduxState} from 'types';

export const selectPreferences = createSelector(
  (state: ReduxState) => state.preferences,
  (preferences: preferencesState) => preferences
);
