import { auth, provider } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";

export const Auth = () => {

  const signInWithGoogle = async () => {
    // Logic for signing in with Google
    console.log("Signing in with Google...");
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    
    
  }
  return (
    <div className="auth">
      <p>Sign in with Google to Continue</p>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  )
}
