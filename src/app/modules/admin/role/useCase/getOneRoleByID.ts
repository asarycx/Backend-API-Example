import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { failed, success } from "@util/responseParser";
import roleMap from "@admin/role/mapper/roleMap";
import * as _ from "underscore";

import { Role } from "@database/entity/Role";

export default async function getOneRoleByID(
  request: Request,
  response: Response
) {
  try {
    // Prepare Role Repository &  Find the Role based on UUID
    const RoleRepository = getRepository(Role);
    await RoleRepository.findOneOrFail({
      where: { uuid: request.params.uuid },
      withDeleted: true,
      relations: ["permissions"],
    })
      .then((succ) => {
        // Return the result with 200
        return response.status(200).send(
          success({
            name: "READ-ONE-ROLE-SUCCESS",
            message: "Role fetched successfully.",
            data: roleMap(succ),
          })
        );
      })
      .catch((error) => {
        // Return the result with 200
        return response
          .status(404)
          .send(success({ ...error, name: "READ-ONE-ROLE-FAILED" }));
      });
  } catch (e) {
    // Return Error Result
    return response
      .status(e.status)
      .send(failed({ ...e, name: "READ-ONE-ROLE-FAILED" }));
  }
}
