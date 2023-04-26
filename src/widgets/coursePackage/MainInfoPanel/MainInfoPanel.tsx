import { Box, BoxProps, Flex, Group, Text, Title } from "@mantine/core";
import { memo, useMemo } from "react";
import Image from "next/image";
import { closeModal, openModal } from "@mantine/modals";
import { Button } from "@shared/ui";
import { getDiscountedAmount, getPluralString } from "@shared/utils";
import { GetCoursePackageResponse } from "@entities/coursePackage";

import { InvoicePaymentForm } from "@features/coursePackages";
import useStyles from "./MainInfoPanel.styles";
import { CourseList, DiscountInfo } from "./components";

export interface MainInfoPanelProps extends Omit<BoxProps, "children"> {
    data: GetCoursePackageResponse;
}

const MemoizedMainInfoPanel = memo(function MainInfoPanel({ data, ...props }: MainInfoPanelProps) {
    const { classes } = useStyles();

    const handleCloseModal = () => closeModal("INVOICE_PAYMENT");

    const renderAmount = useMemo(() => {
        if (data.isDiscount && data.discount?.value) {
            return (
                <Group sx={{ gap: 6 }}>
                    <Text className={classes.price}>{`${getDiscountedAmount(data.price, data.discount.value)} ₽`}</Text>
                    <Text className={classes.priceWithoutDiscount}>{`${data.price} ₽`}</Text>
                </Group>
            );
        }
        return <Text className={classes.price}>{`${data.price} ₽`}</Text>;
    }, [data.price, data.isDiscount, data.discount]);

    return (
        <Box {...props} className={classes.root}>
            <Flex mb={32}>
                <Group
                    sx={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        flexWrap: "nowrap",
                        flex: 1,
                    }}>
                    <Flex direction="column" gap={16}>
                        <DiscountInfo data={{ discount: data.discount, isDiscount: data.isDiscount }} />
                        <Title order={1} color="dark" lineClamp={2}>
                            {data.name}
                        </Title>
                        <Text className={classes.description} lineClamp={2}>
                            {data.description}
                        </Text>
                    </Flex>

                    <Group sx={{ columnGap: 24, marginBottom: 16 }}>
                        <Button
                            variant="secondary"
                            onClick={() =>
                                openModal({
                                    modalId: "INVOICE_PAYMENT",
                                    title: "Счет на оплату",
                                    centered: true,
                                    size: 456,
                                    children: <InvoicePaymentForm onClose={handleCloseModal} />,
                                })
                            }>
                            Получить доступ
                        </Button>
                        <Flex direction="column">
                            <Text>Стоимость пакета</Text>
                            {renderAmount}
                        </Flex>
                    </Group>
                </Group>
                <Group>
                    <Box className={classes.imageWrapper}>
                        <Image
                            src={data.picture.path}
                            loader={({ src }) => `${src}`}
                            layout="fill"
                            objectFit="cover"
                            alt={data.picture.name}
                        />
                    </Box>
                </Group>
            </Flex>
            <Flex direction="column" gap={16}>
                <Text className={classes.countCoursesInPackage}>{`${data.courses.pagination.total} ${getPluralString(
                    data.courses.pagination.total,
                    "курс",
                    "курса",
                    "курсов"
                )} в пакете`}</Text>
                <CourseList data={data} />
            </Flex>
        </Box>
    );
});

export default MemoizedMainInfoPanel;
