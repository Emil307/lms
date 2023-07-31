import { Card as MCard, CardProps as MCardProps } from "@mantine/core";
import { memo } from "react";
import { GroupFromList } from "@entities/group";
import useStyles from "./Card.styles";
import { Footer, Header, ProgressInfo } from "./components";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: GroupFromList;
}

const MemoizedCard = memo(function Card({ data, ...props }: CardProps) {
    const { classes } = useStyles();

    return (
        <MCard {...props} className={classes.root}>
            <Header data={data} />
            <ProgressInfo data={data} />
            <Footer data={data} />
        </MCard>
    );
});

export default MemoizedCard;
