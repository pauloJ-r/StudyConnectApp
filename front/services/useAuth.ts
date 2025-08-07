import { useCallback } from "react";
import { API_URL } from "../env";

type Picture = {
  uri: string;
  name: string;
  type: string;
} | null;

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  picture?: Picture;
};

type LoginData = {
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  picturePath?: string;
};

export default function useAuth() {
  const register = useCallback(async (data: RegisterData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmpassword", data.confirmpassword);

    if (data.picture) {
      formData.append("picture", {
        uri: data.picture.uri,
        name: data.picture.name || "profile.jpg",
        type: data.picture.type || "image/jpeg",
      } as any);
    }

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro no cadastro");
    }

    return response.json();
  }, []);

  const login = useCallback(
    async (data: LoginData): Promise<{ token: string; user: User }> => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erro na autenticação");
      }

      return response.json();
    },
    []
  );

  return {
    register,
    login,
  };
}
