import { Card as MCard, CardProps as MCardProps } from "@mantine/core";
import { memo } from "react";
import { Plus } from "react-feather";
import { Button } from "@shared/ui";
import { CourseBlock } from "@entities/course";
import useStyles from "./SettedCard.styles";
import { Header, ProgramInfo } from "./components";

export interface SettedCardProps extends Omit<MCardProps, "children"> {
    data: CourseBlock;
}

const MemoizedSettedCard = memo(function SettedCard({ data, ...props }: SettedCardProps) {
    const { classes } = useStyles();

    return (
        <MCard {...props} className={classes.root}>
            <Header data={data} />
            <MCard.Section className={classes.section}>
                <ProgramInfo data={data} />
            </MCard.Section>
            <MCard.Section className={classes.section}>
                <Button variant="border" leftIcon={<Plus />}>
                    Добавить в мои курсы
                </Button>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedSettedCard;
