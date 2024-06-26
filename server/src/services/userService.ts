import { IUser } from "../models/user"
import userRepository from "../repositories/userRepository"
import { sendContentCreatorRequest, sendWelcomeEmail } from "../utils/emailfunctions";
import bcrypt from "bcrypt";
import { Request } from "express";
import { IUserCredentials } from "../types/interfaces/auth";
import "express-session"


class UserService {
  async createUser(userData: IUser): Promise<IUser> {
    try {
      console.log('Creating user:', userData);

      const userExists = await userRepository.findByEmail(userData);
      if (userExists) {
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      const user = await userRepository.create(userData);
      console.log('User created:', user); // Log user creation

      /* await sendWelcomeEmail(user.email, user.name); */

      return user;
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      throw new Error('Error creating user');
    }
  }

  async login(userCredentials: IUserCredentials, request: Request): Promise<IUser | boolean> {

    try {
      const user = await userRepository.findByEmail(userCredentials);
      if (user) {
        const { password } = user;
        const unshashedPass = userCredentials.password
        const passwordMatches = await bcrypt.compare(unshashedPass, password)
        if (passwordMatches) {
          request.session.user = user;
          return user
        } else {
          return false;
        }
      } else {
        return false
      }
    } catch (error) {
      throw new Error('Problem logging in')
    }
  }

  async switchRole(email: string, role: string) {
    const updatedUser = await userRepository.switchRole(email, role);
    return updatedUser;
  }


  async requestCreator(email: string, name: string) {
    try {
      console.log('requesting user to be content creator:', email);
      const success = await sendContentCreatorRequest(email, name)
      if (success) {
        return { success: true, message: 'Request to become a content creator sent successfully.' };
      } else if (!success) {
        return { success: false, message: 'Failed to send the request. Please try again later.' };
      }
    } catch (error) {
      console.log('error requesting user to be content creator:', email, error);
    }
  }
}


export default new UserService()