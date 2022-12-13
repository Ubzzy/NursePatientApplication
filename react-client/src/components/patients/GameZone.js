import React from "react";
import Header from "../Header";

function Gamezone() {
    function openLink(link) {
        window.open(link, "_blank")
    }

    return (
        <>
            <Header/>
            <div className="container mt-5">
                <h2>Have fun with some Health Games</h2>
                <div className="card-list">
                    <div className="card" onClick={() => openLink("https://www.calculators.org/games/fight-virus/")}>
                        <div className="card-header">
                            <img src="https://www.calculators.org/games/titles/fight-virus-game.png" height="250px" width="250px"/>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">Fight Virus</h3>
                            <p>Simulation game where a hospital <br/> operator tries to keep patients <br/>healthy while preventing <br/> COVID-19 from overwhelming <br/> the hospital.
                            </p>
                        </div>
                    </div>
                    <div className="card" onClick={() => openLink("https://www.calculators.org/games/can-i-eat-it/")}>
                        <div className="card-header">
                            <img src="https://www.calculators.org/games/titles/can-i-eat-it.png" height="250px" width="250px"/>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">Can I Eat It?</h3>
                            <p> Click yes or no if an <br/> item is edible or inedible.</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Gamezone;
