import { createStyles } from "@mantine/core";

export default createStyles((theme, { grayColor }: { grayColor?: boolean }) => ({
    availableGroupInfoContainer: {
        flexWrap: "wrap",
        columnGap: 8,
        rowGap: 8,
        width: "fit-content",
    },
    groupInfoButton: {
        backgroundColor: grayColor ? theme.colors.neutralGray100[0] : theme.colors.neutralWhite[0],
        padding: "6px 10px",
        borderRadius: 8,
    },
}));
