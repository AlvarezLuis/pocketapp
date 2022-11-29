export declare class Manager {
    database: any;
    constructor(database: any);
    process(conn: any, data: any, query: any): any;
    create(data: any, query: any): Promise<any>;
    action(query: string): Promise<any>;
    actionWithParameters(query: string, params: any[]): Promise<any>;
    get(query: string, params: any[], isobject: boolean): Promise<undefined>;
}
//# sourceMappingURL=manager.d.ts.map