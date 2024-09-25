import { PropsWithChildren } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LocaleProvider } from '../providers/locale-provider';
import { FormattedMessage } from 'react-intl';
import { Sidebar } from './Sidebar';



export default function Layout({ children }: PropsWithChildren) {

    const showSidebar = () => {
        document.body.classList.add('showSidebar');
    }

    return (
        <LocaleProvider>
            <Sidebar />
            <main className="main">
                <nav className="nav">
                    <div className="nav-content">
                        <button className="sidebar-open toggle-menu" onClick={showSidebar}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div className="logo"><a href="/">TODO</a></div>

                    </div>
                </nav>
                <div className="main-content">
                    <Outlet />
                </div>
            </main>
        </LocaleProvider>
    )
}