import './index.css';
import Header from '../../components/header/Header';
import MessageFlow from '../../components/messageflow/MessageFlow';
import { useQuery } from '@tanstack/react-query';
import { getMyMessages } from '../../api/messages';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

const MyPage = () => {
    const token = useAuthStore((state) => state.token);

    const {
        data: messages,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['messages', 'me'],
        queryFn: () => getMyMessages(token),
    });

    if (isLoading) {
        return <p>Laddar...</p>;
    }

    if (isError) {
        console.log(error.message);
    }
    return (
        <section className="page mypage">
            <Header />
            <div className="wrapper">
                <section className="mypage__top">
                    <h2 className="mypage__title">Min sida</h2>
                </section>

                <MessageFlow messages={messages} />
            </div>
        </section>
    );
};

export default MyPage;
