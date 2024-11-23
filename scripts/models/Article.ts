import { BaseContent } from '../interfaces/BaseContent';

export interface Article extends BaseContent {
  title: string;
  content: string;
  author: string;
}
