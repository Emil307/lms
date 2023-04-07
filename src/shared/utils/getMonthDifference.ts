export const getMonthDifference = (startDateString: string, endDateString: string) => {
    const countYears = new Date(endDateString).getFullYear() - new Date(startDateString).getFullYear();
    const countDiffMonths = new Date(endDateString).getMonth() - new Date(startDateString).getMonth();
    return countDiffMonths + 12 * countYears;
};
