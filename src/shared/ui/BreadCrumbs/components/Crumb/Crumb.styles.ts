import { createStyles } from "@mantine/core";
import { ManropeFont } from "@app/providers/Theme/fonts";

export default createStyles((theme, { isActiveCrumb }: { isActiveCrumb: boolean }) => ({
    crumb: {
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: ManropeFont.style.fontWeight,
        color: isActiveCrumb ? theme.colors.dark : theme.colors.gray45,
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },
        "&:active": {
            color: theme.colors.dark,
        },
    },
}));
