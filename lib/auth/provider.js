import firebase from "firebase";
import { authorizeOrganization } from "@/lib/auth/organization";

const signInWithProvider = async ({ provider }) => {
    try {
        await firebase.auth().signInWithPopup(provider);
    } catch (error) {
        console.error(error);
    }
};

const authorizeUsersOrganization = async ({ email, router }) => {
    if (email) {
        const authorized = authorizeOrganization({ email });

        if (!authorized) {
            // Sign the User out because he isn't part
            // of the allowed Organisation
            await firebase.auth().signOut();

            // redirecting with query parameter
            // so we can show a error message
            router.push({
                pathname: "/login",
                query: {
                    allowed_organisation: false,
                },
            });
        }
    }
};

export { signInWithProvider, authorizeUsersOrganization };
