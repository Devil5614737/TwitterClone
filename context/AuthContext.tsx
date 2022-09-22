import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextI } from "../interfaces/AuthContextI";
import { CurrentUserI } from "../interfaces/UserI";
import { auth } from "../lib/firebase";

export const AuthContext = createContext({} as AuthContextI);

interface AuthContextProviderI {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderI) => {
  const router=useRouter()
  const [currentUser, setCurrentUser] = useState<CurrentUserI>();



  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user as any);
       router.push('/dashboard') 
      }
      else if(!user){
        router.push('/')
      }
    });

    return () => {
      unsub();
    };
  }, []);

  











  return (
    <AuthContext.Provider value={{ currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
