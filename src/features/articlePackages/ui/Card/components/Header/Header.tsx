import { Card as MCard, Flex, Box } from "@mantine/core";
import IconBooks from "@public/icons/books.svg";
import { ArticlePackageFromList } from "@entities/articlePackage";
import { Heading, Paragraph } from "@shared/ui";
import useStyles from "./Header.styles";
import { DiscountInfo } from "../DiscountInfo";

export interface HeaderProps {
    data: Pick<ArticlePackageFromList, "name" | "description" | "discount">;
}

const Header = ({ data: { discount, name, description } }: HeaderProps) => {
    const { classes } = useStyles();

    return (
        <MCard.Section className={classes.root}>
            <Box miw={128}>
                <IconBooks />
            </Box>
            <Flex className={classes.contentContainer}>
                <DiscountInfo discount={discount} />
                <Flex className={classes.textContainer}>
                    <Heading order={3}>{name}</Heading>
                    <Paragraph variant="text-small-m" color="gray45" lineClamp={1}>
                        {description}
                    </Paragraph>
                </Flex>
            </Flex>
        </MCard.Section>
    );
};

export default Header;
