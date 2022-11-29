import { initializeApp } from "firebase/app";
import { message } from 'antd';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider ,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut, 
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  getDoc,
  collection,
  FieldPath,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtTw4bSJgZ1UEryWnowhv1WTmg0qD-o18",
    authDomain: "csun3d.firebaseapp.com",
    projectId: "csun3d",
    storageBucket: "csun3d.appspot.com",
    messagingSenderId: "847912334753",
    appId: "1:847912334753:web:77c37a72603cd9d498c7e0",
    measurementId: "G-TQQC3BH1Q6"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const mirosoftProvider = new OAuthProvider ('microsoft.com');



const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    message.error(err.message);
    // alert(err.message);
  }
};

const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    message.error(err.message);
    // alert(err.message);
  }
};

const signInWithMicrosoft = async () => {
  try {
    const res = await signInWithPopup(auth, mirosoftProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    message.error(err.message);
    // alert(err.message);
  }
};


const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    message.error(err.message);
    // alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  // console.log(name,email,password)
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: email,
      saved_places: [],
    });
  } catch (err) {
    console.error(err);
    message.error(err.message);
    // alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    // alert("Password reset link sent!");
    message.success("Password reset link sent!");
  } catch (err) {
    console.error(err);
    message.error(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

/**_____________FUNCTIONS____________________________________________ */
const save_Place = async (key, userID, type, value) => {
  if(!value){
  try {
      const q = query(collection(db, type=="verified" ? "RestBar_Verified" :"Bars_Unverified" ), where("__name__", "==", key));
      const docs = await getDocs(q);
      // console.log(docs.docs)
      const docRef = doc(db, type=="verified" ? "RestBar_Verified" :"Bars_Unverified", docs.docs[0].id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data.user_likes.includes(key)) {
        // alert("Already saved");
        message.warning('Already saved');
      } else {
        data.user_likes.push(userID);
        await updateDoc(docRef, data);
        message.success("Place Saved");
      }
  } catch (err) {
    // console.error(err);
    message.error(err.message);
    // alert(err.message);


    }
  }else{
    unsave_place(key, userID, type)

  }
    
};

const unsave_place = async (key, userID,type) => { //remember to add type when fetching data
  try {
    // console.log("Starting", key, userID, type)
    const q = query(collection(db, type=="verified" ? "RestBar_Verified" :"Bars_Unverified" ), where("__name__", "==", key));
    const docs = await getDocs(q);
    // console.log(docs.docs)
    const docRef = doc(db, type=="verified" ? "RestBar_Verified" :"Bars_Unverified", docs.docs[0].id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data.user_likes.includes(userID)) {

      const filteredArr = data.user_likes.filter(e => e !== userID);
        data.user_likes = filteredArr
        await updateDoc(docRef, data);
        message.success("Place Removed");
    } else {
      message.warning('Not saved yet');
    }
} catch (err) {
  console.error(err);
  message.error(err.message);
  // alert(err.message);


  }
  // try {

  //   const q = query(collection(db, "users"), where("uid", "==", userID));
  //   const docs = await getDocs(q);
  //   const docRef = doc(db, "users", docs.docs[0].id);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     const data = docSnap.data();
  //     if (data.saved_places.includes(key)) {
  //       const filteredArr = data.saved_places.filter(e => e !== key);
  //       data.saved_places = filteredArr
  //       await updateDoc(docRef, data);
  //       message.success("Place Removed");
  //     } else {
  //       message.warning('Not saved yet');
  //     }
  //   } else {
  //     message.error("No such document!");
  //   }
  // } catch (err) {
  //   console.error(err);
  //   alert(err.message);
  // }
};

 const getMarker = async() => {
  const q = query(collection(db, "RestBar_Verified"));

  const querySnapshot =  await getDocs(q);
  const data2=[]
  querySnapshot.forEach((doc) => {
    const temp_data = doc.data()
      if(!temp_data.address && temp_data.title){
        const url = "https://www.google.com/maps/search/"+temp_data.title.replace(" ","+")
        temp_data.address = url
        
      }
      if(temp_data.user_likes && temp_data.user_likes.length>0 && !temp_data.user_likes.includes(auth.currentUser.uid)){
        temp_data.likes =temp_data.user_likes.length
      }else if(temp_data.user_likes && temp_data.user_likes.length>0 && temp_data.user_likes.includes(auth.currentUser.uid)){
        temp_data.saved = true
        temp_data.likes =temp_data.user_likes.length
      }
      else{
        temp_data.saved = false
        temp_data.likes = 0
      }
      temp_data.key = doc.id
      data2.push(temp_data)
  });

  return data2
  
  }

  const getUnVerified = async() => {
    const q = query(collection(db, "Bars_Unverified"));
    const querySnapshot =  await getDocs(q);
    const data2=[]
    querySnapshot.forEach((doc) => {
      const temp_data = doc.data()
      
      if(temp_data.user_likes && temp_data.user_likes.length>0 && !temp_data.user_likes.includes(auth.currentUser.uid)){
        temp_data.likes =temp_data.user_likes.length
      }else if(temp_data.user_likes && temp_data.user_likes.length>0 && temp_data.user_likes.includes(auth.currentUser.uid)){
        temp_data.saved = true
        temp_data.likes =temp_data.user_likes.length
      }
      else{
        temp_data.saved = false
        temp_data.likes = 0
      }
      temp_data.key = doc.id
      data2.push(temp_data)
    });
  
    return data2
    
    }

  const getSavedPlaces = async(userID) => {
    //get all restaurants and bars where userid is in user_likes¨
    const data2=[]
    const q = query(collection(db, "RestBar_Verified"), where("user_likes", "array-contains", userID));
    const querySnapshot =  await getDocs(q);

    querySnapshot.forEach((doc) => {
      const temp_data = doc.data()
      temp_data.key = doc.id
      temp_data.type = "verified"
      data2.push(temp_data)
    });

    const q2 = query(collection(db, "Bars_Unverified"), where("user_likes", "array-contains", userID));
    const querySnapshot2 =  await getDocs(q2);

    querySnapshot2.forEach((doc) => {
      const temp_data = doc.data()
      temp_data.key = doc.id
      temp_data.type = "unverified"
      data2.push(temp_data)
    });

    //OLD SETUP
    // const q1 = query(collection(db, "users"), where("uid", "==", userID));
    // const docs = await getDocs(q1);
    // const docRef = doc(db, "users", docs.docs[0].id);
    // const docSnap = await getDoc(docRef);
    // const user_data = docSnap.data()
    // const places = user_data.saved_places
    // const data2=[]

    // const q2 = query(collection(db, "RestBar_Verified"),where("__name__", "in", places));
    // const querySnapshot =  await getDocs(q2);
    // querySnapshot.forEach((doc) => {
    //   const temp_data = doc.data()
    //   temp_data.id = doc.id
    //   data2.push(temp_data)
    // });

    // const q3 = query(collection(db, "Bars_Unverified"),where("__name__", "in", places));
    // const querySnapshot2 =  await getDocs(q3);
    // querySnapshot2.forEach((doc) => {
    //   const temp_data = doc.data()
    //   temp_data.id = doc.id
    //   data2.push(temp_data)
    // });
  
    return data2
  }


 
    

export {
  auth,
  db,
  signInWithGoogle,
  signInWithMicrosoft,
  signInWithGithub,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  save_Place,
  getMarker,
  getSavedPlaces,
  unsave_place,
  getUnVerified
};