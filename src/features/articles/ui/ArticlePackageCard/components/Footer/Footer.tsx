import { Card as MCard, Text, Flex } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { ArticlePackage } from "@entities/article";
import { getPluralString } from "@shared/utils";
import IconStarFour from "public/icons/starFour.svg";
import { Button } from "@shared/ui";
import { InvoicePaymentForm } from "@features/coursePackages";
import useStyles from "./Footer.styles";

export interface FooterProps {
    data: ArticlePackage;
}

const Footer = ({ data }: FooterProps) => {
    const { classes } = useStyles();

    //TODO: Вызов модалки скорее всего нужно будет позднее вынести на уровни выше
    // тк сейчас feature импортирует feature
    const handleCloseModal = () => closeModal("INVOICE_PAYMENT");

    const handleClickButton = () =>
        openModal({
            modalId: "INVOICE_PAYMENT",
            title: "Счет на оплату",
            centered: true,
            size: 456,
            children: <InvoicePaymentForm onClose={handleCloseModal} />,
        });

    const renderAmount = () => {
        const { discount, price } = data;

        if (discount?.data.amount) {
            return (
                <Flex sx={{ gap: 6 }}>
                    <Text className={classes.price}>{`${discount.data.amount.toLocaleString("ru")} ₽`}</Text>
                    <Text className={classes.priceWithoutDiscount}>{`${price.toLocaleString("ru")} ₽`}</Text>
                </Flex>
            );
        }
        return <Text className={classes.price}>{`${price.toLocaleString("ru")} ₽`}</Text>;
    };

    return (
        <MCard.Section className={classes.root}>
            <Flex direction="column" gap={6}>
                <Flex gap={8}>
                    <IconStarFour />
                    <Text className={classes.countPackages}>{`${data.articlesCount} ${getPluralString(
                        data.articlesCount,
                        "статья",
                        "статьи",
                        "статей"
                    )}`}</Text>
                </Flex>
                <> {renderAmount()}</>
            </Flex>
            <Button onClick={handleClickButton}>Получить доступ</Button>
        </MCard.Section>
    );
};

export default Footer;
