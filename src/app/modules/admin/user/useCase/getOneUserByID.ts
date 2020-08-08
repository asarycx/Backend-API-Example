import { Request, Response } from "express";
import { getRepository, Like, Not, IsNull } from "typeorm";
import { failed, success } from "@util/responseParser";
import userMapWithRolesAndPerms from "@admin/user/mapper/userMapWithRolesAndPerms";
import * as _ from "underscore";

import { User } from "@database/entity/User";

export default async function getAllUser(request: Request, response: Response) {
  try {
    // Prepare User Repository &  Find the user based on UUID
    const UserRepository = getRepository(User);
    await UserRepository.findOneOrFail({
      where: { uuid: request.params.uuid },
      relations: ["roles"],
      withDeleted: true,
    })
      .then((succ) => {
        return response.status(200).send(
          success({
            name: "READ-ONE-USER-SUCCESS",
            message: "User fetched successfully.",
            data: userMapWithRolesAndPerms(succ),
          })
        );
      })
      .catch((error) => {
        // Return the result with 200
        return response
          .status(404)
          .send(success({ ...error, name: "READ-ONE-USER-FAILED" }));
      });
  } catch (e) {
    // Return Error Result
    return response
      .status(e.status)
      .send(failed({ ...e, name: "READ-ONE-USER-FAILED" }));
  }
}
