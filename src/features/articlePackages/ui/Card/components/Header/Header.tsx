import { Card as MCard, Badge, Group, Flex, Box, Text } from "@mantine/core";
import { getHumanDate } from "@shared/utils";
import IconBooks from "@public/icons/books.svg";
import { ArticlePackageFromList } from "@entities/articlePackage";
import { Heading } from "@shared/ui";
import useStyles from "./Header.styles";

export interface HeaderProps {
    data: Pick<ArticlePackageFromList, "name" | "description" | "discount">;
}

const Header = ({ data: { discount, name, description } }: HeaderProps) => {
    const { classes } = useStyles();

    const discountInfo = () => {
        if (!discount) {
            return null;
        }

        return (
            <Group sx={{ gap: 8 }}>
                {discount.type === "percentage" && (
                    <Badge variant="outline" className={classes.discount}>
                        {discount.amount} %
                    </Badge>
                )}

                {discount.type === "currency" && (
                    <Badge variant="outline" className={classes.discount}>
                        {`-${discount.amount} ₽`}
                    </Badge>
                )}

                {discount.finishingDate && (
                    <Badge variant="outline" className={classes.discountEndDate}>
                        {`Доступно до ${getHumanDate(discount.finishingDate, {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                        })}`}
                    </Badge>
                )}
            </Group>
        );
    };

    return (
        <MCard.Section className={classes.root}>
            <Box miw={128}>
                <IconBooks />
            </Box>
            <Flex direction="column" gap={16}>
                {discountInfo()}
                <Flex direction="column" gap={8}>
                    <Heading order={3}>{name}</Heading>
                    <Text className={classes.description} lineClamp={1}>
                        {description}
                    </Text>
                </Flex>
            </Flex>
        </MCard.Section>
    );
};

export default Header;
