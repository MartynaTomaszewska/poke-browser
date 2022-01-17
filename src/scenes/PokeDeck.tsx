import React, { ReactElement, FC, useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { usePersistedState } from "../hooks/usePersistedState";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { PokemonBasic } from "../types";

const PokeDeck: FC = (): ReactElement => {
  const [persistedState, setPersistedState] = usePersistedState();
  const [selectionModel, setSelectionModel] = useState<PokemonBasic[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowRemoveButton(!!selectionModel.length);
  }, [selectionModel]);

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

  const removeFromPokeDeck = () => {
    const newPokeDeck = persistedState?.pokeDeck?.filter(
      ({ id }) => !selectionModel.find(({ id: pokemonId }) => id === pokemonId)
    );
    setPersistedState({
      pokeDeck: newPokeDeck,
    });
    setOpenAlert(true);
  };

  const CustomToolbar = () => {
    return (
      <Box display="flex" width="100%" padding={2} height={37}>
        {showRemoveButton ? (
          <Button variant="contained" onClick={removeFromPokeDeck}>
            Remove from Poke deck
          </Button>
        ) : (
          <Typography>
            Select the pokemons that you want to remove from Poke deck
          </Typography>
        )}
      </Box>
    );
  };

  const onAlertClose = () => {
    setOpenAlert(false);
  };

  return (
    <Box height={700} width="100%">
      <DataGrid
        rows={persistedState?.pokeDeck ?? []}
        columns={columns}
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        onRowClick={onRowClick}
        components={{
          Toolbar: CustomToolbar,
        }}
        onSelectionModelChange={(ids) => {
          const selectedIds = new Set(ids);
          const selectedRows =
            persistedState?.pokeDeck?.filter((row) =>
              selectedIds.has(row.id.toString())
            ) ?? [];

          setSelectionModel(selectedRows);
        }}
      />
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={onAlertClose}>
        <Alert severity="success" sx={{ width: "100%" }} onClose={onAlertClose}>
          Pokemons removed from Poke Deck!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PokeDeck;
