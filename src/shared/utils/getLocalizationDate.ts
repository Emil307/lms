export const getLocalizationDate = (dateString: string, withTime?: boolean) => {
    let date = new Date(dateString).toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    if (withTime) {
        date = date.concat(
            ` ${new Date(dateString).toLocaleString("ru-RU", {
                hour: "numeric",
                minute: "numeric",
            })}`,
        );
    }

    return date;
};
