import type { UserAbility } from '@/plugins/casl/AppAbility';

// 👉 Help center
export type Data = {
  // responsive_id: string,
  id: number, 
  avatar: string,
  full_name: string,
  post: string,
  email: string,
  city: string,
  start_date: date,
  salary: number,
  age: string | number,
  experience: string, 
  status: number,
}
