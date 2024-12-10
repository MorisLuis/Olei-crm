"use client";

import Image from 'next/image';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Login.module.scss';
import Button from '@/components/Buttons/Button';
import { useRouter } from 'next/navigation';

export default function Login() {

  const { push } = useRouter()

  const onLoginUser = () => {
    try {
      push('/dashboard/clients')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.content}>

        <h1>CRM</h1>
        <Image
          src={"/Logo_vertical.png"}
          alt="Olei online"
          width={200}
          height={200}
          priority={true}
          unoptimized
        />

        <div className={styles.form}>

          <div className={styles.iconLogin}>
            <FontAwesomeIcon icon={faArrowRightToBracket} className={`icon`} />
          </div>

          <div className={styles.header}>
            <h1>Bienvenido!</h1>
            <p className='mb-medium'>Por favor, inicia sesión abajo</p>
          </div>
          <div
            className={styles.form__content}
          >
            <input

              type="text"
              className='input'
              placeholder='Escribe tu e-mail...'
            />

            <input

              type="password"
              className='input'
              placeholder='Escribe la contraseña...'
            />

            <Button
              text='Iniciar sesión'
              textDisabled='Iniciando...'
              typeSubmit
              disabled={false}
              onClick={onLoginUser}
            />
          </div>

          <div className={styles.blur}></div>
        </div>
      </div>

    </div>
  )
}
