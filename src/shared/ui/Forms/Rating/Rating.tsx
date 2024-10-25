import { Flex, Rating as MRating, RatingProps as MRatingProps, ThemeIcon } from "@mantine/core";
import { memo, ReactNode, useMemo } from "react";
import { AlertTriangle } from "react-feather";
import IconStarDefault from "public/icons/icon24px/rating/star-default.svg";
import IconStarFull from "public/icons/icon24px/rating/star-full.svg";
import { Paragraph } from "@shared/ui";
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
                    <Paragraph variant="text-smaller">{error}</Paragraph>
                </Flex>
            ),
        [error],
    );

    return (
        <>
            <MRating
                {...props}
                classNames={classes}
                emptySymbol={
                    <ThemeIcon
                        color="secondary"
                        sx={(theme) => ({
                            width: 24,
                            path: {
                                stroke: error ? theme.colors.warning[0] : theme.colors.neutralMain50[0],
                            },
                        })}>
                        {emptySymbol}
                    </ThemeIcon>
                }
                fullSymbol={
                    <ThemeIcon
                        color="secondary"
                        sx={(theme) => ({
                            width: 24,
                            path: {
                                fill: theme.colors.errorDark[0],
                                stroke: theme.colors.errorDark[0],
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
