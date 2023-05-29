import { Box, Flex } from "@mantine/core";
import dayjs from "dayjs";
import { ReactNode } from "react";
import Image from "next/image";
import { DisplayField } from "@shared/ui";
import { AdminCoursePackageDetails } from "@entities/coursePackage";
import IconImageEmpty from "public/icons/imageEmpty.svg";
import useStyles from "./PackageInfo.styles";

export interface PackageInfoProps {
    data?: AdminCoursePackageDetails;
    children?: ReactNode;
}

export const PackageInfo = ({ data, children }: PackageInfoProps) => {
    const { classes } = useStyles();

    const discountSize = data?.discount?.amount ? `${data.discount.amount} ${data.discount.type === "currency" ? "₽" : "%"}` : "-";

    const validity = () => {
        if (!data?.discount?.startingDate || !data.discount.finishingDate) {
            return "-";
        }

        return `${dayjs(data.discount.startingDate).format("DD.MM.YYYY")} - ${dayjs(data.discount.finishingDate).format("DD.MM.YYYY")}`;
    };

    return (
        <Flex className={classes.root}>
            <Box className={classes.imageWrapper}>
                {data?.cover ? (
                    <Image
                        src={data.cover.absolutePath}
                        loader={({ src }) => `${src}`}
                        alt={data.cover.name}
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <IconImageEmpty />
                )}
            </Box>
            <DisplayField label="Название" value={data?.name} variant="compact" />
            <DisplayField label="Стоимость пакета" value={`${data?.price.toLocaleString("ru")} ₽`} variant="compact" />
            <DisplayField label="Размер скидки" value={discountSize} variant="compact" />
            <DisplayField label="Стоимость со скидкой" value={`${data?.discountPrice.toLocaleString("ru")} ₽`} variant="compact" />
            <DisplayField label="Период действия" value={validity()} variant="compact" />
            {children}
        </Flex>
    );
};

export default PackageInfo;
