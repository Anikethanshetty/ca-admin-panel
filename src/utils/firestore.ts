import {getFirestore} from "@firebase/firestore"
import {app} from "./firebaseConfig"
import { getAuth } from "firebase/auth"

export const db = getFirestore(app)
export const auth = getAuth(app)