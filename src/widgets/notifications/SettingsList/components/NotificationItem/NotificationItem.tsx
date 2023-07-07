import { ChangeEvent, useCallback } from "react";
import { ControlPanel } from "@shared/ui";
import { labels } from "./constants";

export interface NotificationItemProps {
    fieldName: string;
    value: boolean;
    variant: "primary" | "secondary";
    onChange: (fieldName: string, value: boolean) => void;
}

const NotificationItem = ({ fieldName, value, variant, onChange }: NotificationItemProps) => {
    const label = labels[fieldName as keyof typeof labels];

    const handleChange = useCallback((newValue: ChangeEvent<HTMLInputElement>) => {
        onChange(fieldName, newValue.target.checked);
    }, []);

    return <ControlPanel label={label} variant={variant} checked={value} onChange={handleChange} />;
};

export default NotificationItem;
