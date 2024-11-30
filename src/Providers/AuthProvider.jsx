import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import AuthContext from "./AuthContext.jsx";
import auth from "../Firebase/firebase.init.js";
import {toast} from "react-toastify";


const AuthProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);


    /*const signUpNewUser = (name, photoUrl, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                setUserLoading(false);
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photoUrl
                }).then(() => {
                    // Profile updated!
                }).catch((error) => {
                    // console.log('ERROR CODE: ', error.code);
                    // console.log('ERROR MESSAGE: ', error.message);
                    toast.error(`ERROR MESSAGE A: ${error.code}: ${error.message}`);
                });
            })
            .then(() => {
                signOut(auth).then(() => {});
                toast.success('Registration successful!');
            })
            .catch((error) => {
                // console.log('ERROR CODE: ', error.code);
                // console.log('ERROR MESSAGE: ', error.message);
                toast.error(`ERROR MESSAGE B: ${error.code}: ${error.message}`);
            });
    }*/
    const signUpNewUser = async (name, photoUrl, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            setUser(user);
            setUserLoading(false);

            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoUrl
            });

            const userInfoForDatabase = {
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
            };

            const response = await fetch('https://espresso-emporium-server-side-bc2g.vercel.app/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfoForDatabase),
            });

            if (!response.ok) {
                new Error('Failed to save user info to MongoDB');
            }

            await signOut(auth);
            toast.success('Registration successful!');
        } catch (error) {
            setUserLoading(false);
            toast.error(`ERROR MESSAGE B: ${error.code}: ${error.message}`);
        }
    };



    const signInExistingUsers = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                setUserLoading(false);
                toast.success('Login successful!');
            })
            .catch((error) => {
                // console.log('ERROR CODE: ', error.code);
                // console.log('ERROR MESSAGE: ', error.message);
                toast.error(`ERROR MESSAGE A: ${error.code}: ${error.message}`);
            });
    }


    const updateExistingUsers = (name, photoUrl) => {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
        }).then((currentUser) => {
            setUser(currentUser);
            // Profile updated!
            toast.success('Profile updated successful!');
        }).catch((error) => {
            // console.log('ERROR CODE: ', error.code);
            // console.log('ERROR MESSAGE: ', error.message);
            toast.error(`ERROR MESSAGE A: ${error.code}: ${error.message}`);
        });
    }


    const signOutCurrentUser = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser(null);
            setUserLoading(false);
            toast.success('Logout successful!');
        }).catch((error) => {
            // console.log('ERROR CODE: ', error.code);
            // console.log('ERROR MESSAGE: ', error.message);
            toast.error(`ERROR MESSAGE A: ${error.code}: ${error.message}`);
        });
    }


    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                toast.success('Password reset email sent!');
            })
            .catch((error) => {
                // console.log('ERROR CODE: ', error.code);
                // console.log('ERROR MESSAGE: ', error.message);
                toast.error(`ERROR MESSAGE A: ${error.code}: ${error.message}`);
            });
    }


    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                setUserLoading(false);
                toast.success('Login successful!');
            }).catch((error) => {
            toast.error(`ERROR MESSAGE A: ${error.code}: ${error.message}`);
        });
    }


    useEffect(() => {
        /*The recommended way to get the current user is by setting an observer on the Auth object.*/
        const authentication_State_Observer = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // console.log("User is logged in");
                setUser(currentUser);
                setUserLoading(false);
            } else {
                // console.log("User is logged out.");
                setUser(null);
                setUserLoading(false);
            }
        })

        /*Component Unmounting.*/
        return () => {
            authentication_State_Observer();
        }
    }, [user]);


    const authInfo = {user, userLoading, signUpNewUser, signInExistingUsers, updateExistingUsers, signOutCurrentUser, resetPassword, signInWithGoogle};


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;


/*
Initially have created the 'AuthContext.jsx'.
Then have created the 'AuthProvider'.

Then in the 'main.jsx' file, the 'RouterProvider' is wrapped by 'AuthProvider'.
Here the 'RouterProvider' is like a children of 'AuthProvider'.

Inside the 'AuthProvider.jsx' I've received the {children} as props.
Then inside the 'AuthProvider.jsx' I have done all the logical coding part related to the Firebase Authentication process.
Then all thing, which I want to distribute through the whole project, are combined and created an object 'authInfo'.
Then in the return section, 'AuthContext.Provider' tag along with 'value={authInfo}' are used to finish the distribution process.

And then from any component, 'useContext(AuthContext)' has been used to received all necessary things from this contextAPI.
*/
