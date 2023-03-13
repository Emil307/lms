import { createStyles } from "@mantine/core";

export const useSearchStyles = createStyles((theme, { styleVariant }: { styleVariant?: "default" | "course" }) => ({
    root: {
        input: {
            height: 48,
            padding: "8px 16px 8px 40px",
            backgroundColor: styleVariant === "course" ? theme.colors.white[0] : theme.colors.grayLight[0],
            border: styleVariant === "course" ? "1px solid rgba(0, 4, 41, 0.2)" : "1px solid rgba(0,0,0,0.0)",
            borderRadius: 8,
            lineHeight: 16,
            ":hover, :focus": {
                cursor: "pointer",
                backgroundColor: theme.colors.white[0],
                border: `1px solid ${theme.colors.light[0]}`,
                boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
            },
        },
        svg: {
            cursor: "pointer",
        },
    },
}));