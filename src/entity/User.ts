import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

//setup users table model
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** email is unique per user means can't be redundant
   * between users
   */
  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  /** select is set to false as we don't want to get user's
   * password each time we look for the user
   */
  @Column({ length: 128, select: false })
  password: string;

  /**
   * auto-generated column containing the date
   * the user was created
   */
  @Column({
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    type: "datetime",
  })
  createdAt: Date;
}
