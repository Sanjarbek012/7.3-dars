import { BaseEntity } from "src/database/entities/base.entity";
import { Article } from "src/module/article/entities/article.entity";
import { Tag } from "src/module/tag/entities/tag.entity";
import { UserRole } from "src/shared/constants/user.role";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: "auth" })
export class Auth extends BaseEntity {
  @Column({ nullable: false })
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({type: "enum", enum: UserRole, default: UserRole.USER})
  role!: UserRole

  @Column({nullable: true})
  code!: string;

  @Column({ nullable: true, type: "bigint" })
  otpTime?: number;


  // relations

  @OneToMany(() => Article, (article) => article.author)
  articles?: Article[];

  @OneToMany(() => Tag, (tag) => tag.author)
  tags?: Tag[];
}