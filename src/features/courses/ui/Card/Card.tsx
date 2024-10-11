import { Badge, Box, Card as MCard, CardProps as MCardProps, Group, Flex } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { CourseFromList } from "@entities/course";
import { getDiscountValue } from "@shared/utils";
import { Button, Heading } from "@shared/ui";
import { AmountInfo } from "./components";
import useStyles from "./Card.styles";
import { FavoriteButton } from "../FavoriteButton";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: CourseFromList;
    onClick?: (courseId: number, courseData: CourseFromList) => void;
    buttonVariant?: "favorite" | "more";
}

const MemoizedCard = memo(function Card({ data, buttonVariant, onClick = () => undefined, ...props }: CardProps) {
    const { classes } = useStyles({ isFavorite: data.isFavorite });

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
                    <Flex justify="flex-end" onClick={(event) => event.stopPropagation()}>
                        <FavoriteButton data={data} variant="default" />
                    </Flex>
                );
            default:
                return null;
        }
    };

    return (
        <MCard {...props} className={classes.root} onClick={handleClickCard}>
            <MCard.Section className={classes.cardImageSection} p={24} pb={16}>
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
            </MCard.Section>
            <MCard.Section>
                <Group className={classes.cardSectionContent}>
                    {discountValue && data.discountPrice !== data.price && <Badge className={classes.discount}>-{discountValue}</Badge>}
                    {data.category && <Badge className={classes.category}>{data.category.name}</Badge>}
                    {data.subcategory && <Badge className={classes.category}>{data.subcategory.name}</Badge>}
                </Group>
            </MCard.Section>
            <MCard.Section className={classes.cardContentBody} ml={0}>
                <Box className={classes.headingContent}>
                    <Heading order={3} className={classes.title} lineClamp={2}>
                        {data.name}
                    </Heading>
                    <Heading order={5} lineClamp={2}>
                        {data.shortDescription}
                    </Heading>
                </Box>
                <Group sx={{ justifyContent: "space-between", gap: 0 }}>
                    <Flex direction="column">
                        <AmountInfo data={data} />
                    </Flex>
                    <Button className={classes.moreButton} variant="white" onClick={handleClickCard}>
                        Подробнее
                    </Button>
                </Group>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedCard;
