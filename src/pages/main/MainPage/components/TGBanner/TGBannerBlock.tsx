import { BoxProps, Flex } from "@mantine/core";
import Image from "next/image";
import tgBanner from "public/tg-banner-1320x316.png";
import tgBannerSm from "public/tg-banner-sm.png";
import useStyles from "./TGBannerBlock.styles";
import { useMedia } from "@shared/utils";

export interface TGBannerBlockProps extends Omit<BoxProps, "children"> {}

const TGBannerBlock = (props: TGBannerBlockProps) => {
    const { classes } = useStyles();
    const isTablet = useMedia("xs");
    return (
        <Flex justify="center" {...props}>
            <Image src={isTablet ? tgBannerSm : tgBanner} alt="tgBanner" className={classes.image} />
        </Flex>
    );
};

export default TGBannerBlock;
