import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    drawer: {
        borderBottomLeftRadius: "32px",
        borderTopLeftRadius: "32px",
        [theme.fn.smallerThan("md")]: {
            height: "calc(100% - 44px)",
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
        },
    },
    body: {
        height: "calc(100% - 80px)",
        display: "flex",
        flexDirection: "column",
        padding: "12px 4px 20px 20px",
    },
    header: {
        alignItems: "center",
        padding: "0 20px",
        marginTop: 32,
        ".mantine-Drawer-header": {},
        ".mantine-Drawer-closeButton": {
            transform: "scale(1.5)",
        },
    },
}));
