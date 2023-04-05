import { Card as MCard, CardProps as MCardProps, Title, Text } from "@mantine/core";
import { memo, ReactNode } from "react";
import { CoursePackage } from "@entities/coursePackage";
import { getPluralString } from "@shared/utils";
import { AmountInfo, DiscountInfo } from "./components";
import useStyles from "./CoursePackageCard.styles";

export interface CoursePackageCardProps extends Omit<MCardProps, "children"> {
    data: CoursePackage;
    children: ({ data }: { data: CoursePackage }) => ReactNode;
}

const MemoizedCoursePackageCard = memo(function CoursePackageCard({ data, children, ...props }: CoursePackageCardProps) {
    const { classes } = useStyles();

    return (
        <MCard {...props} className={classes.root}>
            <DiscountInfo data={{ discount: data.discount, isDiscount: data.isDiscount }} />
            <MCard.Section className={classes.section}>
                <Title order={3} color="dark">
                    {data.name}
                </Title>
                <Text className={classes.description}>{data.description}</Text>
            </MCard.Section>
            <MCard.Section className={classes.section} h={160}>
                <Text>{`${data.courses.meta.pagination.total} ${getPluralString(
                    data.courses.meta.pagination.total,
                    "курс",
                    "курса",
                    "курсов"
                )} в пакете:`}</Text>
                {children({ data })}
            </MCard.Section>
            <AmountInfo data={data} />
        </MCard>
    );
});

export default MemoizedCoursePackageCard;
