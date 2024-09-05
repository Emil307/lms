import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    ratingWrapper: {
        width: 190,
        height: 72,
        padding: 8,
        paddingRight: 26,
        backgroundColor: theme.colors.white56[0],
        borderRadius: 16,
        backdropFilter: "blur(20px)",
    },
    iconWrapper: {
        backgroundColor: theme.colors.white[0],
        padding: 16,
        borderRadius: 12,
    },
    title: {
        fontSize: 24,
    },
    description: {
        lineHeight: "22px",
    },
}));
