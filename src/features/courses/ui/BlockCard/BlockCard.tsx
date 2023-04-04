import { Card as MCard, CardProps as MCardProps } from "@mantine/core";
import { memo } from "react";
import { CourseBlock } from "@entities/course";
import useStyles from "./BlockCard.styles";
import { Footer, Header, ProgressInfo } from "./components";

export interface BlockCardProps extends Omit<MCardProps, "children"> {
    data: CourseBlock;
}

const MemoizedBlockCard = memo(function BlockCard({ data, ...props }: BlockCardProps) {
    const { classes } = useStyles();

    return (
        <MCard {...props} className={classes.root}>
            <Header data={data} />
            <MCard.Section className={classes.section}>
                <ProgressInfo data={data} />
            </MCard.Section>
            <Footer className={classes.section} data={data} />
        </MCard>
    );
});

export default MemoizedBlockCard;
