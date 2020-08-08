import { getRepository } from "typeorm";
import * as faker from "faker";
import * as _ from "underscore";

import { User } from "@database/entity/User";
import { Role } from "@database/entity/Role";
import { Permission } from "@database/entity/Permission";

const gender = faker.random.number(1);

export default async function generateUser(count: number = 1) {
  const UserRepository = getRepository(User);
  const RoleRepository = getRepository(Role);
  const PermissionRepository = getRepository(Permission);
  var generatedUsers: User[] = [];
  var findAllRole = await RoleRepository.find();
  var findAllPermission = await PermissionRepository.find();

  const admin = new User();
  admin.username = "ADMIN";
  admin.fullname = "Hideo Kojima";
  admin.email = "admin@example.com";
  admin.password = "password";
  admin.hashPassword();
  admin.roles = findAllRole;
  admin.permissions = findAllPermission;
  generatedUsers.push(admin);

  for (let index = 0; index < count; index++) {
    var email = faker.internet.email();
    console.log(`Seeding User : ${email}/password`);
    const user = new User();
    user.username = faker.internet.userName();
    user.fullname = `${faker.name.firstName(gender)} ${faker.name.lastName(
      gender
    )}`;
    user.email = email;
    user.password = "password";
    user.hashPassword();
    generatedUsers.push(user);
  }

  await UserRepository.save(generatedUsers);
}
