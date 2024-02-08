import { ValidationError } from "../shared/custom-errors";
import { Encrypt } from "../shared/encrypt";
import { Roles, User } from "./entity";

export class UserService {
    /**
     * Returns users from database
     * @param activeUsersOnly if nothing is passed then returns all users
     * @returns list of users in database without pagination
     */
    async getUsers(activeUsers?: boolean) {
        const userRepository = User.getRepository();

        // TODO: pagination required?
        let users: User[];
        if (!activeUsers) {
            users = await userRepository.find({
                select: {
                    username: true,
                    deposit: true,
                    role: true,
                    deleted: true
                }
            });
        } else {
            users = await userRepository.find(
                {
                    select: {
                        username: true,
                        deposit: true,
                        role: true,
                        deleted: true
                    },
                    where: { deleted: !activeUsers }
                });
        }

        return users;
    }

    /**
     * create new user after validation
     * @param username should not already exist
     * @param password no password policy applied
     * @param deposit multiples of 5
     * @param role buyer|seller
     * @returns the created user
     */
    async createUser(username: string, password: string, deposit: number, role: Roles) {
        const userRepository = User.getRepository();

        const userFound = await userRepository.findOneBy({ username });
        if (userFound) {
            throw new ValidationError(`user: "${username}" already exists`);
        }

        if (deposit % 5 != 0) {
            throw new ValidationError('deposit should be multiple of 5');
        }

        if (!Object.values(Roles).includes(role as Roles)) {
            throw new ValidationError(`role should be from: ${Object.values(Roles)}`);  //TODO: remove 'admin' value since admin user gets added to db direcrtly
        }

        const encryptedPassword = await Encrypt.encryptpass(password);
        const dbUser = await userRepository.save({ username, password: encryptedPassword, deposit, role });
        return dbUser;
    }

    /**
     * Update user fields
     * @param username should exist
     * @param deposit multiples of 5
     * @param role buyer|seller
     * @param deleteUser soft delete the user
     * @returns the updated user
     */
    async updateUser(username: string, deposit?: number, role?: string, deleteUser?: boolean) {
        const userRepository = User.getRepository();

        const userFound = await userRepository.findOneBy({ username });
        if (!userFound) {
            throw new ValidationError(`user: "${username}" does not exist`);
        }

        if (deposit && deposit % 5 != 0) {
            throw new ValidationError('deposit should be multiple of 5');
        }

        let newRole;
        if (role && !Object.values(Roles).includes(role as Roles)) {
            throw new ValidationError(`role should be from: ${Object.values(Roles)}`);  //TODO: remove 'admin' value since admin user gets added to db direcrtly
        } else {
            newRole = role as Roles;
        }

        const updatedUser = await userRepository.save({ ...userFound, deposit, role: newRole, deleted: deleteUser });
        return updatedUser;
    }

    /**
     * Registration of user
     * @param username should not exist in database
     * @param password no password policy applied 
     * @returns the registered user
     */
    async registerUser(username: string, password: string) {
        const userRepository = User.getRepository();

        const userExists = await userRepository.findOneBy({ username }) ? true : false;
        if (userExists) {
            throw new ValidationError('username already exists');
        }

        const encryptedPassword = await Encrypt.encryptpass(password);
        const dbUser = await userRepository.save({ username, password: encryptedPassword, deposit: 0, role: Roles.Buyer });
        return dbUser;
    }

    /**
     * Soft delete the user 
     * @param username should exists in database
     * @returns the deleted user
     */
    async deleteUser(username: string) {
        const userRepository = User.getRepository();

        const userFound = await userRepository.findOneBy({ username });
        if (!userFound) {
            throw new ValidationError(`user: "${username}" does not exist`);
        }

        const dbUser = await userRepository.save({ ...userFound, deleted: true });
        return dbUser;
    }
}
