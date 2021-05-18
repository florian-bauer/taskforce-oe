import { ActionModal } from "@/components/action-modal";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { MenuItem, useToast } from "@chakra-ui/react";
import { useAuthUser } from "next-firebase-auth";

const DowngradeController = ({ uid, name, email, mutate }) => {
    const toast = useToast();
    const { getIdToken } = useAuthUser();

    return (
        <ActionModal
            open={(onOpen) => (
                <MenuItem icon={<ArrowDownIcon />} onClick={onOpen}>
                    zu User downgraden
                </MenuItem>
            )}
            header="Bist du sicher?"
            body={`${name} (${email}) wird nun keine uneingeschränkte Berechtigung auf die Applikation mehr haben.`}
            labelAbort="Abbrechen"
            labelAction="Ja, Admin Rechte entziehen"
            onAction={async (onClose) => {
                const token = await getIdToken();

                const response = await fetch("/api/user/role", {
                    method: "PUT",
                    headers: {
                        authorization: token,
                    },
                    body: JSON.stringify({
                        uid,
                        administrator: false,
                    }),
                });

                const data = await response.json();

                if (data?.success) {
                    onClose();

                    toast({
                        title: `${name} ist nun wieder User`,
                        status: "warning",
                        duration: 9000,
                        isClosable: true,
                    });

                    mutate("/api/user");
                }
            }}
        />
    );
};

export { DowngradeController };
