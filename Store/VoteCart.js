import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  votesWithLocation: [],
  votesWithoutLocation: [],
};

const VoteCartSlice = createSlice({
  name: "VoteCart",
  initialState: initialState,
  reducers: {
    AddVoteWithLocation(state, action) {
      console.log("AddVoteWithLocation", action.payload);
      const newVote = action.payload;
      state.votesWithLocation.push(newVote);
    },

    RemoveVoteWithLocation(state) {
      if (state.votesWithLocation.length > 0) {
        state.votesWithLocation.pop();
      }
    },

    AddVoteWithoutLocation(state, action) {
      console.log("AddVoteWithoutLocation", action.payload);
      const newVote = action.payload;
      state.votesWithoutLocation.push(newVote);
    },

    RemoveVoteWithoutLocation(state) {
      if (state.votesWithoutLocation.length > 0) {
        state.votesWithoutLocation.pop();
      }
    },
  },
});

export const {
  AddVoteWithLocation,
  RemoveVoteWithLocation,
  AddVoteWithoutLocation,
  RemoveVoteWithoutLocation,
} = VoteCartSlice.actions;
export default VoteCartSlice.reducer;
