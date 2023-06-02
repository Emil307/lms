import { AdminCourse } from "@entities/course";
import { TInfoCardDisplayFields } from "@components/InfoCard";
import { getDiscountValue } from "@shared/utils";

export const getInfoCardFields = (courseData: AdminCourse): TInfoCardDisplayFields<AdminCourse> => {
    const { price, hasDiscount } = courseData;
    const fields = [
        { name: "name", label: "Название" },
        { name: "category.name", label: "Категория" },
        { name: "subcategory.name", label: "Тематика (подкатегория)" },
    ] as TInfoCardDisplayFields<AdminCourse>;

    if (price) {
        fields.push({ name: "price", label: "Стоимость курса", renderString: (_value, item) => `${item?.price.toLocaleString("ru")} ₽` });
    } else {
        fields.push({
            name: "price",
            label: "Бесплатный курс",
            renderString: () => "Да",
        });
    }
    if (hasDiscount) {
        fields.push({
            name: "discount",
            label: "Размер скидки",
            renderString: (_value, item) => getDiscountValue({ amountDiscount: item?.discount?.amount, type: item?.discount?.type }),
        });
        fields.push({
            name: "discountPrice",
            label: "Стоимость со скидкой",
            renderString: (_value, item) => `${item?.discountPrice.toLocaleString("ru")} ₽`,
        });
    }

    return fields;
};
