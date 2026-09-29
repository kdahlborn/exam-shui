import './index.css';
import { NotePencilIcon, TrashIcon } from '@phosphor-icons/react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils';
import { useAuthStore } from '../../stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { deleteMessage } from '../../api/messages';

const Message = ({ message }) => {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);

    const queryClient = useQueryClient();

    const { mutate, isError, error } = useMutation({
        mutationFn: () => deleteMessage(message.messageId, token),
        onSuccess: () => {
            // Ogiltigförklarar det cachade meddelandet så att den uppdaterade versionen hämtas från API:t
            queryClient.invalidateQueries({
                queryKey: ['messages'],
            });
        },
    });

    const handleDelete = () => {
        const confirmed = window.confirm(
            'Är du säker på att du vill ta meddelandet?',
        );

        if (!confirmed) {
            return;
        }

        mutate();
    };

    return (
        <article className="message">
            <h3 className="message__initials">
                {message.username.substring(0, 1)}
                {/* { message.user.lastname.substring(0, 1) } */}
            </h3>
            <div className="message__content">
                <div className="message__content-top">
                    <Link
                        to={`/users/${message.userId}`}
                        className="message__user-link"
                    >
                        <h4 className="message__user">{message.username}</h4>
                    </Link>
                    <p className="message__date">
                        {formatDate(message.createdAt)}
                    </p>
                </div>
                <p className="message__text">{message.text}</p>
            </div>
            {user?.userId === message.userId && (
                <div className="message__icon-group">
                    <NotePencilIcon
                        className="icon icon--pencil"
                        size={20}
                        weight="bold"
                        onClick={() =>
                            navigate(`/message/edit/${message.messageId}`)
                        }
                    />
                    <TrashIcon
                        className="icon icon--trash"
                        size={20}
                        weight="bold"
                        color="red"
                        onClick={handleDelete}
                    />
                </div>
            )}

            {isError && <p className="message__error">{error.message}</p>}
        </article>
    );
};

export default Message;
