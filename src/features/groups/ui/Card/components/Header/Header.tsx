import { Badge, Box, Card as MCard, CardProps as MCardProps, Flex, ThemeIcon } from "@mantine/core";
import { memo, useMemo } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import IconCalendar from "public/icons/calendar.svg";
import { Heading, Paragraph } from "@shared/ui";
import { GroupFromList } from "@entities/group";
import useStyles from "./Header.styles";

export interface HeaderProps extends Omit<MCardProps, "children"> {
    data: GroupFromList;
}

const MemoizedHeader = memo(function Header({ data, ...props }: HeaderProps) {
    const { classes } = useStyles({ status: data.status.name });

    const renderEndDate = useMemo(() => {
        if (data.availableTo) {
            return <Paragraph variant="text-small-m">{`Доступ: до ${dayjs(data.availableTo).format("D MMMM YYYY")}`}</Paragraph>;
        }
        return <Paragraph variant="text-small-m">Бессрочный доступ</Paragraph>;
    }, [data.availableTo]);

    return (
        <MCard.Section {...props} className={classes.root}>
            <Flex className={classes.contentWrapper}>
                <Badge className={classes.status}>{data.status.displayName}</Badge>
                <Heading order={4} lineClamp={2}>
                    {data.name}
                </Heading>
                <Flex align="center" sx={{ gap: 8 }}>
                    <ThemeIcon className={classes.iconCalendarWrapper}>
                        <IconCalendar />
                    </ThemeIcon>
                    {renderEndDate}
                </Flex>
            </Flex>
            <Box className={classes.imageWrapper}>
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
            </Box>
        </MCard.Section>
    );
});

export default MemoizedHeader;
