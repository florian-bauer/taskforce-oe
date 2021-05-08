import firebase from "firebase";

const signInWithProvider = async ({ provider }) => {
    try {
        await firebase.auth().signInWithPopup(provider);
    } catch (error) {
        console.error(error);
    }
};

export { signInWithProvider };
