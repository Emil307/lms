import { Card as MCard, Badge, Group, Flex, Title, Box, Text } from "@mantine/core";
import { getHumanDate } from "@shared/utils";
import IconBooks from "@public/icons/books.svg";
import { ArticlePackage } from "@entities/articlePackage";
import useStyles from "./Header.styles";

export interface HeaderProps {
    data: Pick<ArticlePackage, "name" | "description" | "discount">;
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
                    <Title order={3} color="dark">
                        {name}
                    </Title>
                    <Text className={classes.description} lineClamp={1}>
                        {description}
                    </Text>
                </Flex>
            </Flex>
        </MCard.Section>
    );
};

export default Header;
