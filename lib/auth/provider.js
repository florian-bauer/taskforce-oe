import firebase from "firebase";

const SignInWithProvider = async ({ provider }) => {
    try {
        await firebase.auth().signInWithPopup(provider);
    } catch (error) {
        console.error(error);
    }
};

const AuthorizeUsersOrganisation = async ({ email, router }) => {
    if (email) {
        const UserDomain = email.split("@")[1].toUpperCase();
        const AllowedDomain = `${process.env.NEXT_PUBLIC_ALLOW_AUTH_DOMAIN}`.toUpperCase();

        if (UserDomain !== AllowedDomain) {
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

export { SignInWithProvider, AuthorizeUsersOrganisation };
