import { Box, Flex, Text } from "@mantine/core";
import dayjs from "dayjs";
import { ReactNode, useCallback } from "react";
import { DisplayField } from "@shared/ui";
import { AdminArticlePackageDetails } from "@entities/articlePackage";
import useStyles from "./PackageInfo.styles";

export interface PackageInfoProps {
    data?: AdminArticlePackageDetails;
    children?: ReactNode;
}

export const PackageInfo = ({ data, children }: PackageInfoProps) => {
    const { classes } = useStyles();

    const discountSize = data?.discount?.amount ? `${data.discount.amount} ${data.discount.type === "currency" ? "₽" : "%"}` : "-";

    const validity = () => {
        if (!data?.discount?.startingDate || !data.discount.finishingDate) {
            return "-";
        }

        return `${dayjs(data.discount.startingDate).format("DD.MM.YYYY")} - ${dayjs(data.discount.finishingDate).format("DD.MM.YYYY")}`;
    };

    const renderCategories = useCallback(
        () => (
            <Box>
                {data?.categories.map((category) => (
                    <Text key={category.id} className={classes.category}>
                        {category.name}
                    </Text>
                ))}
            </Box>
        ),
        [data?.categories]
    );

    return (
        <Flex className={classes.root}>
            <DisplayField label="Название" value={data?.name} variant="compact" />
            <DisplayField label="Категория" variant="compact" render={renderCategories} />
            <DisplayField label="Полная стоимость пакета" value={`${data?.fullPrice.toLocaleString("ru")} ₽`} variant="compact" />
            <DisplayField label="Размер скидки" value={discountSize} variant="compact" />
            <DisplayField label="Стоимость со скидкой" value={`${data?.discountPrice?.toLocaleString("ru")} ₽`} variant="compact" />
            <DisplayField label="Период действия" value={validity()} variant="compact" />
            {children}
        </Flex>
    );
};

export default PackageInfo;
