import { z } from 'zod';

export const registerSchema = z
	.object({
		email: z.string().email(),
		firstName: z.string().min(3).max(20),
		lastName: z.string().min(3).max(20),
		password: z.string().min(8).max(100),
		confirmPassword: z.string().min(8).max(100)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});
export type RegisterSchema = typeof registerSchema;

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(100)
});

export type LoginSchema = typeof loginSchema;

export const updateEmailSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});
export const requestPasswordResetSchema = z.object({
	email: z.string().email()
});

const isValidPhoneNumber = (phone: string): boolean => {
	const regex = /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/;
	return regex.test(phone);
};
export const addressSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Name must be at least 3 characters long' })
		.max(100, { message: 'Name cannot exceed 100 characters' }),

	address: z
		.string()
		.min(1, { message: 'Address is required' })
		.max(200, { message: 'Address cannot exceed 200 characters' }),

	state: z.string().max(100, { message: 'State name cannot exceed 100 characters' }),

	country: z.string().min(1, { message: 'Country is required' }),

	isDefaultShipping: z.boolean().default(false),
	isDefaultBilling: z.boolean().default(false)
});

export const resetPasswordSchema = z
	.object({
		password: z.string().min(8),
		confirmPassword: z.string().min(8)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});
export const updatePasswordSchema = z
	.object({
		currentPassword: z.string().min(8),
		newPassword: z.string().min(8),
		confirmNewPassword: z.string().min(8)
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: 'Passwords do not match',
		path: ['confirmNewPassword']
	});
export const updateNumberSchema = z.object({
	number: z.string().refine(isValidPhoneNumber, {
		message: 'Please enter a valid phone number'
	})
});
export const updateNameSchema = z.object({
	firstName: z.string().min(3),
	lastName: z.string().min(3)
});

export const guestInformationSchema = z.object({
	email: z.string().email(),
	firstName: z.string().min(1),
	lastName: z.string().min(1)
});
