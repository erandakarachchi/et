import axios, { AxiosInstance } from "axios";

export class BaseApi {
  protected axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  protected async get<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(url);
    return response.data;
  }

  protected async post<T>(url: string, data: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  protected async put<T>(url: string, data: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  protected async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }
}
