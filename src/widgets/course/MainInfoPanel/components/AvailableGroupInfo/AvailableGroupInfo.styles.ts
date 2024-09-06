import { createStyles } from "@mantine/core";

export default createStyles((theme, { grayColor }: { grayColor?: boolean }) => ({
    availableGroupInfoContainer: {
        flexWrap: "wrap",
        columnGap: 8,
        rowGap: 8,
        width: "fit-content",
    },
    groupInfoButton: {
        backgroundColor: grayColor ? theme.colors.neutralLight[0] : theme.colors.white[0],
        padding: "6px 10px",
        borderRadius: 8,
    },
}));
