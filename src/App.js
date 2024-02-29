
// App.js 

import Detail from "./components/Detail";
import { Routes, Route } from 'react-router-dom';
import PreviewDaily from "./components/PreviewDaily";
import PreviewMonthly from "./components/PreviewMonthly";
import PreviewWeekly from "./components/PreviewWeekly";
import Contact from "./components/Contact";
import ErrorPage from "./components/ErrorPage";


import {
    NavLink
} from "react-router-dom";

import React from "react";


export default function App() {

        return (
            <div>

                <nav>
                    <div className="nav-bar">
                        <i className='bx bx-menu sidebarOpen' ></i>
                        <span className="spanLogo" >AstroLab</span>

                        <div className="menu">
                            <div className="logo-toggle">
                                <span className="spanLogo" >AstroLab</span>
                                <i className='bx bx-x siderbarClose'></i>
                            </div>

                            <ul className="nav-links">

                                <li><NavLink to="/daily">Daily Horoscope</NavLink></li>
                                <li><NavLink to="/weekly">Weekly Horoscope</NavLink></li>
                                <li><NavLink to="/monthly">Monthly Horoscope</NavLink></li>
                                <li><NavLink to="/contact">Contact</NavLink></li>
                            </ul>
                        </div>

                    </div>

                </nav>
                <br/>
                <br/>
                <br/>

                <Routes>
                    <Route exact path="/" element={<PreviewDaily />} />
                    <Route exact path="/daily" element={<PreviewDaily />} />
                    <Route exact path="/weekly" element={<PreviewWeekly />} />
                    <Route exact path="/monthly" element={<PreviewMonthly />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/detail" element={<Detail />} />
                    <Route exact path="/error" element={<ErrorPage />} />
                    <Route exact path="*" element={<PreviewDaily />} />
                </Routes>

            </div>

        );


}
