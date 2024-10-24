import { Badge, Box, Flex, Stack, StackProps } from "@mantine/core";
import Image from "next/image";
import { memo } from "react";
import Link from "next/link";
import { getDiscountValue } from "@shared/utils";
import { Button, Heading, Paragraph } from "@shared/ui";
import { CourseFromList } from "@entities/course";
import useStyles from "./Card.styles";
import { AmountInfo } from "./components";
import { FavoriteButton } from "../FavoriteButton";

export interface CardProps extends Omit<StackProps, "children" | "onClick"> {
    data: CourseFromList;
    onClick?: (courseId: number, courseData: CourseFromList) => void;
    buttonVariant?: "favorite" | "more";
}

const MemoizedCard = memo(function Card({ data, buttonVariant = "favorite", onClick = () => undefined, ...props }: CardProps) {
    const { classes } = useStyles();

    const handleClickCard = () => onClick(data.id, data);

    const discountValue = getDiscountValue({
        amountDiscount: data.discount?.amount,
        type: data.discount?.type,
        finishingDate: data.discount?.finishingDate,
    });

    const renderButton = () => {
        switch (buttonVariant) {
            case "favorite":
                return (
                    <Flex justify="flex-end" onClick={(event) => event.preventDefault()}>
                        <FavoriteButton data={data} variant="default" />
                    </Flex>
                );
            default:
                return null;
        }
    };

    return (
        <Link className={classes.linkCourse} href={{ pathname: "/courses/[id]", query: { id: String(data.id) } }}>
            <Stack spacing={16} className={classes.root} onClick={handleClickCard} {...props}>
                <Box className={classes.imageWrapper}>
                    {data.cover && (
                        <Image
                            src={data.cover.absolutePath}
                            alt={data.cover.name}
                            fill
                            sizes="100%"
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    )}
                    {renderButton()}
                </Box>

                <Flex gap={6} wrap="wrap">
                    {discountValue && data.discountPrice !== data.price && <Badge className={classes.discount}>-{discountValue}</Badge>}
                    {data.category && <Badge className={classes.category}>{data.category.name}</Badge>}
                    {data.subcategory && <Badge className={classes.category}>{data.subcategory.name}</Badge>}
                </Flex>
                <Stack className={classes.content} spacing={8}>
                    <Heading order={3} lineClamp={2}>
                        {data.name}
                    </Heading>
                    <Paragraph variant="small-m" lineClamp={2} c="neutral_main50">
                        {data.shortDescription}
                    </Paragraph>
                </Stack>

                <Flex justify="space-between" align="center">
                    <Flex direction="column">
                        <AmountInfo data={data} />
                    </Flex>
                    <Button variant="white" onClick={handleClickCard}>
                        Подробнее
                    </Button>
                </Flex>
            </Stack>
        </Link>
    );
});

export default MemoizedCard;
