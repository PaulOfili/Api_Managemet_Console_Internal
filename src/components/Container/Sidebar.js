import React from 'react';
import { NavLink } from "react-router-dom";

const paths = [
                {
                    title: 'Dashboard',
                    icon: 'fa fa-home',
                    path: '/dashboard/main'
                },
                {
                    title: 'Users',
                    icon: 'fa fa-users',
                    path: '/dashboard/users'
                },
                // {
                //     title: 'Approvals',
                //     icon: 'fas fa-universal-access',
                //     path: '/dashboard/clients'
                // },
                {
                    title: 'Approvals',
                    icon: 'fa fa-thumbs-o-up',
                    path: '/dashboard/clients'
                },
                {
                    title: 'APIs',
                    icon: 'fab fa-product-hunt',
                    path: '/dashboard/apis'
                },
                // {
                //     title: 'Audits',
                //     icon: 'fas fa-route',
                //     path: '/dashboard/audits'
                // }
                {
                    title: 'Audits',
                    icon: 'fa fa-file-text',
                    path: '/dashboard/audits'
                }
             ]

const Sidebar = ({props}) => {
    return (
        <aside className="sidebar sidebar-icons-right sidebar-icons-boxed sidebar-expand-lg" style={{"zIndex": "1001"}}>
            <header className="sidebar-header bg-white">
                {/* <a className="logo-icon" href="/"><img src="https://work.interswitchgroup.com/Content/img/interswitchngnew_icon.png" alt="logo icon"/></a> */}
                <span className="logo">
                    <img src="https://work.interswitchgroup.com/Content/img/interswitchngnew.png" alt="logo"/>
                </span>
            </header>

            <nav className="sidebar-navigation ps-container ps-theme-default" data-ps-id="deed17fd-d827-005b-4084-742c37337dc7">
                <ul className="menu">
                    {
                        paths.map((item, index) => (
                            <li key={index} className={`menu-item ${props.location.pathname === item.path ? 'active' : ''}`}>
                                <NavLink className="menu-link" to={item.path}>
                                    {
                                        item.title === 'Audits' || item.title === 'Approvals'
                                        ?
                                        <span className='icon'>
                                            <i className={item.icon}></i>
                                        </span>
                                        :
                                        <span className={`icon ${item.icon}`}></span>

                                    }
                                    <span className="title">{item.title}</span>
                                </NavLink>
                            </li>   
                        ))
                    } 
                </ul>
                <div className="ps-scrollbar-x-rail" style={{"left": "0px", "bottom": "0px"}}><div className="ps-scrollbar-x" tabIndex="0" style={{"left": "0px", "width": "0px"}}></div></div><div className="ps-scrollbar-y-rail"style={{"top": "0px", "right": "2px"}}><div className="ps-scrollbar-y" tabIndex="0" style={{"left": "0px", "height": "0px"}}></div></div>
            </nav>
        </aside>
    );
}

export default Sidebar;