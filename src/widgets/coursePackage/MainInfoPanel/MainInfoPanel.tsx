import { Box, Flex, FlexProps, Text } from "@mantine/core";
import { memo } from "react";
import Image from "next/image";
import { closeModal, openModal } from "@mantine/modals";
import { Button, Heading, Paragraph } from "@shared/ui";
import { getPluralString } from "@shared/utils";
import { InvoicePaymentForm } from "@features/coursePackages";
import { CoursePackageDetails } from "@entities/coursePackage";
import { CourseList, DiscountInfo } from "./components";
import useStyles from "./MainInfoPanel.styles";

export interface MainInfoPanelProps extends Omit<FlexProps, "children"> {
    data: CoursePackageDetails;
}

const MemoizedMainInfoPanel = memo(function MainInfoPanel({ data, ...props }: MainInfoPanelProps) {
    const { classes } = useStyles({ hasDiscount: !!data.discount });

    const handleCloseModal = () => closeModal("INVOICE_PAYMENT");

    const handleGetAccessPackage = () => {
        openModal({
            modalId: "INVOICE_PAYMENT",
            title: "Счет на оплату",
            children: <InvoicePaymentForm onClose={handleCloseModal} />,
        });
    };

    const renderAmount = () => {
        if (data.discount) {
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
        <Flex {...props} className={classes.root}>
            <Flex className={classes.packageInfoWrapper}>
                <Flex className={classes.packageInfo}>
                    <Flex direction="column" gap={16}>
                        <DiscountInfo discount={data.discount} />
                        <Heading>{data.name}</Heading>
                        <Paragraph variant="small-m" color="gray45" fw={400}>
                            {data.description}
                        </Paragraph>
                    </Flex>

                    <Flex className={classes.containerPriceWithButton}>
                        <Button variant="secondary" onClick={handleGetAccessPackage}>
                            Получить доступ
                        </Button>
                        <Flex direction="column">
                            <Paragraph variant="text-small-m">Стоимость пакета</Paragraph>
                            {renderAmount()}
                        </Flex>
                    </Flex>
                </Flex>

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
            </Flex>
            <Flex direction="column" gap={16}>
                <Paragraph variant="text-small-m" color="gray45">{`${data.courses.length} ${getPluralString(
                    data.courses.length,
                    "курс",
                    "курса",
                    "курсов"
                )} в пакете`}</Paragraph>
                <CourseList data={data} />
            </Flex>
        </Flex>
    );
});

export default MemoizedMainInfoPanel;
