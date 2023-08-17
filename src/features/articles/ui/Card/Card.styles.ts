import { createStyles } from "@mantine/core";

export default createStyles((theme, { isAvailable }: { isAvailable: boolean }) => ({
    root: {
        alignItems: "center",
        paddingInline: 32,
        paddingBlock: 24,
        gap: 16,
        borderRadius: 16,
        backgroundColor: isAvailable ? theme.colors.white[0] : theme.colors.grayLight[0],
        cursor: "pointer",
        pointerEvents: isAvailable ? "auto" : "none",

        ":hover": {
            boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
        },

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            paddingInline: 24,
        },
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        gap: 16,
    },
    wrapperDocumentIcon: {
        height: 48,
        width: 48,
        borderRadius: 56,
        color: isAvailable ? theme.colors.secondary[0] : theme.colors.gray45[0],
        backgroundColor: isAvailable ? theme.colors.secondary8[0] : theme.colors.light[0],

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
}));
