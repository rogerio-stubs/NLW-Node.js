import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("surveys") // nome da tabela
class Survey {

    @PrimaryColumn()
    readonly id : string;

    @Column()
    title : string;

    @Column()
    description : string;

    @CreateDateColumn()
    created_ad : Date;

    constructor() {
        if(!this.id)
            this.id = uuid();
    }
}

export { Survey }