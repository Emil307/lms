import { TInfoCardDisplayFields } from "@components/InfoCard";
import { GetAdminTransactionResponse } from "@entities/transaction";
import { getFullName } from "@shared/utils";

export const fields: TInfoCardDisplayFields<GetAdminTransactionResponse> = [
    {
        name: "entity.type.name",
        label: "Вид сущности",
    },
    {
        name: "entity.name",
        label: "Сущность",
    },
    {
        name: "user",
        label: "Покупатель",
        renderString: (_value, item) => getFullName({ data: item?.user.profile }),
    },
    {
        name: "paymentType.name",
        label: "Вид оплаты",
    },
    {
        name: "amount",
        label: "Стоимость",
        renderString: (value) => `${value.toLocaleString("ru")} ₽`,
    },
];
