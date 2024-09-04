import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    accordionControl: {
        [theme.fn.smallerThan("md")]: {
            padding: 24,
        },
    },
    accordionControlInner: {
        flexWrap: "wrap",
        gap: 16,
        alignItems: "center",
        marginTop: 16,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            alignItems: "flex-start",
        },
    },
    accordionPanel: {
        ".mantine-Accordion-content": {
            paddingTop: 0,
            [theme.fn.smallerThan("md")]: {
                paddingBottom: 24,
            },
        },
    },
    iconContainer: {
        padding: 12,
        border: `1px solid ${theme.colors.neutral_gray300[0]}`,
        borderRadius: 16,
    },
    iconChevronContainer: {
        backgroundColor: theme.colors.white[0],
        borderRadius: 100,
        padding: 12,
    },
    accordionItem: {
        "&[data-active]": {
            backgroundColor: theme.colors.neutralLight[0],
            [theme.fn.smallerThan("md")]: {
                padding: "24px 24px 0 24px",
            },
        },
        [theme.fn.smallerThan("md")]: {
            padding: 0,
        },
    },
}));
