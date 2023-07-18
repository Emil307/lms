import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    variant: "compact" | "default";
}

export default createStyles((theme, { variant }: CreateStylesParams) => ({
    root: {
        flexDirection: variant === "default" ? "row" : "column",
        justifyContent: "space-between",
        alignItems: variant === "default" ? "center" : "flex-start",
        rowGap: 0,
        columnGap: 16,
        width: "100%",
    },
}));
