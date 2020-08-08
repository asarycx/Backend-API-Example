import { getRepository } from "typeorm";
import * as _ from "underscore";
import * as faker from "faker";

import { Permission } from "@database/entity/Permission";
import { Pages as PG } from "@database/entity/Pages";

export default async function generatePerm() {
  const PermissionRepository = getRepository(Permission);
  const PagesRepository = getRepository(PG);

  // Generic Permission List
  const Pages = ["user", "role", "banner", "configuration"];

  var generatedPermissions = [];
  var pages = [];
  _.map(Pages, (item) => {
    console.log(`Seeding Permission : ${item} CRUD`);
    pages.push({ name: item });
    generatedPermissions.push({
      name: `create_${item}`,
      page: item,
      description: faker.random.words(5),
    });
    generatedPermissions.push({
      name: `read_${item}`,
      page: item,
      description: faker.random.words(5),
    });
    generatedPermissions.push({
      name: `update_${item}`,
      page: item,
      description: faker.random.words(5),
    });
    generatedPermissions.push({
      name: `delete_${item}`,
      page: item,
      description: faker.random.words(5),
    });
  });

  await PermissionRepository.save(generatedPermissions);
  await PagesRepository.save(pages);
}
