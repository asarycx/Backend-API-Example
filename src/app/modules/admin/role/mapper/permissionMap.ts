/**
 * MAP FOR DATA CONSISTENCY
 */
export default function permissionMap(data) {
  return {
    id: data.uuid,
    name: data.name,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    deleted_at: data.deletedAt,
  };
}
