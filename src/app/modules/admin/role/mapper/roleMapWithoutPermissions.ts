/**
 * MAP FOR DATA CONSISTENCY
 */
export default function roleMapWithoutPermissions(data) {
  return {
    nid: data.id,
    id: data.uuid,
    name: data.name,

    value: data.uuid,
    label: `${data.name}`,

    created_at: data.createdAt,
    updated_at: data.updatedAt,
    deleted_at: data.deletedAt,
  };
}
