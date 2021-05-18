import { ActionModal } from "@/components/action-modal";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { MenuItem } from "@chakra-ui/react";
import { useAuthUser } from "next-firebase-auth";
import { useToast } from "@chakra-ui/react";

const UpgradeController = ({ uid, name, email, mutate }) => {
    const toast = useToast();
    const { getIdToken } = useAuthUser();

    return (
        <ActionModal
            open={(onOpen) => (
                <MenuItem icon={<ArrowUpIcon />} onClick={onOpen}>
                    zu Admin upgraden
                </MenuItem>
            )}
            header="Bist du sicher?"
            body={`${name} (${email}) wird uneingeschränkte Berechtigungen auf die Applikation zugeteilt bekommen.`}
            labelAbort="Abbrechen"
            labelAction="Ja, zum Admin ernennen"
            onAction={async (onClose) => {
                const token = await getIdToken();

                const response = await fetch("/api/user/role", {
                    method: "PUT",
                    headers: {
                        authorization: token,
                    },
                    body: JSON.stringify({
                        uid,
                        administrator: true,
                    }),
                });

                const data = await response.json();

                if (data?.success) {
                    onClose();

                    toast({
                        title: `${name} ist nun Administrator`,
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });

                    mutate("/api/user");
                }
            }}
        />
    );
};

export { UpgradeController };
