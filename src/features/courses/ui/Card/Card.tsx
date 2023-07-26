import { Badge, Box, Card as MCard, CardProps as MCardProps, Group, Flex } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { Course } from "@entities/course";
import { getPluralString } from "@shared/utils";
import IconStarFour from "public/icons/starFour.svg";
import { Heading, Paragraph } from "@shared/ui";
import { AmountInfo, FavoriteButton, StartDateBlock } from "./components";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: Course;
    onClick?: (id: unknown) => void;
}

const MemoizedCard = memo(function Card({ data, onClick, ...props }: CardProps) {
    const { classes } = useStyles({
        isFavorite: data.isFavorite,
    });

    const handleClickCard = () => onClick?.(data.id);

    const discountValue = data.discount && `${data.discount.amount} ${data.discount.type === "percentage" ? "%" : "₽"}`;

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
                    <StartDateBlock />
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
                    <FavoriteButton courseId={data.id} isFavorite={data.isFavorite} />
                </Group>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedCard;
