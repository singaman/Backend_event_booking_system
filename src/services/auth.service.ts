import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.config.js';
import type { RegisterUserRequest, LoginRequest } from '../types/request.types.js';
import type { AuthResponse } from '../types/response.types.js';

export class AuthService {
    static async register(data: RegisterUserRequest) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await User.create({
            email: data.email,
            password: hashedPassword,
            role: data.role,
        });
        return user;
    }
    
    static async login(data: LoginRequest): Promise<AuthResponse> {
        const user = await User.findOne({ where: { email: data.email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            env.jwt.secret as string,
            { expiresIn: env.jwt.expiresIn as any }
        );

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    }
}
