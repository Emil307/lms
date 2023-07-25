import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        gap: 8,
        //TODO: Это не точно!, нужно смотреть как будет реализовано у других сущностей
        width: "100%",
        overflowX: "auto",

        "::-webkit-scrollbar": {
            display: "none",
        },
    },

    date: {
        whiteSpace: "nowrap",
    },

    userInfo: {
        color: theme.colors.primary[0],
        whiteSpace: "nowrap",
    },
}));
