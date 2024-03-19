import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { myDataSource } from "../core/typeOrmConfig";

const strategyCreator = () => {
  const option: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "",
    algorithms: ["HS256"],
    ignoreExpiration: false,
  };

  return new JwtStrategy(option, async (jwt_payload, done) => {
    try {
      const userRepository: Repository<User> = myDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { email: jwt_payload.email },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Incorrect username or password",
        });
      }
    } catch (error) {
      return done(error, false);
    }
  });
};

export const userJwtStrategy = (passport: any) => {
  passport.use("jwt", strategyCreator());
};
