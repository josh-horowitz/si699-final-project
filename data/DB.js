import { getAuth, signOut } from "firebase/auth";
import { getApps, initializeApp } from "firebase/app";
import {
  getFirestore,
  onSnapshot,
  collection,
  setDoc,
  doc,
  getDoc,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { firebaseConfig } from "../Secrets";
import { actionTypes, loadUsers, loadActiveChat } from "./Actions";

let firebaseApp = null;
const userCollection = "users";
const chatCollection = "chats";

const getFBApp = () => {
  if (!firebaseApp) {
    if (getApps() == 0) {
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      firebaseApp = getApps()[0];
    }
  }
  return firebaseApp;
};

const getFBAuth = () => {
  return getAuth(getFBApp());
};

const signOutFB = () => {
  return signOut(getFBAuth());
};

const getDB = () => {
  return getFirestore(getFBApp());
};

const subscribeToUsers = (dispatch) => {
  onSnapshot(collection(getDB(), userCollection), (qSnap) => {
    let newUsers = [];
    qSnap.forEach((docSnap) => {
      let newUser = docSnap.data();
      newUser.uid = docSnap.id;
      newUsers.push(newUser);
    });
    dispatch(loadUsers(newUsers));
  });
};

const createUser = (action, dispatch) => {
  const { user } = action.payload;
  setDoc(doc(collection(getDB(), userCollection), user.uid), {
    displayName: user.displayName,
  });
  // no need to dispatch to reducer, onSnapshot will pick it up
};

const constructChatId = (id1, id2) => {
  return [id1, id2].sort().join("_");
};

let activeChatUnsubscribe = undefined;

const subscribeToChat = async (user1Id, user2Id, dispatch) => {
  const chatId = constructChatId(user1Id, user2Id);

  // check if chat already exists. If not, create it.
  const chatDoc = doc(collection(getDB(), chatCollection), chatId);
  let chatDocSnap = await getDoc(chatDoc);
  if (!chatDocSnap.exists()) {
    console.log("Chat doesn't exist. Creating it with ID", chatId);
    await setDoc(chatDoc, { participants: [user1Id, user2Id] });
  }

  if (activeChatUnsubscribe) {
    activeChatUnsubscribe();
  }

  // set up the onSnapshot listener to monitor
  // this chat's messages collections
  const activeChatMessageCollection = collection(chatDoc, "messages");
  const q = query(activeChatMessageCollection, orderBy("timestamp", "asc"));

  activeChatUnsubscribe = onSnapshot(q, (qSnap) => {
    let newMessages = [];
    qSnap.forEach((docSnap) => {
      let newMessage = docSnap.data();
      newMessage.key = docSnap.id;
      newMessage.timestamp = newMessage.timestamp.toDate().getTime();
      newMessages.push(newMessage);
    });

    // after messages have been packaged, dispatch to the reducer
    dispatch(loadActiveChat(user1Id, user2Id, newMessages));
  });
};

const addChatMessageWithoutDispatch = async (action, dispatch) => {
  const { author, recipient, message } = action.payload;

  const newMessage = {
    author: author,
    recipient: recipient,
    message: message,
    timestamp: new Date(),
  };

  let chatId = constructChatId(author, recipient);
  let activeChatMessageCollection = collection(
    getDB(),
    chatCollection,
    chatId,
    "messages"
  );

  console.log("adding message", newMessage, "to chat", chatId);
  await addDoc(activeChatMessageCollection, newMessage);
  // no need to dispatch to reducer, onSnapshot will handle
};

const saveAndDispatch = (action, dispatch) => {
  switch (action.type) {
    case actionTypes.LOAD_USERS:
      loadUsersAndDispatch(action, dispatch);
    case actionTypes.CREATE_USER:
      createUser(action, dispatch);
    case actionTypes.ADD_CHAT_MESSAGE:
      return addChatMessageWithoutDispatch(action, dispatch);
  }
};

export {
  saveAndDispatch,
  subscribeToUsers,
  getFBAuth,
  signOutFB,
  subscribeToChat,
};
