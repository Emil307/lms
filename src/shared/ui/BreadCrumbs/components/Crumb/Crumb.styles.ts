import { createStyles } from "@mantine/core";

export default createStyles((theme, { isActiveCrumb }: { isActiveCrumb: boolean }) => ({
    crumb: {
        fontWeight: 500,
        color: isActiveCrumb ? theme.colors.dark[0] : theme.colors.gray45[0],
        textDecoration: "none",
        whiteSpace: "nowrap",

        "&:hover": {
            textDecoration: "underline",
        },
        "&:active": {
            color: theme.colors.dark[0],
        },
    },
}));
