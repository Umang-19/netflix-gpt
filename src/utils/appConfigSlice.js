import { createSlice } from "@reduxjs/toolkit";

const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState: {
        preferredLanguage: "en",
    },
    reducers: {
        modifyPreferredLanguage: (state, action) =>{
            state.preferredLanguage = action.payload
        },
    },
});

export const {modifyPreferredLanguage} = appConfigSlice.actions;

export default appConfigSlice.reducer;