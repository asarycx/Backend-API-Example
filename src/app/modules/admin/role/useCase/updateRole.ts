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
    await RoleRepository.findOneOrFail({
      where: { uuid: request.params.uuid },
    })
      .then(async (roleItem) => {
        // Populate with new values
        roleItem.name = name;
        roleItem.description = description;

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
          roleItem.permissions = NewPermissions;
        }

        // Save the new Data
        await RoleRepository.save(roleItem).then();

        // Return the result with 200
        return response.status(200).send(
          success({
            name: "CREATE-ROLE-SUCCESS",
            message: "Role successfully updated.",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        return response.status(404).send(failed({ ...err }));
      });
  } catch (e) {
    // Return Error Result
    return response
      .status(500)
      .send(failed({ ...e, name: "CREATE-ROLE-FAILED" }));
  }
}
