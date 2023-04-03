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

    //TODO: изменить маршрут после добавления индексной страницы с подборками курсов
    const handleClick = () => router.push("/");

    return (
        <Box {...props} className={classes.root}>
            <Title order={3} color="primary" lineClamp={2}>
                {`+ еще ${countCardSet} ${getPluralString(countCardSet, "подборка", "подборки", "подборок")}`} <br /> на актуальные темы
            </Title>
            <Box>
                <Button
                    variant="text"
                    size="small"
                    onClick={handleClick}
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