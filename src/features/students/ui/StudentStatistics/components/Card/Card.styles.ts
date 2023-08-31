import { MantineTheme, createStyles } from "@mantine/core";

interface CreateStylesProps {
    type: "homework" | "test" | "lessons";
}

export default createStyles((theme, { type }: CreateStylesProps) => ({
    card: {
        alignItems: "center",
        height: 208,
        borderRadius: 16,
        paddingRight: 9,
        backgroundColor: getBackgroundColor(theme, { type }),

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            height: "auto",
            width: 295,
            paddingBottom: 7,
        },
    },
    main: {
        gap: 64,
        flexDirection: "column",
        width: 152,
        height: 144,
        paddingLeft: 32,
        marginRight: "-7px",
        boxSizing: "content-box",

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            gap: 8,
            height: "auto",
            marginRight: 0,
            boxSizing: "border-box",
            padding: "24px 24px 0 24px",
            textAlign: "center",
        },
    },
}));

const getBackgroundColor = (theme: MantineTheme, { type }: Pick<CreateStylesProps, "type">) => {
    switch (type) {
        case "homework":
            return theme.colors.grayLight[0];
        case "test":
            return theme.colors.info16[0];
        case "lessons":
            return theme.colors.secondary16[0];
        default:
            return theme.colors.grayLight[0];
    }
};
