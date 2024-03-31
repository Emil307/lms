import { Badge, Box, Card as MCard, CardProps as MCardProps, Group } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { getFullName, getPluralString } from "@shared/utils";
import { StaticUserFromList } from "@entities/user";
import { Heading, Paragraph } from "@shared/ui";
import useStyles from "./StaticCard.styles";

export interface StaticCardProps extends Omit<MCardProps, "children"> {
    data: StaticUserFromList;
}

const MemoizedStaticCard = memo(function StaticCard({ data, ...props }: StaticCardProps) {
    const { classes } = useStyles();

    const fullName = getFullName({ data: data.profile });

    return (
        <MCard {...props} className={classes.root}>
            <MCard.Section className={classes.cardImageSection}>
                <Box className={classes.imageWrapper}>
                    {data.profile.additionalImage && (
                        <Image
                            src={data.profile.additionalImage.absolutePath}
                            alt={data.profile.additionalImage.name}
                            fill
                            sizes="100vw"
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    )}
                </Box>
                <Group className={classes.cardSectionContent}>
                    <Badge className={classes.countCourse}>
                        {`${data.coursesCount} ${getPluralString(data.coursesCount, "курс", "курса", "курсов")}`}
                    </Badge>
                </Group>
            </MCard.Section>
            <MCard.Section className={classes.cardContentBody}>
                <Heading order={3} lineClamp={2}>
                    {fullName}
                </Heading>
                <Paragraph variant="text-small-m" color="gray45" lineClamp={5}>
                    {data.profile.description}
                </Paragraph>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedStaticCard;
