import * as Yup from "yup";
import User from "../models/User";

class SessionController {
  async store(resquest, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(resquest.body);

    const emailOrPassowrdIncorrect = () =>
      response.status(401).json({ error: "Password or email incorrect." });

    if (!isValid) {
      return emailOrPassowrdIncorrect();
    }

    const { email, password } = resquest.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
        return emailOrPassowrdIncorrect();
    }

    const isSamePassword = await user.comparePassword(password);

    if (!isSamePassword) {
        return emailOrPassowrdIncorrect();
    }

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
    });
  }
}

export default new SessionController();
