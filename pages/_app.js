import '../styles/globals.css'


import firebase, { FirebaseContext } from '../firebase'
import useAuthentication from '../hooks/useAuthentication';

export default function MyApp({ Component, pageProps }) {

    const user  = useAuthentication();
    
    return(
        <FirebaseContext.Provider 
            value={{firebase, user}}>

               <Component {...pageProps} />
                    
        </FirebaseContext.Provider>
    );
}
