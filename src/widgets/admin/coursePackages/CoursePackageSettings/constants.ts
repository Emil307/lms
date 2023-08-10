import dayjs from "dayjs";
import { TInfoCardDisplayFields } from "@components/InfoCard";
import { AdminCoursePackageDetails } from "@entities/coursePackage";

export const fields: TInfoCardDisplayFields<AdminCoursePackageDetails> = [
    { name: "name", label: "Название" },
    {
        name: "price",
        label: "Стоимость пакета",
        renderString: (_value, item) => `${item?.price.toLocaleString("ru") || 0} ₽`,
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
