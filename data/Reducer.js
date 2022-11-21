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

const _loadActiveChat = (state, action) => {
  const newActiveChat = {
    participants: action.payload.participants,
    messages: action.payload.messages,
  };
  return {
    ...state,
    activeChat: newActiveChat,
  };
};

const initialState = {
  users: [],

  activeChat: {
    participants: [],
    messages: [], // collection in Firebase, array in state
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_USERS:
      return _loadUsers(state, action);

    case actionTypes.LOAD_ACTIVE_CHAT:
      return _loadActiveChat(state, action);
    default:
      return state;
  }
}

export { rootReducer };
