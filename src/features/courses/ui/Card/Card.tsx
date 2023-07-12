import { Badge, Box, Card as MCard, CardProps as MCardProps, Group, Text, Flex } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { Course } from "@entities/course";
import { getPluralString } from "@shared/utils";
import IconStarFour from "public/icons/starFour.svg";
import { Heading } from "@shared/ui";
import useStyles from "./Card.styles";
import { AmountInfo, FavoriteButton, StartDateBlock } from "./components";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: Course;
}

const MemoizedCard = memo(function Card({ data, ...props }: CardProps) {
    const { classes } = useStyles({
        isFavorite: data.isFavorite,
    });

    const handleClickCard = () => undefined;

    const discountValue = data.discount && `${data.discount.amount} ${data.discount.type === "percentage" ? "%" : "₽"}`;

    return (
        <MCard {...props} className={classes.root} onClick={handleClickCard}>
            <MCard.Section className={classes.cardImageSection}>
                <Box className={classes.imageWrapper}>
                    {data.cover && (
                        <Image
                            src={data.cover.absolutePath}
                            loader={({ src }) => `${src}`}
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
                        <Group sx={{ gap: 6 }}>
                            <IconStarFour />
                            <Text>{`${data.lessonsCount} ${getPluralString(data.lessonsCount, "урок", "урока", "уроков")}`}</Text>
                        </Group>
                        <AmountInfo data={data} />
                    </Flex>
                    <FavoriteButton courseId={data.id} isFavorite={data.isFavorite} />
                </Group>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedCard;
