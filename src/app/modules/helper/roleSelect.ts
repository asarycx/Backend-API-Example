import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { failed, success } from "@util/responseParser";

import * as _ from "underscore";

import { Role } from "@database/entity/Role";
import roleMapSelect from "@admin/role/mapper/roleMapSelect";

export default async function roleSelect(request: Request, response: Response) {
  try {
    // Prepare User Repository
    const RoleRepository = getRepository(Role);
    await RoleRepository.find()
      .then((ok) => {
        return response.status(200).send(
          success({
            name: "HELPER-ROLE-SUCCESS",
            message: "Successfully fetched role data.",
            data: ok.map((item) => roleMapSelect(item)),
          })
        );
      })
      .catch((err) => {
        return response
          .status(500)
          .send({ ...err, name: "HELPER-ROLE-FAILED" });
      });
  } catch (e) {
    // Return Error Result
    return response
      .status(500)
      .send(failed({ ...e, name: "HELPER-ROLE-FAILED" }));
  }
}
