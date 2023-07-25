import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    hasSelectedConversation?: boolean;
}

export default createStyles((theme, { hasSelectedConversation }: CreateStylesParams) => ({
    root: {
        flexDirection: "column",
        height: "100%",
    },
    titlePage: {
        marginBottom: 40,

        [theme.fn.smallerThan("md")]: {
            marginBottom: 0,
        },
    },
    messagesBlockContainer: {
        flexGrow: 1,
        borderRadius: 16,
        border: `1px solid ${theme.colors.grayLight[0]}`,

        [theme.fn.smallerThan("md")]: {
            border: "none",
        },
    },
    chatContainerWrapper: {
        width: 382,
        borderRight: `1px solid ${theme.colors.grayLight[0]}`,

        [theme.fn.smallerThan("md")]: {
            display: hasSelectedConversation ? "none" : "block",
            width: "100%",
            borderRight: "none",
        },
    },
    searchUserWrapper: {
        paddingInline: 20,
        paddingBlock: 24,
        borderBottom: `1px solid ${theme.colors.grayLight[0]}`,

        [theme.fn.smallerThan("md")]: {
            paddingInline: 0,
        },
    },
    chatHeader: {
        flexDirection: "column",
        paddingBlock: 24,
        paddingInline: 32,
        gap: 8,
        borderBottom: `1px solid ${theme.colors.grayLight[0]}`,
    },
    messageListContainerWrapper: {
        flexDirection: "column",
        flex: 1,

        [theme.fn.smallerThan("md")]: {
            display: hasSelectedConversation ? "flex" : "none",
        },
    },
}));
