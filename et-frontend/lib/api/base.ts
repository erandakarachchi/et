import axios, { AxiosInstance } from "axios";

export class BaseApi {
  protected axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    console.log("BaseUrl from BASE", baseUrl);

    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    });
    console.log("AxiosInstance from BASE", this.axiosInstance);
  }

  protected async get<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(url);
    return response.data;
  }

  protected async post<T>(url: string, data: any): Promise<T> {
    console.log("Posting to", url, data);
    const response = await this.axiosInstance.post<T>(
      "https://mvku1vlwcg.execute-api.us-east-1.amazonaws.com/prod/expenses",
      data
    );
    // const response = await fetch("https://mvku1vlwcg.execute-api.us-east-1.amazonaws.com/prod/expenses", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });
    return response.data;
  }
}
