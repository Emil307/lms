import { Card as MCard, CardProps as MCardProps } from "@mantine/core";
import { memo } from "react";
import { GroupFromList } from "@entities/group";
import useStyles from "./Card.styles";
import { Footer, Header, ProgressInfo } from "./components";

export interface CardProps extends Omit<MCardProps, "children" | "onClick"> {
    data: GroupFromList;
    onClick?: (id: unknown) => void;
}

const MemoizedCard = memo(function Card({ data, onClick, ...props }: CardProps) {
    const { classes } = useStyles();

    const handleClick = () => onClick?.(data.groupId);

    return (
        <MCard {...props} className={classes.root} onClick={handleClick}>
            <Header data={data} />
            <ProgressInfo data={data} />
            <Footer data={data} />
        </MCard>
    );
});

export default MemoizedCard;
