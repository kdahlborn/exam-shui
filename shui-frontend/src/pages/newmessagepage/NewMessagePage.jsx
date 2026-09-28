import './index.css';
import BackIcon from '../../components/backicon/BackIcon';
import MessageForm from '../../components/messageform/MessageForm';
import { useAuthStore } from '../../stores/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

const NewMessagePage = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    return (
        <section className="page new-message-page">
            <div className="wrapper new-message-page__wrapper">
                <BackIcon />
                <section className="page__form-container">
                    <h1 className="page__title">Skapa nytt meddelande</h1>

                    {user ? (
                        <MessageForm />
                    ) : (
                        <div className="login-prompt">
                            <p>
                                Du måste vara inloggad för att skapa ett
                                meddelande
                            </p>
                            <Button
                                text="Logga in"
                                type="default"
                                onClick={() => navigate('/login')}
                            />
                        </div>
                    )}
                </section>
            </div>
        </section>
    );
};

export default NewMessagePage;
