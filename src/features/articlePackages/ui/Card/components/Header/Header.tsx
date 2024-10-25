import { Box, Flex } from "@mantine/core";
import IconBooks from "@public/icons/books.svg";
import { ArticlePackageFromList } from "@entities/articlePackage";
import { Heading, Paragraph } from "@shared/ui";
import useStyles from "./Header.styles";
import { DiscountInfo } from "../DiscountInfo";

export interface HeaderProps {
    data: Pick<ArticlePackageFromList, "name" | "description" | "discount" | "fullPrice" | "discountPrice">;
}

const Header = ({ data: { discount, fullPrice, discountPrice, name, description } }: HeaderProps) => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.root}>
            <Box miw={128}>
                <IconBooks />
            </Box>
            <Flex className={classes.contentContainer}>
                <DiscountInfo discount={discount} fullPrice={fullPrice} discountPrice={discountPrice} />
                <Flex className={classes.textContainer}>
                    <Heading order={3}>{name}</Heading>
                    <Paragraph variant="text-small-m" color="neutralMain50" lineClamp={2}>
                        {description}
                    </Paragraph>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Header;
