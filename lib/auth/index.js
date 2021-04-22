import { init } from "next-firebase-auth";

const initializeAuthentication = () => {
    init({
        authPageURL: "/login",
        appPageURL: "/",
        loginAPIEndpoint: "/api/auth/login",
        logoutAPIEndpoint: "/api/auth/logout",
        firebaseAdminInitConfig: {
            credential: {
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY,
            },
        },
        firebaseClientInitConfig: {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        },
        cookies: {
            name: "Taskforce-OE",
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 24 * 1000, // 12 days
            overwrite: true,
            path: "/",
            sameSite: "strict",
            secure: process.env.NEXT_PUBLIC_SECURE == "true",
            signed: false,
        },
    });
};

export { initializeAuthentication };
