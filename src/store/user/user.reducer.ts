import { AnyAction } from "redux";
import {
  emailSignInStart,
  googleSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
} from "./user.action";

import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// A reducer function should set the new state based on the action {type,payload} passed.
// Do not add business logic here, simply set the values.

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false,
    };
  }
  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return { ...state, error: action.payload, isLoading: false };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }
  if (googleSignInStart.match(action) || emailSignInStart.match(action)) {
    return { ...state, isLoading: true };
  }

  return state;

//   switch (type) {
//     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//       return {
//         ...state,
//         currentUser: payload,
//         isLoading: false,
//       };
//     case USER_ACTION_TYPES.SIGN_IN_FAILED:
//     case USER_ACTION_TYPES.SIGN_UP_FAILED:
//     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//       return { ...state, error: payload, isLoading: false };

//     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//       return { ...state, currentUser: null };

//     case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
//     case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
};
