import { Card as MCard, Badge, Group, Flex, Title, Box } from "@mantine/core";
import { getHumanDate } from "@shared/utils";
import { ArticlePackageDiscount } from "@entities/article";
import IconBooks from "@public/icons/books.svg";
import useStyles from "./Header.styles";

export interface HeaderProps {
    data: {
        name: string;
        //TODO: Добавить как бекенда добавит это поле
        // description: string;
        discount: ArticlePackageDiscount | null;
    };
}

const Header = ({ data: { discount, name } }: HeaderProps) => {
    const { classes } = useStyles();

    const discountInfo = () => {
        if (!discount?.data) {
            return null;
        }

        return (
            <Group sx={{ gap: 8 }}>
                {discount.data.type === "percentage" && (
                    <Badge variant="outline" className={classes.discount}>
                        {discount.data.amount} %
                    </Badge>
                )}

                {discount.data.type === "currency" && (
                    <Badge variant="outline" className={classes.discount}>
                        {`-${discount.data.amount} ₽`}
                    </Badge>
                )}

                {discount.data.finishingDate && (
                    <Badge variant="outline" className={classes.discountEndDate}>
                        {`Доступно до ${getHumanDate(discount.data.finishingDate, {
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
                    {/* //TODO: Добавить как бекенда добавит это поле */}
                    {/* <Text className={classes.description}>{description}</Text> */}
                </Flex>
            </Flex>
        </MCard.Section>
    );
};

export default Header;
