import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { failed, success } from "@util/responseParser";

import * as _ from "underscore";

import { Role } from "@database/entity/Role";
import { Permission } from "@database/entity/Permission";

export default async function createRole(request: Request, response: Response) {
  try {
    // Destructure the body
    var { name, description, permissions } = request.body;

    // Prepare the Repository
    const RoleRepository = getRepository(Role);

    // Find the Role based on UUID
    var RoleDetail = new Role();

    // Populate with new values
    RoleDetail.name = name;
    RoleDetail.description = description;

    // If Perms is Filled, update it
    if (permissions) {
      const PermisssionRepository = getRepository(Permission);
      var NewPermissions: Permission[] = [];
      await Promise.all(
        permissions.map(async (item) => {
          await PermisssionRepository.findOneOrFail({
            where: { uuid: item },
          }).then((success) => NewPermissions.push(success));
        })
      );
      RoleDetail.permissions = NewPermissions;
    }

    // Save the new Data
    await RoleRepository.save(RoleDetail);

    // Return the result with 200
    return response.status(200).send(
      success({
        name: "CREATE-ROLE-SUCCESS",
        message: "Role successfully created.",
      })
    );
  } catch (e) {
    // Return Error Result
    return response
      .status(500)
      .send(failed({ ...e, name: "CREATE-ROLE-FAILED" }));
  }
}
