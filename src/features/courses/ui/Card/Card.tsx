import { Badge, Box, Card as MCard, CardProps as MCardProps, Group, Text, Flex } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { Course } from "@entities/course";
import useStyles from "./Card.styles";
import { AmountInfo, StartDateBlock } from "./components";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: Course;
}

const MemoizedCard = memo(function Card({ data, ...props }: CardProps) {
    const { classes } = useStyles({
        // TODO: Добавить isFavorite когда бек поправит
        isFavorite: false,
        // data.isFavorite
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
                            layout="fill"
                            objectFit="cover"
                            alt={data.cover.name}
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
                </Group>
            </MCard.Section>
            <MCard.Section className={classes.cardContentBody}>
                <Box className={classes.headingContent}>
                    <Text className={classes.title} lineClamp={2}>
                        {data.name}
                    </Text>
                    <StartDateBlock />
                </Box>
                {/* TODO: Добавить кол-во уроков и isFavorite  когда бек поправит*/}
                <Group sx={{ justifyContent: "space-between" }}>
                    <Flex direction="column">
                        {/* <Group sx={{ gap: 6 }}>
                            <IconStarFour />

                            <Text>{`${data.lessonCount} ${getPluralString(data.lessonCount, "урок", "урока", "уроков")}`}</Text>
                        </Group> */}
                        <AmountInfo data={data} />
                    </Flex>
                    {/* <FavoriteButton courseId={data.id} isFavorite={data.isFavorite} /> */}
                </Group>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedCard;
