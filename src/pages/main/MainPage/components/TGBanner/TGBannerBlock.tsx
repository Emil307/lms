import { BoxProps, Flex } from "@mantine/core";
import Image from "next/image";
import tgBanner from "public/tg-banner-1320x316.png";
import useStyles from "./TGBannerBlock.styles";

export interface TGBannerBlockProps extends Omit<BoxProps, "children"> {}

const TGBannerBlock = (props: TGBannerBlockProps) => {
    const { classes } = useStyles();
    return (
        <Flex justify={"center"} {...props}>
            <Image src={tgBanner} alt={"tgBanner"} className={classes.image} />
        </Flex>
    );
};

export default TGBannerBlock;
