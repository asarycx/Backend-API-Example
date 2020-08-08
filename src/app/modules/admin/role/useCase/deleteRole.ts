import { Request, Response } from "express";
import { getRepository, Like, Not, IsNull } from "typeorm";
import { failed, success } from "@util/responseParser";

import * as _ from "underscore";

import { Role } from "@database/entity/Role";

export default async function deleteRole(request: Request, response: Response) {
  try {
    // Prepare Role Repository
    const RoleRepository = getRepository(Role);
    var WaitingList: Role[] = [];
    var count = 0;
    await Promise.all(
      request.body.list.map(async (item) => {
        count++;
        await RoleRepository.findOneOrFail({
          where: { uuid: item },
          withDeleted: true,
        }).then((success) => {
          WaitingList.push(success);
        });
      })
    );

    // // Delete Everything
    await RoleRepository.remove(WaitingList);

    // Success returns
    return response.status(200).send(
      success({
        name: "DELETE-ROLE-SUCCESS",
        message: `${count} Role(s) successfully deleted.`,
      })
    );
  } catch (e) {
    // Return Error Result
    console.log(e);
    return response
      .status(500)
      .send(failed({ ...e, name: "DELETE-ROLE-FAILED" }));
  }
}
