import {AutoIncrement, Column, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({
  tableName: 'user'
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: Number;

  @Column
  public name: string;

  @Column
  public email: string;
}
