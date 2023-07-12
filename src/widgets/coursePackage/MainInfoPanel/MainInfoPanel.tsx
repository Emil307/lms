import { Box, BoxProps, Flex, Group, Text } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { closeModal, openModal } from "@mantine/modals";
import { Button, Heading } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import { InvoicePaymentForm } from "@features/coursePackages";
import { CoursePackageDetails } from "@entities/coursePackage";
import { CourseList, DiscountInfo } from "./components";
import useStyles from "./MainInfoPanel.styles";

export interface MainInfoPanelProps extends Omit<BoxProps, "children"> {
    data: CoursePackageDetails;
}

const MemoizedMainInfoPanel = memo(function MainInfoPanel({ data, ...props }: MainInfoPanelProps) {
    const { classes } = useStyles({ hasDiscount: data.hasDiscount && !!data.discountPrice });

    const handleCloseModal = () => closeModal("INVOICE_PAYMENT");

    const handleGetAccessPackage = () => {
        openModal({
            modalId: "INVOICE_PAYMENT",
            title: "Счет на оплату",
            centered: true,
            size: 456,
            children: <InvoicePaymentForm onClose={handleCloseModal} />,
        });
    };

    const renderAmount = () => {
        if (data.hasDiscount && data.discountPrice) {
            return (
                <Flex align="center" gap={6}>
                    <Heading order={3} className={classes.price}>{`${data.discountPrice} ₽`}</Heading>
                    <Text className={classes.priceWithoutDiscount}>{`${data.price} ₽`}</Text>
                </Flex>
            );
        }
        return <Heading order={3} className={classes.price}>{`${data.price} ₽`}</Heading>;
    };

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
                        <DiscountInfo data={{ discount: data.discount, hasDiscount: data.hasDiscount }} />
                        <Heading lineClamp={2}>{data.name}</Heading>
                        <Text className={classes.description} lineClamp={2}>
                            {data.description}
                        </Text>
                    </Flex>

                    <Group sx={{ columnGap: 24, marginBottom: 16 }}>
                        <Button variant="secondary" onClick={handleGetAccessPackage}>
                            Получить доступ
                        </Button>
                        <Flex direction="column">
                            <Text>Стоимость пакета</Text>
                            {renderAmount()}
                        </Flex>
                    </Group>
                </Group>
                <Group>
                    <Box className={classes.imageWrapper}>
                        {data.cover && (
                            <Image
                                src={data.cover.absolutePath}
                                loader={({ src }) => `${src}`}
                                alt={data.cover.name}
                                fill
                                sizes="100vw"
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        )}
                    </Box>
                </Group>
            </Flex>
            <Flex direction="column" gap={16}>
                <Text className={classes.countCoursesInPackage}>{`${data.coursesCount} ${getPluralString(
                    data.coursesCount,
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
