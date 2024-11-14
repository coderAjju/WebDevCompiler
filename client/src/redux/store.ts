import { configureStore } from "@reduxjs/toolkit";
import compilerSlice from './slice/CompilerSlice'
export const store = configureStore({

  reducer: {
    compilerSlice: compilerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;