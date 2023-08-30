import { Badge, Box, Card as MCard, CardProps as MCardProps, Flex } from "@mantine/core";
import Image from "next/image";
import { Heading, Paragraph } from "@shared/ui";
import { GetGroupResponse } from "@entities/group";
import { getPluralString } from "@shared/utils";
import useStyles from "./MainInfo.styles";

export interface MainInfoProps extends Omit<MCardProps, "children"> {
    data: GetGroupResponse;
}

const MainInfo = ({ data, ...props }: MainInfoProps) => {
    const { classes } = useStyles({ status: data.status.name });

    return (
        <MCard.Section {...props} className={classes.root}>
            <Flex className={classes.contentWrapper}>
                <Flex direction="column" gap={8}>
                    <Flex gap={8}>
                        <Badge className={classes.status}>{data.status.displayName}</Badge>
                        {data.category && <Badge className={classes.category}>{data.category.name}</Badge>}
                    </Flex>
                    <Heading order={4} lineClamp={2}>
                        {data.name}
                    </Heading>
                </Flex>
                <Flex gap={8}>
                    <Paragraph variant="text-small-m">{`${data.lessonsCount.total} ${getPluralString(
                        data.lessonsCount.total,
                        "урок",
                        "урока",
                        "уроков"
                    )}`}</Paragraph>
                    <Paragraph variant="text-small-m">{`${data.practiceCount.total} ${getPluralString(
                        data.practiceCount.total,
                        "практика",
                        "практики",
                        "практик"
                    )}`}</Paragraph>
                </Flex>
            </Flex>
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
        </MCard.Section>
    );
};

export default MainInfo;
