import { ImageProps } from "next/dist/client/image";
import { ReactNode } from "react";
import { DisplayFieldProps } from "@shared/ui";

export type TInfoCardImageProps = Omit<ImageProps, "src"> & {
    src?: string | null;
    children?: ReactNode;
};

export type TInfoCardDisplayFields<T> = (DisplayFieldProps & {
    name: keyof T | string;
    renderString?: (value: T[keyof T], item?: T) => string;
})[];
