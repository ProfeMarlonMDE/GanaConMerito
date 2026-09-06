declare module "pg" {
  export interface QueryConfig {
    text: string;
    values?: any[];
  }
  export interface QueryResult<T = any> {
    rows: T[];
  }
  export class Client {
    constructor(config?: any);
    connect(): Promise<void>;
    end(): Promise<void>;
    query<T = any>(queryTextOrConfig: string | QueryConfig, values?: any[]): Promise<QueryResult<T>>;
  }
}
