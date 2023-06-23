import { Box, BoxProps, Flex } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { StaticReviewFromList } from "@entities/staticReview";
import { Footer, Header } from "./components";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<BoxProps, "children"> {
    data: StaticReviewFromList;
}

const MemoizedCard = memo(function Card({ data, ...props }: CardProps) {
    const { classes } = useStyles();

    return (
        <Box {...props} className={classes.root}>
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
                <Footer data={data} />
            </Flex>
        </Box>
    );
});

export default MemoizedCard;
