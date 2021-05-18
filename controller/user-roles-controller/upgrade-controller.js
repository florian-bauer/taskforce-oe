import { ActionModal } from "@/components/action-modal";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { MenuItem } from "@chakra-ui/react";

const UpgradeController = ({ uid, name, email }) => (
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
        onAction={(onClose) => {
            console.log(uid + " zum admin ernennen");
            onClose();
        }}
    />
);

export { UpgradeController };
