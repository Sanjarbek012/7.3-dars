import { join } from "path";
import { BaseEntity } from "src/database/entities/base.entity";
import { Auth } from "src/module/auth/entities/auth.entity";
import { Tag } from "src/module/tag/entities/tag.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({name: "article"})
export class Article extends BaseEntity {
    @Column({length: 500})
    heading!: string;

    @Column({type: "text", length: 20000})
    text!: string;

    @Column({length: 500})
    backgroundImage!: string; 
  
// relations

@ManyToOne(() => Auth, (auth) => auth.articles)
@JoinColumn({name: "authorId"}) 
author!: Auth;

@OneToMany(() => Tag, (tag) => tag.article)
@JoinColumn({name: "tag_Id"})
tags?: Tag[];   

}
