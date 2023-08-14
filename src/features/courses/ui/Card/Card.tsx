import { Badge, Box, Card as MCard, CardProps as MCardProps, Group, Flex } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import { CourseFromList } from "@entities/course";
import { getDiscountValue, getPluralString } from "@shared/utils";
import IconStarFour from "public/icons/starFour.svg";
import { Button, Heading, Paragraph } from "@shared/ui";
import { AmountInfo, StartDateBlock } from "./components";
import useStyles from "./Card.styles";
import { FavoriteButton } from "../FavoriteButton";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: CourseFromList;
    onClick?: (courseId: number) => void;
    buttonVariant?: "favorite" | "more";
}

const MemoizedCard = memo(function Card({ data, buttonVariant, onClick = () => undefined, ...props }: CardProps) {
    const { classes } = useStyles({ isFavorite: data.isFavorite });

    const isTablet = useMediaQuery("(max-width: 1440px)");

    const handleClickCard = () => onClick(data.id);

    const discountValue = getDiscountValue({ amountDiscount: data.discount?.amount, type: data.discount?.type });

    const renderButton = () => {
        switch (buttonVariant) {
            case "favorite":
                return (
                    <Box onClick={(event) => event.stopPropagation()}>
                        <FavoriteButton data={data} variant={isTablet ? "compact" : "default"} />
                    </Box>
                );
            case "more":
                return (
                    <Button variant="white" onClick={handleClickCard}>
                        Подробнее
                    </Button>
                );
            default:
                return null;
        }
    };

    return (
        <MCard {...props} className={classes.root} onClick={handleClickCard}>
            <MCard.Section className={classes.cardImageSection}>
                <Box className={classes.imageWrapper}>
                    {data.cover && (
                        <Image
                            src={data.cover.absolutePath}
                            alt={data.cover.name}
                            fill
                            sizes="100vw"
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    )}
                </Box>
                <Group className={classes.cardSectionContent}>
                    {discountValue && (
                        <Badge variant="outline" className={classes.discount}>
                            {discountValue}
                        </Badge>
                    )}
                    {data.category && (
                        <Badge variant="outline" className={classes.category}>
                            {data.category.name}
                        </Badge>
                    )}
                    {data.subcategory && (
                        <Badge variant="outline" className={classes.category}>
                            {data.subcategory.name}
                        </Badge>
                    )}
                </Group>
            </MCard.Section>
            <MCard.Section className={classes.cardContentBody}>
                <Box className={classes.headingContent}>
                    <Heading order={4} className={classes.title} lineClamp={2}>
                        {data.name}
                    </Heading>
                    <StartDateBlock data={data} />
                </Box>
                <Group sx={{ justifyContent: "space-between" }}>
                    <Flex direction="column">
                        <Flex gap={6}>
                            <IconStarFour />
                            <Paragraph variant="text-small-m">{`${data.lessonsCount} ${getPluralString(
                                data.lessonsCount,
                                "урок",
                                "урока",
                                "уроков"
                            )}`}</Paragraph>
                        </Flex>
                        <AmountInfo data={data} />
                    </Flex>
                    {renderButton()}
                </Group>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedCard;
