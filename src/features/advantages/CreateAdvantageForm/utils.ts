import { CreateAdvantageRequest } from "@entities/staticPage";

export const adaptCreateAdvantageRequest = (data: CreateAdvantageRequest): CreateAdvantageRequest => {
    const { icon, ...rest } = data;
    return {
        ...rest,
        icon,
        iconId: icon?.id || null,
    };
};
