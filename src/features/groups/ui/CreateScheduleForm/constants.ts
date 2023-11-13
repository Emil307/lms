import { CreateScheduleFormValidation } from "./types";

export const initialValues: CreateScheduleFormValidation = {
    scheduleDate: null,
    scheduleTimings: [{ to: null, from: null }],
};
