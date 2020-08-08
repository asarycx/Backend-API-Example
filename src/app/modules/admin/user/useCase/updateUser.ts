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
    var { email, fullname, password, roles } = request.body;

    // Prepare the Repository
    const UserRepository = getRepository(User);

    // Find the user based on UUID
    await UserRepository.findOneOrFail({
      where: { uuid: request.params.uuid },
      relations: ["roles"],
    })
      .then(async (userItem) => {
        // Populate with new values
        userItem.email = email;
        userItem.fullname = fullname;

        // If Password is Filled, update it
        if (password) {
          userItem.password = password;
          userItem.hashPassword();
        }

        // If Role is Filled, update it
        if (roles) {
          const RoleRepository = getRepository(Role);
          var NewRoles: Role[] = [];
          // check if data is an array or string
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
          userItem.roles = NewRoles;
        }
        // // If file is uploaded, update it
        if (request.file) {
          // the file metadata
          var fileMeta = {
            filename: `${userItem.username} Profile Picture`,
            fileoject: request.file.filename,
            filetype: "profile_picture",
            fileext: path.extname(request.file.originalname),
            fileattrib: `${userItem.username} Profile Picture`,
          };

          if (userItem.profile_image) {
            console.log("delup", request.file);
            // Delete previous profile pic if exists
            var filePath = path.resolve(
              `${process.cwd()}/public/user_files/${userItem.uuid}/${
                userItem.profile_image.file_object
              }`
            );
            fs.stat(filePath, (err, stats) => {
              if (!err) {
                fs.unlinkSync(filePath);
              }
            });
            // Update the file metadata to databse
            const FileRepository = getRepository(File);
            var ProfilePic = userItem.profile_image;
            ProfilePic.file_name = fileMeta.filename;
            ProfilePic.file_object = fileMeta.fileoject;
            ProfilePic.file_type = fileMeta.filetype;
            ProfilePic.file_extension = fileMeta.fileext;
            ProfilePic.file_attribute = fileMeta.fileattrib;
            ProfilePic.generateUrl(userItem.uuid);
            await FileRepository.save(ProfilePic);
          } else {
            console.log("up", request.file);
            // Create anew file metadata if didn't exist
            const FileRepository = getRepository(File);
            var newFile = new File();
            newFile.file_name = fileMeta.filename;
            newFile.file_object = fileMeta.fileoject;
            newFile.file_type = fileMeta.filetype;
            newFile.file_extension = fileMeta.fileext;
            newFile.file_attribute = fileMeta.fileattrib;
            newFile.generateUrl(userItem.uuid);
            await FileRepository.save(newFile);
            userItem.profile_image = newFile;
          }
        }

        // Save the new Data
        await UserRepository.save(userItem);

        // Return the result with 200
        return response.status(200).send(
          success({
            name: "UPDATE-USER-SUCCESS",
            message: "User updated successfully!",
          })
        );
      })
      .catch((err) => {
        return response
          .status(404)
          .send(failed({ ...err, name: "CREATE-USER-FAILED" }));
      });
  } catch (e) {
    // Return Error Result
    return response
      .status(500)
      .send(failed({ ...e, name: "UPDATE-USER-FAILED" }));
  }
}
