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

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
    accordionPanel: {
        ".mantine-Accordion-content": {
            paddingTop: 0,
            paddingBottom: 32,

            [theme.fn.smallerThan("md")]: {
                paddingBottom: 24,
            },
        },
    },
}));
