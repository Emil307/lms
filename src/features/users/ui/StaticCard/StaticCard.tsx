import { Badge, Box, Card as MCard, CardProps as MCardProps, Group, Text } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { getFullName, getPluralString } from "@shared/utils";
import { StaticUserFromList } from "@entities/user";
import { Heading } from "@shared/ui";
import useStyles from "./StaticCard.styles";

export interface StaticCardProps extends Omit<MCardProps, "children"> {
    data: StaticUserFromList;
}

const MemoizedStaticCard = memo(function StaticCard({ data, ...props }: StaticCardProps) {
    const { classes } = useStyles();

    const fullName = getFullName({ data: data.profile });

    return (
        <MCard {...props} className={classes.root} maw={424}>
            <MCard.Section className={classes.cardImageSection}>
                <Box className={classes.imageWrapper}>
                    {data.profile.avatar && (
                        <Image
                            src={data.profile.avatar.absolutePath}
                            loader={({ src }) => `${src}`}
                            alt={data.profile.avatar.name}
                            fill
                            sizes="100vw"
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    )}
                </Box>
                <Group className={classes.cardSectionContent}>
                    <Badge variant="outline" className={classes.countCourse}>
                        {`${data.courseCount} ${getPluralString(data.courseCount, "курс", "курса", "курсов")}`}
                    </Badge>
                </Group>
            </MCard.Section>
            <MCard.Section className={classes.cardContentBody}>
                <Heading order={3} lineClamp={2}>
                    {fullName}
                </Heading>
                <Text className={classes.userDescription} lineClamp={5}>
                    {data.profile.description}
                </Text>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedStaticCard;
