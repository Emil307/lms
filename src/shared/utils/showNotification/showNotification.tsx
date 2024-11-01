import { AxiosError } from "axios";
import { NotificationProps as MNotificationProps, showNotification, updateNotification } from "@mantine/notifications";
import Image from "next/image";
import { ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle, Info, Image as ImageIcon } from "react-feather";
import { isMessageError } from "@shared/guards";
import getStyles from "./showNotification.styles";
import { ToastType } from "./constants";

export interface TNotificationProps extends Omit<MNotificationProps, "message"> {
    type: ToastType;
    srcImage?: string;
    message?: ReactNode;
    isMinimized?: boolean;
}

export const handleShowToast = (error: AxiosError) => {
    const isValidationError = error.response?.status === 422;

    if (!isValidationError && error.response?.data && isMessageError(error)) {
        //показываем более детальный текст ошибки, который выдает наш бэк
        return createNotification({ type: ToastType.ERROR, title: "Ошибка", message: error.response.data.message });
    }

    if (!isValidationError) {
        //показываем дефолтный текст ошибки
        return createNotification({ type: ToastType.ERROR, title: "Ошибка", message: error.message });
    }
};

export const createNotification = ({ type, srcImage, message = "", isMinimized = false, ...props }: TNotificationProps) => {
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
                return srcImage ? <Image src={srcImage} alt="Картинка" width={64} height={64} /> : <ImageIcon />;
        }
    };

    return (
        showNotification({
            ...props,
            message,
            styles: (theme) => getStyles({ type, isMinimized })(theme),
            icon: getIcon(),
        }),
        updateNotification({
            id: String(props.id),
            ...props,
            message,
            styles: (theme) => getStyles({ type, isMinimized })(theme),
            icon: getIcon(),
        })
    );
};
