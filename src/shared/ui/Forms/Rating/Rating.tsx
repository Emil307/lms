import { Flex, Rating as MRating, RatingProps as MRatingProps, Text, ThemeIcon } from "@mantine/core";
import { memo, ReactNode, useMemo } from "react";
import { AlertTriangle } from "react-feather";
import IconStarDefault from "public/icons/icon24px/rating/star-default.svg";
import IconStarFull from "public/icons/icon24px/rating/star-full.svg";

import useStyles from "./Rating.styles";

export interface RatingProps extends Omit<MRatingProps, "size" | "emptySymbol" | "fullSymbol"> {
    size?: "small" | "normal";
    emptySymbol?: ReactNode;
    fullSymbol?: ReactNode;
    error?: ReactNode;
}

const MemoizedRating = memo(function Rating({
    size = "normal",
    error,
    emptySymbol = <IconStarDefault />,
    fullSymbol = <IconStarFull />,
    ...props
}: RatingProps) {
    const { classes } = useStyles({ size });

    const renderError = useMemo(
        () =>
            error && (
                <Flex className={classes.error}>
                    <AlertTriangle />
                    <Text>{error}</Text>
                </Flex>
            ),
        [error]
    );

    return (
        <>
            <MRating
                {...props}
                classNames={classes}
                emptySymbol={
                    <ThemeIcon
                        variant="outline"
                        color="secondary"
                        sx={(theme) => ({
                            border: "none",
                            path: {
                                stroke: error ? theme.colors.warning[0] : theme.colors.gray45[0],
                            },
                        })}>
                        {emptySymbol}
                    </ThemeIcon>
                }
                fullSymbol={
                    <ThemeIcon
                        variant="outline"
                        color="secondary"
                        sx={(theme) => ({
                            border: "none",
                            path: {
                                fill: theme.colors.secondary[0],
                                stroke: theme.colors.secondary[0],
                            },
                        })}>
                        {fullSymbol}
                    </ThemeIcon>
                }
            />
            {renderError}
        </>
    );
});

export default MemoizedRating;
