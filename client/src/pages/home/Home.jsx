import React from 'react';
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HomeComp from '../../components/homeComp/HomeComp';

const Home = () => {
    return (
        <div className='home'>
            <Navbar />
            <div className="banner">
                <h1>Bienvenido a FitnessApp</h1>
                <p>La Aplicacion perfecta para lograr tus metas fitness</p>
            </div>
            <div className="mainContainer">
                <HomeComp
                    image="https://media.geeksforgeeks.org/wp-content/uploads/20240308220039/planner.png"
                    name="Logros"
                    description="Mantenga un registro de su progreso diario"
                    view="/entries"
                />
                <HomeComp
                    image="https://media.geeksforgeeks.org/wp-content/uploads/20240308220039/routine.png"
                    name="Rutinas"
                    description="Agregar Rutina Personalizada"
                    view="/routines"
                />
                <HomeComp
                    image="https://media.geeksforgeeks.org/wp-content/uploads/20240308220038/meal.png"
                    name="Comidas"
                    description="Agregar Comida Personalizada"
                    view="/meals"
                />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
