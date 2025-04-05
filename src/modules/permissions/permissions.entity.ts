// src/modules/permissions/entities/permission.entity.ts
import { AbstractEntityWithAudit } from 'src/database';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('permissions')
export class PermissionEntity extends AbstractEntityWithAudit {
  @Column({ unique: true })
  name: string; // Tên quyền (read, write, delete...)
}
