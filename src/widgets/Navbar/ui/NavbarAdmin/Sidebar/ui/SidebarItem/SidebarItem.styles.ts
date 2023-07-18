import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isActive?: boolean;
    inner?: boolean;
}

export default createStyles((theme, { isActive, inner }: CreateStylesParams, getRef) => ({
    root: {
        color: isActive ? theme.colors.dark[0] : theme.colors.gray45[0],
        cursor: "pointer",

        "&:hover": {
            color: theme.colors.dark[0],

            [`.${getRef("iconWrapper")}`]: {
                color: theme.colors.secondary[0],
            },
        },
    },

    indicatorActive: {
        position: "absolute",
    },

    inducatorCloseInnerContent: {
        width: 2,
        height: 20,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        backgroundColor: theme.colors.secondaryHover[0],
    },

    iconWrapper: {
        ref: getRef("iconWrapper"),
        color: isActive ? theme.colors.secondary[0] : theme.colors.gray45[0],
    },
    inner: {
        paddingBlock: inner ? 8 : 12,
        marginLeft: inner ? 0 : 24,
        flex: 1,
    },
    text: {
        fontWeight: 600,
        fontSize: inner ? 14 : 16,
        lineHeight: "24px",
    },
}));
