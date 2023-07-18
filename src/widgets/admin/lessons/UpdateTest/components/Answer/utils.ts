export const getAnswerLetter = (answerIndex: number) => {
    switch (answerIndex) {
        case 0:
            return "А";
        case 1:
            return "Б";
        case 2:
            return "В";
        case 3:
            return "Г";
        case 4:
            return "Д";
        default:
            return "А";
    }
};
