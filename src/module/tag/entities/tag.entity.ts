import { IsDateString } from "class-validator";
import { BaseEntity } from "src/database/entities/base.entity";
import { Article } from "src/module/article/entities/article.entity";
import { Auth } from "src/module/auth/entities/auth.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity({ name: "tag" })
export class Tag  extends BaseEntity {
    [x: string]: any;
    @Column()
    title!: string;

    // relations

    @ManyToOne(() => Auth, (auth) => auth.tags)
    @JoinColumn({name: "authorId"})
    author!: Auth;

    @ManyToMany(() => Article, (article) => article.tags)
    @JoinColumn({name: "articleId"})
    articles?: Article;
}
