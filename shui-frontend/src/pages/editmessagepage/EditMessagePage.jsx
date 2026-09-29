import './index.css';
import BackIcon from '../../components/backicon/BackIcon';
import MessageForm from '../../components/messageform/MessageForm';
import { useParams } from 'react-router-dom';
import { getMessageById } from '../../api/messages';
import { useQuery } from '@tanstack/react-query';

const EditMessagePage = () => {
    const { messageId } = useParams();

    const {
        data: message,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['message', messageId],
        queryFn: () => getMessageById(messageId),
    });

    if (isLoading) {
        return <p>Laddar...</p>;
    }

    if (isError) {
        console.log(error.message);
    }

    return (
        <section className="page new-message-page">
            <div className="wrapper new-message-page__wrapper">
                <BackIcon />
                <section className="page__form-container">
                    <h1 className="page__title">Redigera meddelande</h1>
                    <MessageForm message={message} />
                </section>
            </div>
        </section>
    );
};

export default EditMessagePage;
