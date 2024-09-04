import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    image: {
        position: "relative",
        overflow: "hidden",
        maxWidth: 1320,
        width: "100%",
        height: "360px",
        borderRadius: 32,
        backgroundColor: theme.colors.grayLight[0],
        img: {
            objectFit: "cover",
        },
    },
    iconPosition: {
        position: "absolute",
        right: 0,
        padding: 24,
    },
}));
