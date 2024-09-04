import React, { SetStateAction } from "react";
import { createNotification, ToastType } from "@shared/utils";

export const formatPrice = (value: number | undefined) => {
    return value?.toLocaleString("ru-RU");
};

export const handleSend = (setOpened: React.Dispatch<SetStateAction<boolean>>, setStep: React.Dispatch<SetStateAction<number>>) => {
    createNotification({
        type: ToastType.SUCCESS,
        title: "Вам открыт доступ к курсу",
    });
    setOpened(false);
    setStep(1);
};

export const handleNextStep = (setStep: React.Dispatch<SetStateAction<number>>) => {
    setStep((prevStep) => prevStep + 1);
};
