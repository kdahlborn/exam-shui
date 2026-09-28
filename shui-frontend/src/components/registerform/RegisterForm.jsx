import './index.css';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

const RegisterForm = () => {
    const methods = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const { formState, handleSubmit, register, getValues } = methods;
    const { errors } = formState;

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <label className="register-form__label">
                    Användarnamn
                    {errors.username && <p>{errors.username.message}</p>}
                    <input
                        type="text"
                        className="register-form__input"
                        placeholder="Välj ett användarnamn"
                        {...register('username', {
                            required: 'Vänligen ange användarnamn',
                        })}
                    />
                </label>
                <label className="register-form__label">
                    E-post
                    {errors.email && <p>{errors.email.message}</p>}
                    <input
                        type="text"
                        className="register-form__input"
                        placeholder="namn@exempel.se"
                        {...register('email', {
                            required: 'Vänligen ange e-post',
                        })}
                    />
                </label>
                <label className="register-form__label">
                    Lösenord
                    {errors.password && <p>{errors.password.message}</p>}
                    <input
                        type="password"
                        className="register-form__input"
                        placeholder="Minst 8 tecken"
                        {...register('password', {
                            required: 'Vänligen ange lösenord',
                        })}
                    />
                </label>
                <label className="register-form__label">
                    Bekräfta lösenord
                    {errors.confirmPassword && (
                        <p>{errors.confirmPassword.message}</p>
                    )}
                    <input
                        type="password"
                        className="register-form__input"
                        placeholder="Upprepa ditt lösenord"
                        {...register('confirmPassword', {
                            required: 'Vänligen bekräfta lösenord',
                            validate: (value) =>
                                value === getValues('password') ||
                                'Lösenordet matchar inte',
                        })}
                    />
                </label>
                <Button
                    text="Registrera"
                    type="submit"
                    onClick={() => console.log('Registrera')}
                />
                <p className="register-form__message">
                    Har du redan ett konto?{' '}
                    <Link to="/login" className="register-form__message-link">
                        Logga in här!
                    </Link>
                </p>
            </form>
        </FormProvider>
    );
};

export default RegisterForm;
