'use server';

/**
 * @fileOverview Password generation flow.
 *
 * - generateSecurePassword - A function that generates a secure password based on user-specified criteria.
 * - GenerateSecurePasswordInput - The input type for the generateSecurePassword function.
 * - GenerateSecurePasswordOutput - The return type for the generateSecurePassword function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSecurePasswordInputSchema = z.object({
  length: z
    .number()
    .min(8)
    .max(64)
    .default(16)
    .describe('The desired length of the password (between 8 and 64 characters).'),
  includeNumbers: z
    .boolean()
    .default(true)
    .describe('Whether to include numbers in the password.'),
  includeSymbols: z
    .boolean()
    .default(true)
    .describe('Whether to include symbols in the password.'),
  includeUppercase: z
    .boolean()
    .default(true)
    .describe('Whether to include uppercase letters in the password.'),
});
export type GenerateSecurePasswordInput = z.infer<
  typeof GenerateSecurePasswordInputSchema
>;

const GenerateSecurePasswordOutputSchema = z.object({
  password: z
    .string()
    .describe('The generated secure password.')
    .optional(),
});
export type GenerateSecurePasswordOutput = z.infer<
  typeof GenerateSecurePasswordOutputSchema
>;

export async function generateSecurePassword(
  input: GenerateSecurePasswordInput
): Promise<GenerateSecurePasswordOutput> {
  return generateSecurePasswordFlow(input);
}

const generatePasswordPrompt = ai.definePrompt({
  name: 'generatePasswordPrompt',
  input: {schema: GenerateSecurePasswordInputSchema},
  output: {schema: GenerateSecurePasswordOutputSchema},
  prompt: `You are a password generator. Generate a strong and random password based on the following criteria:

Length: {{length}} characters
Include numbers: {{#if includeNumbers}}Yes{{else}}No{{/if}}
Include symbols: {{#if includeSymbols}}Yes{{else}}No{{/if}}
Include uppercase letters: {{#if includeUppercase}}Yes{{else}}No{{/if}}

The password should be unpredictable and suitable for securing online accounts. It should contain mix of letters, numbers and symbols. Ensure password is random.
`,
});

const generateSecurePasswordFlow = ai.defineFlow(
  {
    name: 'generateSecurePasswordFlow',
    inputSchema: GenerateSecurePasswordInputSchema,
    outputSchema: GenerateSecurePasswordOutputSchema,
  },
  async input => {
    const {output} = await generatePasswordPrompt(input);
    return output!;
  }
);
