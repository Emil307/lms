import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    hasCourseData?: boolean;
}

export default createStyles((theme, { hasCourseData }: CreateStylesParams) => ({
    root: {
        justifyContent: "space-between",
        gap: 24,
        marginBottom: 32,

        ...(hasCourseData && {
            [theme.fn.smallerThan("xs")]: {
                display: "grid",
                gridTemplateColumns: "calc(100% - 88px) 1fr",
                gap: 16,
            },
        }),
    },
}));
