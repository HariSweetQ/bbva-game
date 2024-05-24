export type StoreInterface = {
  setValue: function;
  getValue: function;
  remove: function;
}

export type StorageInterface = {
  [key:string]: StoreInterface
}
export type StorageService = {
  default: string,
  storages: StorageInterface,
  setValue: function,
  getValue: function,
  remove: function
}