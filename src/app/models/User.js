import Sequelize from "sequelize";
import { Model } from "sequelize";
import bcrypt from 'bcrypt';

//Conceito de herança, acessando os metódos da classe pai.
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'users',
      },
    );

    this.addHook('beforeSave', async (user) => {
      if(user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    });

    return this;
  }
}

export default User;
