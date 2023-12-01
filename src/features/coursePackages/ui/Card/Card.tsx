import { Card as MCard, CardProps as MCardProps } from "@mantine/core";
import { memo, ReactNode } from "react";
import { CoursePackage } from "@entities/coursePackage";
import { getPluralString } from "@shared/utils";
import { ContentByTextEditor, Heading, Paragraph } from "@shared/ui";
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
            <MCard.Section className={classes.section}>
                <DiscountInfo discount={data.discount} discountPrice={data.discountPrice} fullPrice={data.price} />
                <Heading order={3}>{data.name}</Heading>
                <ContentByTextEditor color="gray45" data={data.description} lineClamp={2} />
            </MCard.Section>
            <MCard.Section className={classes.section} sx={{ flex: 1, height: 160 }}>
                <Paragraph variant="text-small-m" color="gray45">{`${data.courses.length} ${getPluralString(
                    data.courses.length,
                    "курс",
                    "курса",
                    "курсов"
                )} в пакете:`}</Paragraph>
                {children({ data })}
            </MCard.Section>
            <AmountInfo data={data} />
        </MCard>
    );
});

export default MemoizedCard;
