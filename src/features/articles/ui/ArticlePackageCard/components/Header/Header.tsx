import { Card as MCard, Badge, Group, Flex, Title, Text, Box } from "@mantine/core";

import { getHumanDate } from "@shared/utils";
import { ArticlePackageDiscount } from "@entities/article";
import IconBooks from "@public/icons/books.svg";
import useStyles from "./Header.styles";

export interface HeaderProps {
    data: {
        name: string;
        description: string;
        isDiscount: boolean;
        discount?: ArticlePackageDiscount;
    };
}

const Header = ({ data: { discount, isDiscount, name, description } }: HeaderProps) => {
    const { classes } = useStyles();

    const discountInfo = () => {
        if (!isDiscount || !discount?.data || Array.isArray(discount.data)) {
            return null;
        }

        return (
            <Group sx={{ gap: 8 }}>
                <Badge variant="outline" className={classes.discount}>
                    {discount.data.value} %
                </Badge>
                {discount.data.to && (
                    <Badge variant="outline" className={classes.discountEndDate}>
                        {`Доступно до ${getHumanDate(new Date(discount.data.to), {
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
                    <Text className={classes.description}>{description}</Text>
                </Flex>
            </Flex>
        </MCard.Section>
    );
};

export default Header;
