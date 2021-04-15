import {
    ViewIcon,
    EditIcon,
    DeleteIcon,
    WarningTwoIcon,
} from "@chakra-ui/icons";

export const VotingOwnerList = [
    {
        label: "Helfer anzeigen",
        icon: <ViewIcon />,
    },
    {
        label: "Bearbeiten",
        icon: <EditIcon />,
    },
    {
        label: "Löschen",
        icon: <DeleteIcon />,
        color: "red",
    },
];

export const VotingAdminList = [
    {
        label: "Helfer:innen anzeigen",
        icon: <ViewIcon />,
    },
    {
        label: "Status ändern",
        icon: <WarningTwoIcon />,
    },
    {
        label: "Bearbeiten",
        icon: <EditIcon />,
    },
    {
        label: "Löschen",
        icon: <DeleteIcon />,
        color: "red",
    },
];
