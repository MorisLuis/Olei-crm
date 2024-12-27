"use client";

import Image from "next/image";
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Login.module.scss";
import Button from "@/components/Buttons/Button";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth/AuthContext";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { push } = useRouter();
  const { loginUser } = useContext(AuthContext);

  // Estado del formulario
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  // Estado para desactivar el botón mientras se envía el formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await loginUser(formData.email, formData.password);
      push("/dashboard/clients");

    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <h1>CRM</h1>
        <Image
          src="/Logo_vertical.png"
          alt="Olei online"
          width={200}
          height={200}
          priority
          unoptimized
        />

        <div className={styles.form}>
          <div className={styles.iconLogin}>
            <FontAwesomeIcon icon={faArrowRightToBracket} className="icon" />
          </div>

          <div className={styles.header}>
            <h1>Bienvenido!</h1>
            <p className="mb-medium">Por favor, inicia sesión abajo</p>
          </div>

          {/* Formulario */}
          <form className={styles.form__content} onSubmit={handleSubmit}>
            {/* Campo Email */}
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Escribe tu e-mail..."
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {/* Campo Password */}
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Escribe la contraseña..."
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            {/* Botón de Envío */}
            <Button
              text="Iniciar sesión"
              textDisabled="Iniciando..."
              typeSubmit
              disabled={isSubmitting}
            />
          </form>

          <div className={styles.blur}></div>
        </div>
      </div>
    </div>
  );
}
