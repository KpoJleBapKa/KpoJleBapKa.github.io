import { BaseContent } from '../interfaces/BaseContent';
import { Role } from './Role';
import { Permission } from './Permission';

export type AccessControl<T extends BaseContent> = {
  [role in Role]: Permission;
}
