export default interface CRUD {
  list: (limit: number, page: number) => Promise<any>;
  create: (resource: any) => Promise<any>;
  putById: (id: string, resource: any) => Promise<string>;
  readById: (id: string, excludePrivateKey: boolean) => Promise<any>;
  deleteById: (id: string) => Promise<string>;
  patchById: (id: string, resource: any) => Promise<string>;
  readAssociationsById: (id: string) => Promise<any>;
}
