import { Request, Response, NextFunction } from "express";
import * as _ from "underscore";

import { success, failed } from "@util/responseParser";

export const checkPermission = (permissions: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous middleware
    const user = res.locals.user;
    console.log(user);
    if (!Boolean(user.permissions.length)) {
      // return 403 if user doesn't have any role
      // !!! Subject to change in the future!
      return res.status(403).send(
        failed({
          name: "INSUFFICIENT-PERMISSION",
          message: "You don't have any authorization to do this action.",
        })
      );
    } else {
      // Check if user has 1 string from permission<Array>
      if (permissions.some((r) => user.permissions.indexOf(r) >= 0)) {
        return next();
      }

      // Return 403 if none found
      return res.status(403).send(
        failed({
          name: "INSUFFICIENT-PERMISSION",
          message: "You don't have any authorization to do this action.",
        })
      );
    }
  };
};
