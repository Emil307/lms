import React, { useState } from "react";
import Image from "next/image";
import { BoxProps, Flex, Stack } from "@mantine/core";
import rightSideImage from "public/buy-course-block-rightSide.png";
import { Button, Heading, Paragraph } from "@shared/ui";
import { AvailableGroupInfo } from "@widgets/course/MainInfoPanel/components";
import { CourseDetails } from "@entities/course";
import PriceBlock from "@widgets/course/BuyCourseBlock/components/PriceBlock/PriceBlock";
import BuyCourseDrawer from "@widgets/course/BuyCourseBlock/components/BuyCourseDrawer/BuyCourseDrawer";
import { useAuthPay } from "@app/utils";
import { hasDiscount } from "@shared/utils";
import useStyles from "./BuyCourseBlock.styles";

export interface BuyCourseProps extends Omit<BoxProps, "children"> {
    data: CourseDetails;
    id: string;
}

const BuyCourseBlock = ({ data, ...props }: BuyCourseProps) => {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const [step, setStep] = useState(1);

    const { handleBuyEntity, isLoading } = useAuthPay({
        entityId: data.id,
        entityName: data.name,
        entityType: "course",
        entityPrice: !hasDiscount({ discount: data.discount, discountPrice: data.discountPrice, defaultPrice: data.price })
            ? data.price
            : data.discountPrice,
        setOpened,
    });

    return (
        <Flex {...props} className={classes.blockWrapper}>
            <Flex className={classes.blockContainer}>
                <Flex direction="column" className={classes.priceContainer}>
                    <Stack spacing={24}>
                        <Heading order={1}>Стоимость</Heading>
                        <Paragraph variant="large" color="neutralMain50" pb={32}>
                            Оплатить курс можно с помощью QR или счета на оплату
                        </Paragraph>
                    </Stack>
                    <Stack spacing={24}>
                        <PriceBlock data={data} />
                        <AvailableGroupInfo data={data} grayColor />
                        <Flex className={classes.buyButtonContainer}>
                            <Button
                                size="large"
                                variant="primary"
                                disabled={!data.availableGroup?.freePlacesCount}
                                loading={isLoading}
                                onClick={handleBuyEntity}>
                                {data.discountPrice ? "Купить курс" : "Получить курс"}
                            </Button>
                            {data.availableGroup?.freePlacesCount && (
                                <Paragraph variant="small-m" color="neutralMain50">
                                    Начните обучение <br /> прямо сейчас!
                                </Paragraph>
                            )}
                        </Flex>
                    </Stack>
                </Flex>
                <Flex>
                    <Image src={rightSideImage} alt="buyCourseImage" className={classes.image} />
                </Flex>
            </Flex>
            {BuyCourseDrawer(opened, setOpened, setStep, step, data)}
        </Flex>
    );
};

export default BuyCourseBlock;
