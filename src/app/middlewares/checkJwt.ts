import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../config/config";

import { getRepository } from "typeorm";
import { User } from "@database/entity/User";

import { failed, success } from "@util/responseParser";
import userMapWithRolesAndPerms from "@admin/user/mapper/userMapWithRolesAndPerms";

import * as _ from "underscore";

/************************
 * SECTION Logic for JWT Checks
 ************************/
export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  const token = <string>req.headers.authorization;
  let jwtPayload;
  //Try to validate the token and get data
  try {
    // Validate the JWT
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
    var UserRepository = getRepository(User);

    // Check if User Exists
    await UserRepository.findOneOrFail({
      where: { uuid: jwtPayload.id },
      relations: ["roles", "roles.permissions"],
    })
      .then((userData) => {
        // return user with Roles and Perms to the next middleware
        res.locals.user = userMapWithRolesAndPerms(userData);
        return next();
      })
      .catch((err) => {
        // return 401 if user does not exist
        return res.status(401).send(failed(err));
      });
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    return res.status(401).send(failed(error));
  }
};
