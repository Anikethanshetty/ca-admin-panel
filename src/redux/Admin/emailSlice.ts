import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface EmailState {
  email: string | null
}

const initialState: EmailState = {
  email: null,
}

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
})

export const { setEmail } = emailSlice.actions
export default emailSlice.reducer
