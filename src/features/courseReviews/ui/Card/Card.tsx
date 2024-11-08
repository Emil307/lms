import { Card as MCard, CardProps as MCardProps, Flex, Text, Avatar, Stack } from "@mantine/core";
import { memo } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { Paragraph, Rating } from "@shared/ui";
import { CourseReviewFromList } from "@entities/courseReview";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: CourseReviewFromList;
    isActive: boolean;
}

const MemoizedCard = memo(function Card({ data, isActive, ...props }: CardProps) {
    const { classes, cx } = useStyles();

    return (
        <MCard {...props} className={cx(classes.root, { activeSlide: isActive })} w={{ base: 343, sm: 424 }}>
            <Flex direction="column" justify="space-between" h="100%">
                <MCard.Section className={classes.section}>
                    <Flex align="center">
                        <Flex align="center" gap="18px" w="100%">
                            <Avatar size={48} src={data.user.profile.avatar?.absolutePath} style={{ borderRadius: "50%" }} />
                            <Flex
                                align={{ base: "start", sm: "center" }}
                                direction={{ base: "column", sm: "row" }}
                                justify="space-between"
                                w="100%">
                                <Paragraph variant="large">
                                    {data.user.profile.firstName} {data.user.profile.lastName}
                                </Paragraph>
                                <Flex gap={16} direction={{ base: "column", xs: "row" }}>
                                    <Paragraph variant="text-small-m" color="neutralMain50" m="auto">
                                        {dayjs(data.createdAt).format("D MMM YYYY")}
                                    </Paragraph>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Stack spacing={12}>
                        <Flex className={classes.rating}>
                            <Rating defaultValue={1} count={1} readOnly size="small" />
                            <Flex gap={4}>
                                <Paragraph variant="large" color="dark">
                                    {data.score}
                                </Paragraph>
                                <Paragraph variant="large" color="neutralMain50">
                                    из 5
                                </Paragraph>
                            </Flex>
                        </Flex>
                        <Flex className={classes.description}>
                            <Paragraph variant="large" color="dark">
                                {data.content}
                            </Paragraph>
                        </Flex>
                    </Stack>
                </MCard.Section>
                <MCard.Section className={classes.section}>
                    <Flex direction="column" gap={2}>
                        <Paragraph variant="small-m" color="neutralMain50">
                            Курс
                        </Paragraph>
                        <Flex align="center" gap={8}>
                            <Text
                                component={Link}
                                href={{ pathname: "/courses/[id]", query: { id: String(data.course?.id) } }}
                                className={classes.courseName}>
                                {data.course?.name}
                            </Text>
                        </Flex>
                    </Flex>
                </MCard.Section>
            </Flex>
        </MCard>
    );
});

export default MemoizedCard;
