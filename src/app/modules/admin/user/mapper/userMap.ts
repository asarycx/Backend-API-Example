/**
 * MAP FOR DATA CONSISTENCY
 */
export default function userMap(data) {
  return {
    id: data.uuid,
    nid: data.id,
    fullname: data.fullname,
    email: data.email,
    profile_image: data.profile_image ? data.profile_image.generateUrl() : null,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    deleted_at: data.deletedAt,
  };
}
