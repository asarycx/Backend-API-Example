import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { failed, success } from "@util/responseParser";

import * as _ from "underscore";

import { Permission } from "@database/entity/Permission";
import { Pages } from "@database/entity/Pages";

export default async function roleGrouped(
  request: Request,
  response: Response
) {
  try {
    // Prepare User Repository
    const PermissionRepository = getRepository(Permission);
    const PagesRepository = getRepository(Pages);

    var pages = await PagesRepository.find();
    var perms = await PermissionRepository.find();
    // Grouped Role mapper
    var grouped = pages.map((item) => {
      return {
        name: item.name,
        perms: _.map(
          _.filter(perms, (e) => e.name.endsWith(item.name)),
          (r) => {
            return {
              name: r.name,
              id: r.uuid,
              current_user_have: Boolean(
                response.locals.user.permissions.indexOf(r.name) > -1
              ),
            };
          }
        ),
      };
    });

    return response.status(200).send(
      success({
        name: "HELPER-ROLE-GROUPED-SUCCESS",
        message: "Successfully fetched role data.",
        data: grouped,
      })
    );
  } catch (e) {
    // Return Error Result
    return response
      .status(500)
      .send(failed({ ...e, name: "HELPER-ROLE-GROUPED-FAILED" }));
  }
}
