import { AxiosError } from "axios";
import { NotificationProps as MNotificationProps, showNotification } from "@mantine/notifications";
import Image from "next/image";
import { AlertCircle, AlertTriangle, CheckCircle, Info, Image as ImageIcon } from "react-feather";
import { FormErrorResponse } from "@shared/types";
import getStyles from "./showNotification.styles";
import { ToastType } from "./constants";

export interface TNotificationProps extends MNotificationProps {
    type: ToastType;
    srcImage?: string;
}

export const isErrorsArray = (error?: AxiosError): error is AxiosError<FormErrorResponse> => {
    return (error as AxiosError<FormErrorResponse>).response?.data.errors[0] !== undefined;
};

export const isMessageError = (error: AxiosError): error is AxiosError<FormErrorResponse> => {
    return (error as AxiosError<FormErrorResponse>).response?.data.message !== undefined;
};

export const handleShowToast = (error: AxiosError) => {
    const isValidationError = error.response?.status === 422;

    if (isErrorsArray(error) && isValidationError) {
        //обработка ошибок валидации форм (несколько ошибок)
        Object.values(error.response?.data.errors ?? {}).forEach((errorItem) => {
            return createNotification({ type: ToastType.ERROR, title: "Ошибка", message: errorItem[0] });
        });
    }
    if (!isValidationError && error.response?.data && isMessageError(error)) {
        //показываем более детальный текст ошибки, который выдает наш бэк
        return createNotification({ type: ToastType.ERROR, title: "Ошибка", message: error.response.data.message });
    }

    if (!isValidationError) {
        //показываем дефолтный текст ошибки
        return createNotification({ type: ToastType.ERROR, title: "Ошибка", message: error.message });
    }
};

export const createNotification = ({ type, srcImage, ...props }: TNotificationProps) => {
    const getIcon = () => {
        switch (type) {
            case ToastType.INFO:
                return <Info />;
            case ToastType.SUCCESS:
                return <CheckCircle />;
            case ToastType.WARN:
                return <AlertTriangle />;
            case ToastType.ERROR:
                return <AlertCircle />;
            default:
                return srcImage ? <Image src={srcImage} alt="image" fill /> : <ImageIcon />;
        }
    };

    return showNotification({
        ...props,
        styles: (theme) => getStyles({ type, isMinimized: !props.message })(theme),
        icon: getIcon(),
    });
};
