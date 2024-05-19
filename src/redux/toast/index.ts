import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
  visible: boolean;
  message: string;
}

const initialState: SnackbarState = {
  visible: false,
  message: '',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.visible = true;
    },
    hideSnackbar: (state) => {
      state.message = '';
      state.visible = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;