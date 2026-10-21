import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

import { CONFIG } from '@/config'
import { auth } from '@/config/firebase'

export class ApiService {
  private client: AxiosInstance

  constructor(baseURL: string = CONFIG.API_BASE_URL) {
    this.client = axios.create({ baseURL })

    // Attach the signed-in user's Firebase ID token. getIdToken() refreshes it when it has expired.
    this.client.interceptors.request.use(async (config) => {
      const token = await auth?.currentUser?.getIdToken()
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    })
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config)
  }

  public post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T, AxiosResponse<T>, D>(url, data, config)
  }

  public patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    return this.client.patch<T, AxiosResponse<T>, D>(url, data, config)
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config)
  }
}

export const apiService = new ApiService()
