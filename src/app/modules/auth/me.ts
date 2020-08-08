import { Request, Response } from "express";
import { failed, success } from "@util/responseParser";
import { getRepository } from "typeorm";

import * as _ from "underscore";

import { User } from "@database/entity/User";
import userMapWithRolesAndPerms from "@admin/user/mapper/userMapWithRolesAndPerms";

export default async function login(request: Request, response: Response) {
  try {
    // Find the user based on the UUID
    const UserRepository = getRepository(User);
    await UserRepository.findOneOrFail({
      where: { uuid: response.locals.user.id },
      relations: ["roles", "permissions"],
    }).then((ok) => {
      return response.status(200).send(
        success({
          name: "AUTH-ME",
          message: "Successfully fetched self information.",
          data: userMapWithRolesAndPerms(ok),
        })
      );
    });
    // Return the result
  } catch (error) {
    return response.status(401).send(failed(error));
  }
}
