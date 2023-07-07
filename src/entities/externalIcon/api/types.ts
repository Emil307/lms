import { z } from "zod";
import { $getFiltersRequestType, $getPaginationResponseType } from "@shared/types";

export type ExternalIcon = z.infer<typeof $ExternalIcon>;
export type ExternalIconFromList = z.infer<typeof $ExternalIconFromList>;

//REQ/RESP
export type GetExternalIconsRequest = z.infer<typeof $GetExternalIconsRequest>;
export type GetExternalIconsResponse = z.infer<typeof $GetExternalIconsResponse>;

export const $ExternalIcon = z.object({
    id: z.string(),
    name: z.string(),
});

export const $ExternalIconFromList = $ExternalIcon;

export const $GetExternalIconsResponse = $getPaginationResponseType($ExternalIconFromList);

export const $ExternalIconsRequest = z.object({});

export const $GetExternalIconsRequest = $getFiltersRequestType($ExternalIconsRequest);
