import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { ReactElement, FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants";
import { Pokemon } from "../types";

type PokemonDetailsProps = {
  id: string;
};

const PokemonDetails: FC = (): ReactElement => {
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon>();
  const { id } = useParams<PokemonDetailsProps>();

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    const response: Response = await fetch(`${API_URL}/pokemon/${id}/`);
    const pokemonsData: Pokemon = await response.json();
    setPokemonDetails(pokemonsData);
  };

  return (
    <Box width={1} display="flex" justifyContent="center">
      <Card sx={{ minWidth: 400 }}>
        <CardMedia
          component="img"
          alt={pokemonDetails?.name}
          height="140"
          image={pokemonDetails?.sprites.front_default ?? ""}
          style={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pokemonDetails?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Base experience: {pokemonDetails?.baseExperience ?? "n/a"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Height: {pokemonDetails?.height}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Weight: {pokemonDetails?.weight}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PokemonDetails;
