"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react";
import {toast} from "sonner";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [senhaError, setSenhaError] = useState(false);
  const [erro, setErro] = useState("");
  const router = useRouter();
  const emailRef = useRef(null);
  const senhaRef = useRef(null);

  useEffect(() => {
    const emailValue = emailRef.current?.value;
    const senhaValue = senhaRef.current?.value;

    if (emailValue) setEmail(emailValue);
    if (senhaValue) setSenha(senhaValue);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) setEmailError(false);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
    if (e.target.value) setSenhaError(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError(true);
      valid = false;
    }

    if (!senha) {
      setSenhaError(true);
      valid = false;
    }

    if (!valid) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password: senha,
        rememberMe: isChecked
      });

      if (!result) {
        toast.error("Erro inesperado. Verifique a configuração.");
        return;
      }

      if (result.ok) {
        toast.success("Login realizado com sucesso!");
        router.push("/home");
      } else {
        toast.error("Email ou senha inválidos");
      }
    } catch (err) {
      console.error("Erro ao logar:", err);
      toast.error("Erro ao tentar login.");
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
                        ref={emailRef}
                        type="email"
                        defaultValue={email}
                        error={emailError}
                        onChange={handleEmailChange}
                        placeholder="Digite seu e-mail"
                        hint={emailError ? "O e-mail é obrigatório" : ""}
                    />
                  </div>
                  <div>
                    <Label>
                      Senha <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div>
                      <div className="relative">
                          <Input
                              ref={senhaRef}
                              type={showPassword ? "text" : "password"}
                              defaultValue={senha}
                              error={senhaError}
                              onChange={handleSenhaChange}
                              placeholder="Digite sua senha"
                              className="pr-10"
                          />
                          <span
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                          >
                          {showPassword ? (
                              <Eye className="w-5 h-5 text-brand-500" />
                          ) : (
                              <EyeOff className="w-5 h-5 text-brand-500" />
                          )}
                        </span>
                      </div>
                      {senhaError && (
                          <p className="mt-1.5 text-xs text-error-500">A senha é obrigatória</p>
                      )}
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
