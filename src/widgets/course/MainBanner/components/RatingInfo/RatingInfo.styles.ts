import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    ratingWrapper: {
        width: 190,
        height: 72,
        padding: 8,
        backgroundColor: theme.colors.neutralWhite[0],
        borderRadius: 16,
        backdropFilter: "blur(16px)",
    },
    iconWrapper: {
        backgroundColor: theme.colors.neutralGray100[0],
        padding: 16,
        borderRadius: 12,
    },
}));
