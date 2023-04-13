import { Badge, Box, Card as MCard, CardProps as MCardProps, Flex, Group, Text } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import IconStarFour from "public/icons/starFour.svg";
import { getPluralString } from "@shared/utils";
import { Course } from "@entities/course";
import useStyles from "./Card.styles";
import { AmountInfo, FavoriteButton, StartDateBlock } from "./components";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: Course;
}

const MemoizedCard = memo(function Card({ data, ...props }: CardProps) {
    const { classes } = useStyles({ isFavorite: data.isFavorite });

    const handleClickCard = () => undefined;

    return (
        <MCard {...props} className={classes.root} onClick={handleClickCard}>
            <MCard.Section className={classes.cardImageSection}>
                <Box className={classes.imageWrapper}>
                    <Image
                        src={data.picture.data.path}
                        loader={({ src }) => `${src}`}
                        layout="fill"
                        objectFit="cover"
                        alt={data.picture.data.name}
                    />
                </Box>
                <Group className={classes.cardSectionContent}>
                    {data.isDiscount && (
                        <Badge variant="outline" className={classes.discount}>
                            {data.discount.data?.value} %
                        </Badge>
                    )}
                    <Badge variant="outline" className={classes.category}>
                        {data.categories.data.name}
                    </Badge>
                </Group>
            </MCard.Section>
            <MCard.Section className={classes.cardContentBody}>
                <Box className={classes.headingContent}>
                    <Text className={classes.title} lineClamp={2}>
                        {data.name}
                    </Text>
                    <StartDateBlock />
                </Box>
                <Group sx={{ justifyContent: "space-between" }}>
                    <Flex direction="column">
                        <Group sx={{ gap: 6 }}>
                            <IconStarFour />
                            <Text>{`${data.lessonCount} ${getPluralString(data.lessonCount, "урок", "урока", "уроков")}`}</Text>
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
