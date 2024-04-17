import json from './endpoint/urls.json';

interface Endpoint {
  [endpoint: string]: { [endpoint: string]: string };
}

export default class Configuration {
  private readonly _endpoint!: Endpoint;
  private readonly environment!: string;
  private readonly _baseUrl!: string;
  constructor() {
    this._endpoint = json;
    this.environment = process.env.NODE_ENV;
    this._baseUrl = String(this._endpoint['base_url'][this.environment]);
  }

  get endpoint(): Endpoint {
    return this._endpoint;
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  getRouteWithVars(route: string, vars: { [key: string]: string }): string {
    let newRoute = route;

    Object.keys(vars).forEach((key) => {
      newRoute = newRoute.replace(`:${key}`, vars[key]);
    });

    return newRoute;
  }
}
