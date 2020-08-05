export interface ApiRequest {
    success: boolean;
    sku?: string;
    name?: string;
    buy?: Currencies;
    sell?: Currencies;
    time?: number;
    source?: 'bptf' | 'scm';
    currency?: null | string;
}

export interface Currencies {
    metal: number;
    keys: number;
}