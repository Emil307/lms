import { Card as MCard, CardProps as MCardProps, Flex, Text, Spoiler } from "@mantine/core";
import { memo } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Paragraph, Rating } from "@shared/ui";
import { CourseReviewFromList } from "@entities/courseReview";
import { useMedia } from "@shared/utils";
import { AuthorInfo } from "./components";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: CourseReviewFromList;
    isActive: boolean;
}

const MemoizedCard = memo(function Card({ data, isActive, ...props }: CardProps) {
    const router = useRouter();
    const { classes, cx } = useStyles();

    const handleOpenCourse = () =>
        router.push({
            pathname: "/courses/[id]",
            query: { id: String(data.course?.id) },
        });
    const isTablet = useMedia("sm");

    return (
        <MCard {...props} className={cx(classes.root, { activeSlide: isActive })}>
            <Flex direction="column" justify="space-between" h="100%">
                <MCard.Section className={classes.section}>
                    <Flex gap={16} direction={{ base: "column", xs: "row" }}>
                        <AuthorInfo data={data} />
                        {!isTablet && (
                            <Paragraph variant="text-small-m" color="gray45" m="auto">
                                {dayjs(data.createdAt).format("D MMM YYYY")}
                            </Paragraph>
                        )}
                    </Flex>
                    <Flex className={classes.rating}>
                        <Rating defaultValue={1} count={1} readOnly size="small" />

                        <Text className={classes.ratingValue}>{data.score} из 5</Text>
                    </Flex>
                    <Spoiler maxHeight={192} showLabel="еще" hideLabel="свернуть">
                        <Paragraph variant="large">{data.content}</Paragraph>
                    </Spoiler>
                </MCard.Section>
                <MCard.Section className={classes.section}>
                    <Flex direction="column" gap={2}>
                        <Paragraph variant="text-small-m" color="gray45">
                            Курс
                        </Paragraph>
                        <Flex align="center" gap={8} onClick={handleOpenCourse}>
                            <Text className={classes.courseName}>{data.course?.name}</Text>
                        </Flex>
                    </Flex>
                </MCard.Section>
            </Flex>
        </MCard>
    );
});

export default MemoizedCard;
