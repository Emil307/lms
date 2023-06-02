import { ImageProps } from "next/dist/client/image";
import { DisplayFieldProps } from "@shared/ui";
import { ReactNode } from "react";

export type TInfoCardImageProps = Omit<ImageProps, "src"> & {
    src?: string | null;
    children?: ReactNode;
};

export type TInfoCardDisplayFields<T> = (DisplayFieldProps & {
    name: keyof T | string;
    renderString?: (value: T[keyof T], item?: T) => string;
})[];
