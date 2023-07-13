export type ShortDateFormats = "2-digit" | "numeric";
export type DateFormats = "long" | "short" | "narrow" | ShortDateFormats;
export type FormatDateObjectType = {
    year: string;
    shortYear: string;
    month: string;
    shortMonth: string;
    day: string;
    shortDay: string;
    hours: string;
    shortHours: string;
    minutes: string;
    shortMinutes: string;
    isYesterday: boolean;
    isToday: boolean;
};

export const getHumanDate = (
    date?: Date | null,
    dateFormat?: {
        month?: DateFormats;
        day?: ShortDateFormats;
        year?: ShortDateFormats;
        hour?: ShortDateFormats;
        minute?: ShortDateFormats;
    }
): string => {
    if (!date) return "";
    return date.toLocaleDateString(
        "ru",
        dateFormat ?? {
            month: "long",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        }
    );
};
