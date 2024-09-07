import React, { SetStateAction } from "react";

export const formatPrice = (value: number | undefined) => {
    return value?.toLocaleString("ru-RU");
};

export const handleSend = (setOpened: React.Dispatch<SetStateAction<boolean>>, setStep: React.Dispatch<SetStateAction<number>>) => {
    setOpened(false);
    setStep(1);
};

export const handleNextStep = (setStep: React.Dispatch<SetStateAction<number>>) => {
    setStep((prevStep) => prevStep + 1);
};
