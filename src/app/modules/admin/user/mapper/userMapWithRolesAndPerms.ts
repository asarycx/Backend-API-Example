/**
 * MAP FOR DATA CONSISTENCY
 */
import roleMap from "@admin/role/mapper/roleMap";
import roleMapWithoutPermissions from "@admin/role/mapper/roleMapWithoutPermissions";
import permissionMapNameOnly from "@admin/role/mapper/permissionMapNameOnly";

export default function userMapWithRolesAndPerms(data) {
  var allPermission = [];
  var roles = data.roles ? data.roles.map((item) => roleMap(item)) : [];
  roles.map((item) => {
    item.permissions ? allPermission.push(...item.permissions) : null;
  });

  return {
    id: data.uuid,
    nid: data.id,
    fullname: data.fullname,
    email: data.email,
    profile_image: data.profile_image ? data.profile_image.file_url : null,
    roles: data.roles
      ? data.roles.map((item) => roleMapWithoutPermissions(item))
      : [],
    permissions: allPermission.map((item) => permissionMapNameOnly(item)),
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    deleted_at: data.deletedAt,
  };
}
