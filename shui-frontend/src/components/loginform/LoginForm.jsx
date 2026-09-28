import './index.css';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/auth';

const LoginForm = () => {
    const saveToken = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const methods = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { formState, handleSubmit, register } = methods;
    const { errors } = formState;

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            saveToken(data.token);
            navigate('/');
        },
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <FormProvider {...methods}>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <label className="login-form__label">
                    E-post
                    {errors.email && <p>{errors.email.message}</p>}
                    <input
                        type="text"
                        className="login-form__input"
                        placeholder="namn@exempel.se"
                        {...register('email', {
                            required: 'Vänligen ange e-post',
                        })}
                    />
                </label>
                <label className="login-form__label">
                    Lösenord
                    {errors.password && <p>{errors.password.message}</p>}
                    <input
                        type="password"
                        className="login-form__input"
                        placeholder="********"
                        {...register('password', {
                            required: 'Vänligen ange lösenord',
                        })}
                    />
                </label>
                <Button
                    text={isPending ? 'Loggar in...' : 'Logga in'}
                    type="submit"
                    disabled={isPending}
                />

                {isError && (
                    <p className="login-form__error">
                        {error.message || 'Kunde inte logga, försök igen'}
                    </p>
                )}

                <p className="login-form__message">
                    Har du inget konto?{' '}
                    <Link to="/register" className="login-form__message-link">
                        Registrera dig här!
                    </Link>
                </p>
            </form>
        </FormProvider>
    );
};

export default LoginForm;
