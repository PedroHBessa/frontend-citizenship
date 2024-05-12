import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { Buffer } from 'buffer';
import { Auth } from '../config/Auth';
import Configuration from '../config/Configuration';

/**
 * ES6 Axios Class.
 *
 * @class Api
 * @extends {Axios}
 */
export class ApiError extends Error {
  public status = 0;
}

export class Api {
  protected config!: Configuration;
  protected static token: string;
  public static $root: never;
  protected api: AxiosInstance;

  /**
   * Creates an instance of Api.
   *
   * @param {import("axios").AxiosRequestConfig} [config] - axios configuration.
   * @memberof Api
   */
  public constructor(config?: AxiosRequestConfig) {
    this.config = new Configuration();
    this.api = axios.create({ ...config, baseURL: this.config.baseUrl, headers: { 'Access-Control-Allow-Origin': '*'} });
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          const config = error.config;

          try {
            const token = await this.getToken();

            Api.token = token;
            if (token && config) {
              config.headers['Authorization'] = `Bearer ${token}`;
            }
          } catch (e) {
            console.error('No credentials found');
          }

          return new Promise((resolve, reject) => {
            config &&
              axios
                .request(config)
                .then((response: AxiosResponse) => {
                  resolve(response);
                })
                .catch((error: AxiosError) => {
                  reject(error);
                });
          });
        } else {
          return Promise.reject(error);
        }
      }
    );

    this.getUri = this.getUri.bind(this);
    this.request = this.request.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
    this.head = this.head.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);
  }

  public async getToken() {
    const credentials = Auth.getCredentials();

    if (!credentials) {
      throw new Error('No credentials for this user');
    }

    const response = await axios.post(this.config.endpoint.post.token, {
      username: credentials?.username,
      password: credentials?.password,
    });

    Api.token = response.data.access_token;
    Auth.setCredentials({
      username: credentials?.username,
      password: credentials?.password,
      accessToken: Api.token as string,
    });

    return Api.token;
  }

  public setAuthorizationHeader(
    config?: AxiosRequestConfig
  ): AxiosRequestConfig {
    if (!config) {
      config = {
        headers: {},
      };
    }
    if (!config.headers) {
      config.headers = {};
    }
    const credentials = Auth.getCredentials();

    if (credentials?.accessToken) {
      config.headers['Authorization'] = 'Bearer ' + credentials?.accessToken;
    }

    config.headers['Content-type'] =
      config.headers['Content-type'] ?? 'application/json';

    config.maxContentLength = 100000000;
    config.maxBodyLength = 1000000000;

    return config;
  }

  /**
   * Get Uri
   *
   * @param {import("axios").AxiosRequestConfig} [config]
   * @returns {string}
   * @memberof Api
   */
  public getUri(config?: AxiosRequestConfig): string {
    return this.api.getUri(config);
  }

  /**
   * Generic request.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP axios response payload.
   * @memberof Api
   *
   * @example
   * api.request({
   *   method: "GET|POST|DELETE|PUT|PATCH"
   *   baseUrl: "http://www.domain.com",
   *   url: "/api/v1/users",
   *   headers: {
   *     "Content-Type": "application/json"
   *  }
   * }).then((response: AxiosResponse<User>) => response.data)
   *
   */
  public request<T, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.api.request(config);
  }

  private getCacheTimestamp() {
    let data = sessionStorage.getItem('cache');

    if (!data) {
      data = this.setCacheTimestamp();
    }

    return Buffer.from(data).toString('base64');
  }

  private setCacheTimestamp() {
    const value = new Date().toISOString();

    sessionStorage.setItem('cache-timestamp', value);

    return value;
  }

  /**
   * HTTP GET method, used to fetch data `statusCode`: 200.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} HTTP `axios` response payload.
   * @memberof Api
   */
  public get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    let params = {};

    if (config?.params) {
      params = config.params;
    }
    config = {
      ...this.setAuthorizationHeader(config),
      params: {
        ...params,
        // timestamp: this.getCacheTimestamp(),
      },
    };

    return this.api.get(url, config);
  }

  /**
   * HTTP DELETE method, `statusCode`: 204 No Content.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    this.setCacheTimestamp();
    config = this.setAuthorizationHeader(config);

    return this.api.delete(url, config);
  }

  /**
   * HTTP HEAD method.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public head<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    config = this.setAuthorizationHeader(config);

    return this.api.head(url, config);
  }

  /**
   * HTTP POST method `statusCode`: 201 Created.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public post<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    this.setCacheTimestamp();
    config = this.setAuthorizationHeader(config);

    return this.api.post(url, data, config);
  }

  /**
   * HTTP PUT method.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public put<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    this.setCacheTimestamp();
    config = this.setAuthorizationHeader(config);

    return this.api.put(url, data, config);
  }

  /**
   * HTTP PATCH method.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public patch<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    config = this.setAuthorizationHeader(config);

    return this.api.patch(url, data, config);
  }

  /**
   *
   * @template T - type.
   * @param {import("axios").AxiosResponse<T>} response - axios response.
   * @returns {T} - expected object.
   * @memberof Api
   */
  public success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  public error(error: AxiosError<Error>) {
    throw error;
  }
}
