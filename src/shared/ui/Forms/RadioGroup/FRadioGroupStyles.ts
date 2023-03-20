import { createStyles } from "@mantine/core";

export const useRadioGroupStyles = createStyles(() => ({
    root: {
        ">div": {
            padding: 0,
        },
    },
    body: {
        backgroundColor: "red",
    },
    error: {
        position: "absolute",
    },
}));
