import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    actionIcon: {
        backgroundColor: "transparent",
        color: theme.colors.dark[0],

        ":hover": {
            backgroundColor: "transparent",
            color: theme.colors.primaryHover[0],
        },
        ":disabled": {
            backgroundColor: "transparent",
            color: theme.colors.gray45[0],
        },
    },
    addCoursesToStudentModalWrapper: {
        ".mantine-Modal-modal": {
            [theme.fn.smallerThan("md")]: {
                minWidth: "100%",
            },
        },
    },
}));
