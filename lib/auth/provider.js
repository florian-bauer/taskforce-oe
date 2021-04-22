import firebase from "firebase";

const SignInWithProvider = async ({ provider }) => {
    try {
        await firebase.auth().signInWithPopup(provider);
    } catch (error) {
        console.error(error);
    }
};

export { SignInWithProvider };
