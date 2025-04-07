"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@admin.com" && senha === "123456") {
      const user = {
        id: "1",
        name: "Admin",
        email: "admin@admin.com",
      };

      Cookies.set("token", "fake-token", { expires: 7 });
      sessionStorage.setItem("user", JSON.stringify(user));

      router.push("/home");
    } else {
      setErro("Email ou senha inválidos");
    }
  };

  return (
      <div className="flex flex-col flex-1 lg:w-1/2 w-full">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Login
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Digite seu e-mail e senha para realizar o seu login!
              </p>
            </div>
            <div>
              <form onSubmit={handleLogin}>
                <div className="space-y-6">
                  <div>
                    <Label>
                      Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input
                        placeholder="exemplo@exemplo.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>
                      Senha <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite sua senha"
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                      />
                      <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                      {showPassword ? (
                          <Eye className="w-5 h-5 text-brand-500" />
                      ) : (
                          <EyeOff className="w-5 h-5 text-brand-500" />
                      )}
                    </span>
                    </div>
                  </div>

                  {erro && (
                      <p className="text-sm text-error-500 font-medium">{erro}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={isChecked} onChange={setIsChecked} />
                      <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Manter logado
                    </span>
                    </div>
                    <Link
                        href="/reset-password"
                        className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  <div>
                    <Button className="w-full" size="sm" type="submit">
                      Logar
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
