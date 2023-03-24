import { createStyles } from "@mantine/core";

export const useTextareaStyles = createStyles((theme) => ({
    input: {
        ":hover, :focus": {
            boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
            border: "1px solid rgba(0,0,0,0.0)",
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
    label: {
        display: "flex",
        alignItems: "center",
        marginBottom: 24,
        gap: 16,
        fontSize: 18,
        lineHeight: "24px",
    },
}));
