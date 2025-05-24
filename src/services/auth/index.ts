import axios from "axios";

export function signIn(data: { email: string; password: string }) {
  return axios<{ access_token: string }>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
    {
      method: "POST",
      data,
    }
  );
}
