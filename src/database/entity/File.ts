const dotenv = require("dotenv");
dotenv.config();

import { Entity, Column } from "typeorm";

import { General } from "@database/entity/BaseEntity";

@Entity()
export class File extends General {
  @Column()
  file_name: string;

  @Column()
  file_object: string;

  @Column()
  file_type: string;

  @Column()
  file_url: string;

  @Column()
  file_extension: string;

  @Column({ nullable: true })
  file_attribute: string;

  @Column({ nullable: true })
  file_alt_text: string;

  generateUrl(uuid) {
    // need improvement
    this.file_url = `${process.env.BASE_URL}/user_files/${uuid}/${this.file_object}`;
  }
}
