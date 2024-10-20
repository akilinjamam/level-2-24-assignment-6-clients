import { jwtDecode, JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  id?: string;
  email?: string;
  name?: string;
  exp?: number;
  role?: string;
  profileImg?: string;
}
export const jwtDecoder = (token: string) => {
  const decode = jwtDecode<CustomJwtPayload>(token);
  return decode;
};
