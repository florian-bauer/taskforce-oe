import { Button } from "@/components/button";
import { useQuery } from "@/hooks";
import { signInWithProvider } from "@/lib/auth/provider";
import { GoogleIcon } from "@/styles/icons/GoogleIcon";
import { useToast } from "@chakra-ui/react";
import firebase from "firebase";
import { useState, useEffect } from "react";

const LoginPageController = () => {
    const query = useQuery();
    const toast = useToast();
    // Using a State to avoid multiple Toast Messages
    // This could be caused by multiple re-renders
    const [hasToast, setHasToast] = useState(false);

    useEffect(() => {
        if (!query) return;

        if (query?.allowed_organisation === "false" && hasToast === false) {
            toast({
                title: "Unauthorisierter Organisationsaccount",
                description:
                    "Dein Account muss der BCM Solutions zugeordnet sein!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            setHasToast(true);
        }
    }, [query]);

    return (
        <Button
            mt={8}
            primary
            label="Anmelden mit Google"
            leftIcon={<GoogleIcon />}
            onClick={async () => {
                await signInWithProvider({
                    provider: new firebase.auth.GoogleAuthProvider(),
                });
            }}
        />
    );
};

export { LoginPageController };
