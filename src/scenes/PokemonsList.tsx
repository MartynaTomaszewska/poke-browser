import React, { ReactElement, FC, useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { API_URL } from "../constants";
import { PokemonBasic, PokemonsData } from "../types";
import { usePersistedState } from "../hooks/usePersistedState";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PokemonsList: FC = (): ReactElement => {
  useEffect(() => {
    fetchPokemonsList();
  }, []);

  const [pokemons, setPokemons] = useState<PokemonBasic[]>([]);
  const [persistedState, setPersistedState] = usePersistedState();
  const [selectionModel, setSelectionModel] = useState<PokemonBasic[]>([]);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowSaveButton(!!selectionModel.length);
  }, [selectionModel]);

  const saveToPokeDeck = () => {
    const removedDuplicates = selectionModel.filter(
      ({ id }) =>
        !persistedState?.pokeDeck?.find(({ id: pokemonId }) => pokemonId === id)
    );
    setPersistedState((currentPersistedState) => ({
      pokeDeck: [
        ...removedDuplicates,
        ...(currentPersistedState?.pokeDeck || []),
      ],
    }));
    setOpenAlert(true);
  };

  const CustomToolbar = () => {
    return (
      <Box display="flex" width="100%" padding={2} height={37}>
        {showSaveButton ? (
          <Button variant="contained" onClick={saveToPokeDeck}>
            Save to Poke deck
          </Button>
        ) : (
          <Typography>
            Select the pokemons that you want to save to Poke deck
          </Typography>
        )}
      </Box>
    );
  };

  const fetchPokemonsList = async (offset = 0) => {
    const response: Response = await fetch(
      `${API_URL}/pokemon?limit=2000&offset=${offset}`
    );
    const pokemonsData: PokemonsData = await response.json();
    setPokemons(
      pokemonsData.results.map((value, index) => ({
        id: `${offset + index + 1}`,
        name: value.name,
        url: value.url,
      }))
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 100 },
    { field: "name", headerName: "name", width: 300 },
    {
      field: "url",
      headerName: "url",
      width: 650,
    },
  ];

  const onRowClick = (params: GridRowParams) => {
    navigate(`/pokemon/${params.id}`);
  };

  const onAlertClose = () => {
    setOpenAlert(false);
  };

  return (
    <Box height={700} width="100%">
      <DataGrid
        rows={pokemons}
        columns={columns}
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
        onRowClick={onRowClick}
        onSelectionModelChange={(ids) => {
          const selectedIds = new Set(ids);
          const selectedRows = pokemons.filter((row) =>
            selectedIds.has(row.id.toString())
          );

          setSelectionModel(selectedRows);
        }}
      />
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={onAlertClose}>
        <Alert severity="success" sx={{ width: "100%" }} onClose={onAlertClose}>
          Pokemons added to Poke Deck!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PokemonsList;
