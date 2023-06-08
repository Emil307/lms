import { TDefaultRequestParams } from "@shared/types";

export type TFunctionParams<F = unknown> = TDefaultRequestParams &
    F & {
        query: string;
    };

export type TExtraFiltersProps<E> = E extends Record<string, any> ? { extraFilterParams: E } : { extraFilterParams?: never };
