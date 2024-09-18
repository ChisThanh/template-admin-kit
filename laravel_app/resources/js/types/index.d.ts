import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export type UserItem = {
    id: number;
    name: string;
    email: string;
    created_at?: string;
    updated_at?: string;

    password?: string;
    password_confirmation?: string;
};

export type CategoryItem = {
    id: number;
    name: string;
};

export type BaseSearchType<T> = {
    limit: number;
    page: number;
    order_by: keyof T;
    sort: "desc" | "asc";
    term: string;
    filter: any[];
};

export type TermType = {
    field: string;
    cond: string;
    value: string;
};
