import { Box, BoxProps, Flex } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { StaticReviewFromList } from "@entities/staticReview";
import { AuthorInfoCard, Header } from "./components";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<BoxProps, "children"> {
    data: StaticReviewFromList;
}

const MemoizedCard = memo(function Card({ data, ...props }: CardProps) {
    const { classes } = useStyles();

    return (
        <Box className={classes.root} {...props}>
            <Box className={classes.inner}>
                <Box className={classes.imageWrapper}>
                    {data.preview.absolutePath && (
                        <Image
                            src={data.preview.absolutePath}
                            alt="background"
                            loader={({ src }) => `${src}`}
                            fill
                            sizes="100vw"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: 32,
                            }}
                        />
                    )}
                </Box>
                <Flex className={classes.content}>
                    <Header data={data} />
                </Flex>
            </Box>
            <AuthorInfoCard data={data} />
        </Box>
    );
});

export default MemoizedCard;
