import Sequelize, { Model } from "sequelize";

//Conceito de herança, acessando os metódos da classe pai.
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User