import {
  Entity,
  Column,
  Unique,
  OneToOne,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from "typeorm";

import { Length, IsEmail } from "class-validator";
import * as bcrypt from "bcryptjs";

import { General } from "./BaseEntity";
import { Role } from "./Role";
import { File } from "./File";
import { Permission } from "./Permission";

@Entity()
@Unique(["username", "email"])
export class User extends General {
  @Column({ type: "varchar" })
  @Length(0, 128)
  username: string;

  @Column({ nullable: true, type: "varchar" })
  @Length(0, 128)
  fullname?: string;

  @Column({ nullable: true, type: "varchar" })
  @Length(0, 128)
  firstname?: string;

  @Column({ nullable: true, type: "varchar" })
  @Length(0, 128)
  lastname?: string;

  @Column({ type: "varchar" })
  @IsEmail()
  email: string;

  @Column({ type: "varchar" })
  @Length(0, 128)
  password?: string;

  @Column({ nullable: true, type: "text" })
  bio?: string;

  @Column({ nullable: true })
  reset_token?: string;

  @OneToOne((type) => File, { eager: true })
  @JoinColumn()
  profile_image?: File;

  @ManyToMany((type) => Role, { eager: false, onDelete: "CASCADE" })
  @JoinTable()
  roles?: Role[];

  @ManyToMany((type) => Permission, { eager: false, onDelete: "CASCADE" })
  @JoinTable()
  permissions?: Permission[];

  // self explanatory
  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  // Hash the password
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  }
}
