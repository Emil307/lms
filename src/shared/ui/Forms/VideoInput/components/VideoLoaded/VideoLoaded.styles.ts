import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    icon: {
        ":hover": {
            backgroundColor: "transparent",
            color: theme.colors.primaryHover[0],
        },
    },
}));
