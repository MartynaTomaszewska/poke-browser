import React from "react";
import logo from "./pokemon-logo.png";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PokemonsList from "./scenes/PokemonsList";
import PokeDeck from "./scenes/PokeDeck";
import PokemonDetails from "./scenes/PokemonDetails";
import { Box, Link } from "@mui/material";

function App() {
  const { pathname } = window.location;

  return (
    <div className="App">
      <Router>
        <Box>
          <Box
            display="flex"
            padding={1}
            justifyContent="space-between"
            alignItems="center"
            width={400}
          >
            <img src={logo} alt="pokemon browser" height={60} />
            <Link
              className={pathname === "/" ? "linkActive" : undefined}
              href="/"
            >
              Pokemons list
            </Link>
            <Link
              className={pathname === "/pokedeck" ? "linkActive" : undefined}
              href="/pokedeck"
            >
              Poke deck
            </Link>
          </Box>

          <hr className="navbarSeparator" />

          <Routes>
            <Route path="/" element={<PokemonsList />} />
            <Route path="/pokedeck" element={<PokeDeck />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
