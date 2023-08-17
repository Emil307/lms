import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isOpenAnswers: boolean;
}

export default createStyles((theme, { isOpenAnswers }: CreateStylesParams) => ({
    buttonToggle: {
        width: "min-content",

        ".mantine-Button-rightIcon": {
            transform: `rotate(${isOpenAnswers ? 0 : 180}deg)`,
        },
    },
    answerListWrapper: {
        flexDirection: "column",
        marginBottom: 32,
        gap: 32,

        [theme.fn.smallerThan("sm")]: {
            marginBottom: 24,
            gap: 24,
        },
    },
}));
