import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import fireBaseConfig from "./config"
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

class Firebase {
  constructor() {
    const app = initializeApp(fireBaseConfig);
    this.auth = getAuth();
    this.db = getFirestore(app);
    this.storage = getStorage()
    
  }
  //Registry a new user
  async registry(name, email, password) {
    
    const newUser = await createUserWithEmailAndPassword(this.auth ,email, password);
      //updated and add name to created user
      return await updateProfile(newUser.user,{
          displayName: name
      });
  }
 
  //Login a user
  async login(email, password) {
    return await signInWithEmailAndPassword(this.auth ,email, password);
  }

  //Log Out
  async logOut(){
    await this.auth.signOut();
  }


}
const firebase = new Firebase();
export default firebase; 