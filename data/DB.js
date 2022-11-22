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
import { actionTypes, loadUsers } from "./Actions";

let firebaseApp = null;
const userCollection = "users";

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
      newUser.createdDate = newUser.createdDate.toDate().getTime();
      newUser.lastDayActive = newUser.lastDayActive.toDate().getTime();
      newUsers.push(newUser);
    });
    dispatch(loadUsers(newUsers));
  });
};

const createUser = (action, dispatch) => {
  const { user } = action.payload;
  setDoc(doc(collection(getDB(), userCollection), user.uid), {
    displayName: user.displayName,
    createdDate: user.createdDate,
    lastDayActive: user.lastDayActive,
  });
  // no need to dispatch to reducer, onSnapshot will pick it up
};

const saveAndDispatch = (action, dispatch) => {
  switch (action.type) {
    case actionTypes.LOAD_USERS:
      loadUsersAndDispatch(action, dispatch);
    case actionTypes.CREATE_USER:
      createUser(action, dispatch);
  }
};

export { saveAndDispatch, subscribeToUsers, getFBAuth, signOutFB };
