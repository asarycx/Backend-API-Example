/**
 * MAP FOR DATA CONSISTENCY
 */
import permissionMapNameOnly from "./permissionMapNameOnly";

export default function roleMapWithPermissionNameOnly(data) {
  return {
    nid: data.id,
    id: data.uuid,
    name: data.name,
    permissions: data.permissions
      ? data.permissions.map((item) => permissionMapNameOnly(item))
      : [],

    value: data.uuid,
    label: `${data.name}`,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    deleted_at: data.deletedAt,
  };
}
