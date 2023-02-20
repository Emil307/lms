import { axios } from "src/config/axios";
import { BaseApi } from "utils/types";
import { $testData, TestData } from "./types";

export class UiKitApi extends BaseApi {
    async getTestData(): Promise<TestData> {
        const result = await this.instance.get("/hello");
        return $testData.parse(result.data);
    }
}

export const uiKitApi = new UiKitApi(axios);
