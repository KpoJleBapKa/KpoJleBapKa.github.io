import { BaseContent } from '../interfaces/BaseContent';

export type Versioned<T extends BaseContent> = T & {
  version: number;
  changeLog: string[];
  incrementVersion: () => void;
}
