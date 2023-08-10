import dayjs from "dayjs";
import { Box } from "@mantine/core";
import { TInfoCardDisplayFields } from "@components/InfoCard";
import { GetAdminArticlePackageResponse } from "@entities/articlePackage";
import { Paragraph } from "@shared/ui";

export const fields: TInfoCardDisplayFields<GetAdminArticlePackageResponse> = [
    { name: "name", label: "Название" },
    {
        name: "categories",
        label: "Категории",
        renderString: (_value, item) => (
            <Box sx={{ textAlign: "start" }}>
                {item?.categories.map((category) => (
                    <Paragraph key={category.id} variant="small-semi" lineClamp={1}>
                        {category.name}
                    </Paragraph>
                ))}
            </Box>
        ),
    },
    {
        name: "price",
        label: "Стоимость пакета",
        renderString: (_value, item) => `${item?.fullPrice.toLocaleString("ru") || 0} ₽`,
    },
    {
        name: "discount.amount",
        label: "Размер скидки",
        renderString: (_value, item) => {
            if (!item?.discount) {
                return "-";
            }

            switch (item.discount.type) {
                case "currency":
                    return `${item.discount.amount.toLocaleString("ru") || 0} ₽`;
                case "percentage":
                    return `${item.discount.amount} %`;
            }
        },
        hidden: (_value, item) => !item?.hasDiscount,
    },

    {
        name: "discountPrice",
        label: "Стоимость со скидкой",
        renderString: (_value, item) => `${item?.discountPrice.toLocaleString("ru") || 0} ₽`,
        hidden: (_value, item) => !item?.hasDiscount,
    },
    {
        name: "discount.startingDate",
        label: "Период действия",
        renderString: (_value, item) => {
            if (!item?.discount) {
                return "-";
            }

            return `${dayjs(item.discount.startingDate).format("DD.MM.YYYY")} - ${dayjs(item.discount.finishingDate).format("DD.MM.YYYY")}`;
        },
        hidden: (_value, item) => !item?.hasDiscount,
    },
];
