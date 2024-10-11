/* eslint-disable @typescript-eslint/no-explicit-any */
export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  profileImg?: string;
  coverImg?: string;
  verified?: boolean;
  createdAt: any;
  updatedAt: any;
};

export type TPosts = {
  _id: string;
  userId: TUser;
  name: string;
  title: string;
  description: string;
  images: string[];
  category: string;
};
