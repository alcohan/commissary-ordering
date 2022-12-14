import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Commissary, Customer } from "../../store/customers/customers.types";
import { Product } from "../../store/products/products.types";

// import { Category } from "../../store/categories/category.types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoM7BOzEXI6ZhCj736IBAuKXz8FjXOO3E",
  authDomain: "evergreens-commissary.firebaseapp.com",
  projectId: "evergreens-commissary",
  storageBucket: "evergreens-commissary.appspot.com",
  messagingSenderId: "942574374948",
  appId: "1:942574374948:web:25786ba0bc1b3876ff08b1",
  measurementId: "G-N3CK5SZS3R"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export type ObjectToAdd = {
  "ID": string;
};

// typically this wouldn't be front-end.
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionReference = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionReference, object["ID"]);
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const updateProductDocument = async (
  collectionKey: string, 
  productToUpdate:Product
  ) => {
  console.log("updating product", productToUpdate);
  const collectionRef = collection(db,collectionKey);
  const batch = writeBatch(db);
  const docRef = doc(collectionRef,productToUpdate["Item GUID"]);
  batch.set(docRef,productToUpdate);
  await batch.commit();
  console.log("done");
}
export const updateCustomerDocument = async (
  collectionKey: string, 
  customerToUpdate:Customer
  ) => {
  console.log("updating customer", customerToUpdate);
  const collectionRef = collection(db,collectionKey);
  const batch = writeBatch(db);
  const docRef = doc(collectionRef,customerToUpdate["Store GUID"]);
  batch.set(docRef,customerToUpdate);
  await batch.commit();
  console.log("done");
}


export const getFirebaseDocuments = async <ExpectedType>(
  collectionName: string
): Promise<ExpectedType[]> => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as ExpectedType
  );
};

export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {}
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user',error);
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email:string, password:string) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async (email:string, password:string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise <User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
