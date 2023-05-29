import { Badge, Box, Card as MCard, CardProps as MCardProps, Group, Text, Title } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { getPluralString } from "@shared/utils";
import { CourseTeacher } from "@entities/course";
import useStyles from "./TeacherCard.styles";

export interface TeacherCardProps extends Omit<MCardProps, "children"> {
    data: CourseTeacher;
}

const MemoizedTeacherCard = memo(function Card({ data, ...props }: TeacherCardProps) {
    const { classes } = useStyles();

    return (
        <MCard {...props} className={classes.root} maw={424}>
            <MCard.Section className={classes.cardImageSection}>
                <Box className={classes.imageWrapper}>
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
                </Box>
                <Group className={classes.cardSectionContent}>
                    <Badge variant="outline" className={classes.countCourse}>
                        {`${data.courseCount} ${getPluralString(data.courseCount, "курс", "курса", "курсов")}`}
                    </Badge>
                </Group>
            </MCard.Section>
            <MCard.Section className={classes.cardContentBody}>
                <Title order={3} color="dark" lineClamp={2}>
                    {`${data.profile.firstName} ${data.profile.lastName}`}
                </Title>
                <Text className={classes.userDescription} lineClamp={5}>
                    {data.profile.description}
                </Text>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedTeacherCard;
