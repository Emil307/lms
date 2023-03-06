import { createStyles } from "@mantine/core";

export const useMultiSelectStyles = createStyles((theme, { isValue }: { isValue: boolean }) => ({
    root: {
        position: "relative",
        ":hover": {
            label: {
                color: theme.colors.dark[0],
                cursor: "pointer",
            },
        },
    },
    wrapper: {
        marginBottom: 0,
    },
    label: {
        position: "absolute",
        display: isValue ? "none" : "auto",
        zIndex: 2,
        top: 16,
        left: 16,
        fontSize: "14px",
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
    input: {
        minHeight: 48,
        paddingLeft: "18px",
        paddingRight: "18px",
        border: `1px solid ${theme.colors.gray20[0]} !important`,
        borderRadius: "8px",
        fontSize: "14px",
        lineHeight: "16px",
        ":hover, :focus": {
            boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04) !important",
            border: "1px solid rgba(0,0,0,0.0) !important",
            cursor: "pointer",
            
        },
        ":disabled": {
            border: "1px solid rgba(0, 4, 41, 0.2)",
            color: theme.colors.dark[0],
        },
        "&[aria-invalid=true]": {
            border: `1px solid ${theme.colors.warning[0]}`,
        },
    },
    error: {
        position: "absolute",
        color: theme.colors.warning[0],
    },
    rightSection: {
        width: "50px",
        cursor: "pointer",
        pointerEvents: !isValue ? "none" : "auto",
    },
}));
