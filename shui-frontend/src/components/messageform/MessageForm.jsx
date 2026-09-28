import { useState } from 'react';
import './index.css';
import Button from '../button/Button';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../stores/useAuthStore.js';
import { useMutation } from '@tanstack/react-query';
import { createMessage } from '../../api/messages';
import { useNavigate } from 'react-router-dom';

const MessageForm = ({ message = null }) => {
    // const [text, setText] = useState(message?.text ?? '');
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            text: message?.text ?? '',
        },
    });

    const text = watch('text');

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (text) => createMessage(text, token),
        onSuccess: () => {
            reset();
            navigate('/');
        },
    });

    const onSubmit = (data) => {
        mutate(data.text);
    };

    return (
        <form className="message-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="message-form__label">
                Meddelande
                <div className="message-form__textarea-wrapper">
                    <textarea
                        className="message-form__textarea"
                        placeholder="Vad vill du säga?"
                        maxLength={200}
                        {...register('text', {
                            required: 'Vänligen skriv ett meddelande',
                        })}
                    />

                    <span className="message-form__counter">
                        {text.length}/200
                    </span>
                </div>
            </label>

            <Button
                text={!message ? 'Publicera' : 'Spara ändringar'}
                type="submit"
                disabled={isPending}
            />
            <Button text="Rensa" type="outline" onClick={() => reset()} />

            {isError && <p className="message-form__error">{error.message}</p>}
        </form>
    );
};

export default MessageForm;
