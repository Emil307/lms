import { Box, BoxProps, Title, ThemeIcon } from "@mantine/core";
import { memo } from "react";
import { ChevronRight } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import useStyles from "./CardMore.styles";

export interface CardMoreProps extends Omit<BoxProps, "children"> {
    countCardSet: number;
}

const MemoizedCardMore = memo(function CardMore({ countCardSet, ...props }: CardMoreProps) {
    const { classes } = useStyles();
    const router = useRouter();

    const handleClick = () => router.push("/course-sets");

    return (
        <Box {...props} className={classes.root} onClick={handleClick}>
            <Title order={3} color="primary" lineClamp={2}>
                {`+ еще ${countCardSet} ${getPluralString(countCardSet, "подборка", "подборки", "подборок")}`} <br /> на актуальные темы
            </Title>
            <Box>
                <Button
                    variant="text"
                    size="small"
                    rightIcon={
                        <ThemeIcon className={classes.iconButtonLinkCourse}>
                            <ChevronRight />
                        </ThemeIcon>
                    }>
                    Смотреть все
                </Button>
            </Box>
        </Box>
    );
});

export default MemoizedCardMore;
