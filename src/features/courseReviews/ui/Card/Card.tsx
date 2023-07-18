import { ActionIcon, Card as MCard, CardProps as MCardProps, Flex, Text, Spoiler } from "@mantine/core";
import { memo } from "react";
import { ChevronRight } from "react-feather";
import { useRouter } from "next/router";
import { Paragraph, Rating } from "@shared/ui";
import { CourseReviewFromList } from "@entities/courseReview";
import { AuthorInfo } from "./components";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: CourseReviewFromList;
}

const MemoizedCard = memo(function Card({ data, ...props }: CardProps) {
    const router = useRouter();
    const { classes } = useStyles();

    const handleOpenCourse = () =>
        router.push({
            pathname: "/courses/[id]",
            query: { id: String(data.course?.id) },
        });

    return (
        <MCard {...props} className={classes.root}>
            <MCard.Section className={classes.section}>
                <Flex gap={16} direction={{ base: "column", xs: "row" }}>
                    <AuthorInfo data={data} />
                    <Flex className={classes.rating}>
                        <Rating defaultValue={1} count={1} readOnly size="small" />
                        <Text className={classes.ratingValue}>{data.score}</Text>
                    </Flex>
                </Flex>
                <Flex direction="column" gap={2}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Пройден курс
                    </Paragraph>
                    <Flex align="center" gap={8} onClick={handleOpenCourse}>
                        <Text className={classes.courseName}>{data.course?.name}</Text>
                        <ActionIcon className={classes.iconLinkCourse}>
                            <ChevronRight />
                        </ActionIcon>
                    </Flex>
                </Flex>
            </MCard.Section>
            <MCard.Section className={classes.section}>
                <Spoiler maxHeight={192} showLabel="еще" hideLabel="свернуть">
                    <Paragraph variant="small-m">{data.content}</Paragraph>
                </Spoiler>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedCard;
