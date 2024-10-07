"use server";
import { cookies } from "next/headers";

export const getTokenFromCookies = async () => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};
