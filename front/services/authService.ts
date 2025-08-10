import { useCallback } from "react";
import api from "./api";

type Picture = {
  uri: string;
  name: string;
  type: string;
} | null;

type RegisterData = {
  name: string;
  email: string;
  course: string;
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
    formData.append("course", data.course);
    formData.append("password", data.password);
    formData.append("confirmpassword", data.confirmpassword);

    if (data.picture) {
      formData.append("picture", {
        uri: data.picture.uri,
        name: data.picture.name || "profile.jpg",
        type: data.picture.type || "image/jpeg",
      } as any);
    }

    try {
      const response = await api.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.msg || "Erro no cadastro";
      throw new Error(msg);
    }
  }, []);

  const login = useCallback(
    async (
      data: LoginData
    ): Promise<{ msg: string; token: string; user: User }> => {
      try {
        const response = await api.post("/auth/login", data);
        return response.data; // msg, token, user
      } catch (error: any) {
        const msg = error.response?.data?.msg || "Erro na autenticação";
        throw new Error(msg);
      }
    },
    []
  );

  return {
    register,
    login,
  };
}
