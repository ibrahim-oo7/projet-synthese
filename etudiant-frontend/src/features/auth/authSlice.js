import { createSlice } from "@reduxjs/toolkit"

const initialState={
    user: null,
    isAuthenticated: false
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
            localStorage.removeItem("token");
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
            if (!action.payload) {
                state.user = null;
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        },
        updateUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        }
    }
})
export const {loginSucces,logout,setAuthenticated,updateUser}=authSlice.actions;
export default authSlice.reducer;