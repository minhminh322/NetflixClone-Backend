import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { UserRole } from "../enum/user.enum";

@Entity("user")
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
