import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        padding: 32,
        borderRadius: 24,
        gap: 69,
        backgroundColor: theme.colors.white[0],
    },
    headingContainer: {
        flex: 1,
        flexDirection: "column",
        marginTop: 10,
        // justifyContent: "center",
        gap: 8,
    },

    authorWrapperList: {
        flex: 2,
        flexDirection: "column",
        gap: 16,
    },

    authorCard: {
        flex: 2,
        alignItems: "center",
        gap: 24,
    },

    avatarWrapper: {
        width: 84,
        height: 84,
        minHeight: 84,
        minWidth: 84,
    },
}));
