import { Card as MCard, CardProps as MCardProps, Title, Text } from "@mantine/core";
import { memo, ReactNode } from "react";
import { CoursePackage } from "@entities/coursePackage";
import { getPluralString } from "@shared/utils";
import { ContentByTextEditor } from "@shared/ui";
import { AmountInfo, DiscountInfo } from "./components";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: CoursePackage;
    children: ({ data }: { data: CoursePackage }) => ReactNode;
}

const MemoizedCard = memo(function CoursePackageCard({ data, children, ...props }: CardProps) {
    const { classes } = useStyles();

    return (
        <MCard {...props} className={classes.root}>
            <DiscountInfo discount={data.discount} />
            <MCard.Section className={classes.section} h={82}>
                <Title order={3} color="dark">
                    {data.name}
                </Title>
                <ContentByTextEditor className={classes.description} data={data.description} lineClamp={2} />
            </MCard.Section>
            <MCard.Section className={classes.section} sx={{ flex: 1, height: 160 }}>
                <Text className={classes.countCourses}>{`${data.courses.length} ${getPluralString(
                    data.courses.length,
                    "курс",
                    "курса",
                    "курсов",
                )} в пакете:`}</Text>
                {children({ data })}
            </MCard.Section>
            <AmountInfo data={data} />
        </MCard>
    );
});

export default MemoizedCard;
