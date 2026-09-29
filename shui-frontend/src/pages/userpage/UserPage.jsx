import './index.css';
import Header from '../../components/header/Header';
import MessageFlow from '../../components/messageflow/MessageFlow';
import { useQuery } from '@tanstack/react-query';
import { getMessagesByUsername } from '../../api/messages';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const { username } = useParams();

    const {
        data: messages,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['messages', 'user', username],
        queryFn: () => getMessagesByUsername(username),
    });

    if (isLoading) {
        return <p>Laddar...</p>;
    }

    if (isError) {
        console.log(error.message);
    }
    return (
        <section className="page userpage">
            <Header />
            <div className="wrapper">
                <section className="userpage__top">
                    <h2 className="userpage__title">
                        {username}'s meddelanden
                    </h2>
                </section>

                <MessageFlow messages={messages} />
            </div>
        </section>
    );
};

export default UserPage;
