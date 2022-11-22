import { actionTypes } from "./Actions";

const _loadUsers = (state, action) => {
  const { users } = action.payload;
  for (u of users) {
    console.log("loading user", u);
  }
  return {
    ...state,
    users: users,
  };
};

const initialState = {
  users: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_USERS:
      return _loadUsers(state, action);
    default:
      return state;
  }
}

export { rootReducer };
