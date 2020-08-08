import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { failed, success } from "@util/responseParser";

import * as path from "path";
import * as _ from "underscore";
import * as fs from "fs";

import { User } from "@database/entity/User";
import { File } from "@database/entity/File";
import { Role } from "@database/entity/Role";

export default async function createUser(request: Request, response: Response) {
  try {
    // Destructure the body
    var { uuid, email, fullname, password, permissions, roles } = request.body;

    // Prepare the Repository
    const UserRepository = getRepository(User);

    // Find the user based on UUID
    var UserDetail = new User();

    // Populate with new values
    UserDetail.uuid = uuid;
    UserDetail.email = email;
    UserDetail.fullname = fullname;

    // If Password is Filled, update it
    if (password) {
      UserDetail.password = password;
      UserDetail.hashPassword();
    }

    // If Role is Filled, update it
    if (roles) {
      const RoleRepository = getRepository(Role);
      var NewRoles: Role[] = [];
      if (Array.isArray(roles)) {
        roles.map((item) => {
          RoleRepository.findOneOrFail({
            where: { uuid: item },
          }).then((success) => NewRoles.push(success));
        });
      } else {
        RoleRepository.findOneOrFail({
          where: { uuid: roles },
        }).then((success) => NewRoles.push(success));
      }
      UserDetail.roles = NewRoles;
    }

    // IF FIlE EXIST, SAVA METADATA FOR FILE
    if (request.file) {
      // the file metadata
      var fileMeta = {
        filename: `${UserDetail.username} Profile Picture`,
        fileoject: request.file.filename,
        filetype: "profile_picture",
        fileext: path.extname(request.file.originalname),
        fileattrib: `${UserDetail.username} Profile Picture`,
      };
      // Create new metadata for file
      const FileRepository = getRepository(File);
      var newFile = new File();
      newFile.file_name = fileMeta.filename;
      newFile.file_object = fileMeta.fileoject;
      newFile.file_type = fileMeta.filetype;
      newFile.file_extension = fileMeta.fileext;
      newFile.file_attribute = fileMeta.fileattrib;
      newFile.generateUrl(UserDetail.uuid);
      await FileRepository.save(newFile);
      UserDetail.profile_image = newFile;
    }

    // Save the new Data
    await UserRepository.save(UserDetail);

    // Return the result with 200
    return response.status(200).send(
      success({
        name: "CREATE-USER-SUCCESS",
        message: "User successfully created.",
      })
    );
  } catch (e) {
    // Return Error Result
    return response
      .status(500)
      .send(failed({ ...e, name: "CREATE-USER-FAILED" }));
  }
}
