import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ConnectionStatus = 'connected' | 'disconnected' | 'error' | 'connecting';

interface WebSocketState {
  status: ConnectionStatus;
  error: string | null;
}

const initialState: WebSocketState = {
  status: 'disconnected',
  error: null
};

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<ConnectionStatus>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'error';
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { setConnectionStatus, setError, clearError } = websocketSlice.actions;
export default websocketSlice.reducer; 