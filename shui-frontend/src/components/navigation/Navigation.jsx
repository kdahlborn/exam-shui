import './index.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { useAuthStore } from '../../stores/useAuthStore';

const Navigation = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();
    return (
        <nav className="nav">
            <NavLink to="/" className="nav__link">
                Hem
            </NavLink>

            {user && (
                <NavLink to="/mypage" className="nav__link">
                    Min sida
                </NavLink>
            )}

            <Button
                text={user ? 'Logga ut' : 'Logga in'}
                type="default"
                onClick={() => {
                    user && logout();
                    navigate('/login');
                }}
            />
        </nav>
    );
};

export default Navigation;
