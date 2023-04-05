import { Box, Card as MCard, CardProps as MCardProps, Flex, ThemeIcon, Title, Text } from "@mantine/core";
import Image from "next/image";
import { CourseBlock } from "@entities/course";
import IconCalendar from "public/icons/calendar.svg";
import { getHumanDate } from "@shared/utils";
import useStyles from "./Header.styles";

export interface HeaderProps extends Omit<MCardProps, "children"> {
    data: CourseBlock;
}

const Header = ({ data, ...props }: HeaderProps) => {
    const { classes } = useStyles();

    const renderEndDate = () => {
        if (data.dateEnd) {
            return (
                <Text className={classes.endDate}>{`Доступ: до ${getHumanDate(new Date(data.dateEnd), {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                })}`}</Text>
            );
        }
        return <Text className={classes.endDate}>Бессрочный доступ</Text>;
    };

    return (
        <MCard.Section {...props} className={classes.root}>
            <Flex direction="column" gap={8} sx={{ flex: 1, minHeight: 96 }}>
                <Title order={4} color="dark" lineClamp={2}>
                    {data.name}
                </Title>
                <Flex align="center" sx={{ gap: 8 }}>
                    <ThemeIcon color="secondary16" w={32} h={32} sx={{ borderRadius: 56 }}>
                        <IconCalendar />
                    </ThemeIcon>
                    <>{renderEndDate()}</>
                </Flex>
            </Flex>
            <Box className={classes.imageWrapper}>
                <Image
                    src={data.picture.data.path}
                    loader={({ src }) => `${src}`}
                    layout="fill"
                    objectFit="cover"
                    alt={data.picture.data.name}
                />
            </Box>
        </MCard.Section>
    );
};

export default Header;
