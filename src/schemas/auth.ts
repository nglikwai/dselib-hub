import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, '請輸入電郵地址').email('電郵地址格式錯誤'),
  password: z.string().min(1, '請輸入密碼').min(8, '請輸入至少8個字元密碼'),
});

export type SigninFormData = z.infer<typeof loginSchema>;
