import { BaseContent } from './BaseContent';

export type ContentOperations<T extends BaseContent> = {
  create: (content: T) => T;
  read: (id: string) => T | null;
  update: (id: string, content: Partial<T>) => T;
  delete: (id: string) => void;
}
