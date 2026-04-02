import { createSlice } from "@reduxjs/toolkit"

const userFromStorage = localStorage.getItem("user");


const initialState={
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
    isAuthenticated: userFromStorage ? true : false
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSucces:(state,action)=> {
            state.user=action.payload;
            state.isAuthenticated = true;

            localStorage.setItem("user",JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem("user");
    }
    }
})
export const {loginSucces,logout}=authSlice.actions;
export default authSlice.reducer;