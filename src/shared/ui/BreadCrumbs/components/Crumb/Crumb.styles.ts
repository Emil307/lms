import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isActiveCrumb: boolean;
}

export default createStyles((theme, { isActiveCrumb }: CreateStylesParams, getRef) => ({
    crumb: {
        textDecoration: "none",
        whiteSpace: "nowrap",

        "&:hover": {
            textDecoration: "underline",
        },
        "&:active": {
            textDecorationColor: theme.colors.dark[0],
            [`.${getRef("control")}`]: {
                color: theme.colors.dark[0],
            },
        },
    },
    content: {
        ref: getRef("imageBack"),
        display: "block",
        color: isActiveCrumb ? theme.colors.dark[0] : theme.colors.neutralMain50[0],
        whiteSpace: "nowrap",
    },
}));
