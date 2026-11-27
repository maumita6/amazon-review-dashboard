import { Link, useNavigate, Outlet } from 'react-router-dom';

function MainLayout() {
    return (
        <div className="flex">
            <main className="flex-1 p-24">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;