import { configureStore } from "@reduxjs/toolkit";
import appSettingsReducer from "./features/appSettings.slice"

const store = configureStore({
    reducer: {
        appSettingsReducer: appSettingsReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;