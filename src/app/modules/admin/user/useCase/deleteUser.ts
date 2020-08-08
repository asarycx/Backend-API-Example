import { Request, Response } from "express";
import { getRepository, Like, Not, IsNull } from "typeorm";
import { failed, success } from "@util/responseParser";

import * as _ from "underscore";

import { User } from "@database/entity/User";

export default async function deleteUser(request: Request, response: Response) {
  try {
    // Prepare User Repository
    const UserRepository = getRepository(User);
    var WaitingList: User[] = [];
    var count = 0;
    await Promise.all(
      request.body.list.map(async (item) => {
        if (item != response.locals.user.id) {
          count++;
          await UserRepository.findOneOrFail({
            where: { uuid: item },
            withDeleted: true,
          }).then((success) => {
            WaitingList.push(success);
          });
        }
      })
    );

    // // Delete Everything
    await UserRepository.remove(WaitingList);

    // Success returns
    return response.status(200).send(
      success({
        name: "DELETE-USER-SUCCESS",
        message: `${count} User(s) successfully deleted.`,
      })
    );
  } catch (e) {
    // Return Error Result
    return response
      .status(500)
      .send(failed({ ...e, name: "DELETE-USER-FAILED" }));
  }
}
