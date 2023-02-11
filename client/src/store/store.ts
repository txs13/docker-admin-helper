import { configureStore } from "@reduxjs/toolkit";
import appSettingsReducer from "./features/appSettings.slice"
import appStateReducer from "./features/appState.slice"

const store = configureStore({
    reducer: {
        appSettings: appSettingsReducer,
        appState: appStateReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;