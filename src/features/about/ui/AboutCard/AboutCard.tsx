import { Card as MCard, CardProps as MCardProps, Flex, Text, Title } from "@mantine/core";
import Image from "next/image";
import { memo } from "react";
import { GetAboutResponse } from "@entities/staticPage";
import { Button } from "@shared/ui";
import useStyles from "./AboutCard.styles";

export interface AboutCardProps extends Omit<MCardProps, "children"> {
    data?: GetAboutResponse;
}

const MemoizedAboutCard = memo(function AboutCard({ data, ...props }: AboutCardProps) {
    const { classes } = useStyles();

    return (
        <MCard component={Flex} {...props} className={classes.root}>
            {data?.banner && (
                <MCard.Section className={classes.imageSection}>
                    <Image
                        src={data.banner.absolutePath}
                        loader={({ src }) => `${src}`}
                        alt={data.banner.name}
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </MCard.Section>
            )}
            <MCard.Section className={classes.contentSection}>
                <Flex direction="column" gap={48} maw={410}>
                    <Title order={2} color="dark">
                        {data?.title}
                    </Title>
                    <Button w="min-content">Подобрать курс</Button>
                </Flex>
                <Text className={classes.shortContent}>{data?.shortContent}</Text>
            </MCard.Section>
        </MCard>
    );
});

export default MemoizedAboutCard;
