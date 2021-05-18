import { ActionModal } from "@/components/action-modal";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { MenuItem } from "@chakra-ui/react";

const DowngradeController = ({ uid, name, email }) => (
    <ActionModal
        open={(onOpen) => (
            <MenuItem icon={<ArrowDownIcon />} onClick={onOpen}>
                zu User downgraden
            </MenuItem>
        )}
        header="Bist du sicher?"
        body={`${name} (${email}) wird nun keine uneingeschränkte Berechtigungen auf die Applikation mehr haben.`}
        labelAbort="Abbrechen"
        labelAction="Ja, Admin entziehen"
        onAction={(onClose) => {
            console.log(uid + " zum user downgraden");
            onClose();
        }}
    />
);

export { DowngradeController };
