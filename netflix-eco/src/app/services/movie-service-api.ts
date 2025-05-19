// movie-service-api.ts
export interface IMovieApiClient {
  search(query?: string, type?: string): Promise<void>;
  details(id: number, type?: string): Promise<void>;
  getWeatherForecast(): Promise<WeatherForecast[]>;
}

export class MovieApiClient implements IMovieApiClient {
  private baseUrl: string;
  private fetchFn: typeof fetch;

  constructor(baseUrl: string = '', fetchFn: typeof fetch = window.fetch.bind(window)) {
    this.baseUrl = baseUrl;
    this.fetchFn = fetchFn;
  }

  async search(query?: string, type?: string): Promise<void> {
    let url = `${this.baseUrl}/api/Movie/search`;
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (type) params.append('type', type);
    url += `?${params.toString()}`;

    const response = await this.fetchFn(url, { method: 'GET' });
    if (!response.ok) throw await handleError(response);
  }

  async details(id: number, type?: string): Promise<void> {
    if (id == null) throw new Error('id must be provided');
    let url = `${this.baseUrl}/api/Movie/details/${encodeURIComponent(id)}`;
    if (type) url += `?type=${encodeURIComponent(type)}`;

    const response = await this.fetchFn(url, { method: 'GET' });
    if (!response.ok) throw await handleError(response);
  }

  async getWeatherForecast(): Promise<WeatherForecast[]> {
    const response = await this.fetchFn(`${this.baseUrl}/WeatherForecast`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw await handleError(response);
    const data = await response.json();
    return Array.isArray(data)
      ? data.map((item) => WeatherForecast.fromJS(item))
      : [];
  }
}

export class WeatherForecast {
  date?: Date;
  temperatureC?: number;
  readonly temperatureF?: number;
  summary?: string;

  constructor(init?: Partial<WeatherForecast>) {
