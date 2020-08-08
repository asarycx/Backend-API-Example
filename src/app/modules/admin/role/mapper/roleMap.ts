/**
 * MAP FOR DATA CONSISTENCY
 */

import permissionMap from "./permissionMap";

export default function roleMap(data) {
  return {
    nid: data.id,
    id: data.uuid,
    name: data.name,
    permissions: data.permissions
      ? data.permissions.map((item) => permissionMap(item))
      : [],

    value: data.uuid,
    label: `${data.name}`,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    deleted_at: data.deletedAt,
  };
}
