import { Entity, Column } from "typeorm";

import { Length } from "class-validator";

import { General } from "./BaseEntity";

@Entity()
export class Pages extends General {
  @Column({ type: "varchar" })
  @Length(1, 128)
  name: string;
}
