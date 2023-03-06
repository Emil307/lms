import { Rating as MRating, RatingProps as MRatingProps } from "@mantine/core";
import { memo } from "react";
import IconStarDefault from "public/icons/icon24px/rating/star-default.svg";
import IconStarFull from "public/icons/icon24px/rating/star-full.svg";

import useStyles from "./Rating.styles";

export interface RatingProps extends Omit<MRatingProps, "size"> {
    size?: "small" | "normal";
}

const MemoizedRating = memo(function Rating({
    size = "normal",
    emptySymbol = <IconStarDefault />,
    fullSymbol = <IconStarFull />,
    ...props
}: RatingProps) {
    const { classes } = useStyles({ size });
    return <MRating {...props} classNames={classes} emptySymbol={emptySymbol} fullSymbol={fullSymbol} />;
});

export default MemoizedRating;
