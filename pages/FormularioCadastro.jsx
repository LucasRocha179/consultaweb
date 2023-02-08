import React, { Fragment, useState, useEffect } from "react";
import { TextField, Button, Switch, FormControlLabel, makeStyles } from "@material-ui/core";
import fireDb from '../firebase';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  table: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  tableHead: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  tableCell: {
    padding: theme.spacing(1),
  },
}));

function FormularioCadastro() {
  const classes = useStyles();
  const [idUsuario, setIdUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");

  async function recuperarcdloja() {
    fireDb.child('usuarios')
      .orderByChild("cdloja").equalTo(nome).on('value', dbPhoto => {
        if (dbPhoto.val() != null) {
          const cdloja = JSON.stringify(dbPhoto.val());
          const caracteres = cdloja.length;
          const resultado = cdloja.substring(cdloja.indexOf(":") + 1);
          const resultado2 = resultado.length;
          const final = cdloja.substring(2, caracteres - resultado2 - 2);
          atualizarTabela(final);
        } else {
          console.warn("Não foi possível encontrar sua OS");
        }
      });
  }

  let [contactObjects, setContactObjects] = useState({});

  function atualizarTabela(recuperado) {
    const fire = fireDb.child('OS');
    fire.child(recuperado)
      .child(sobrenome)
      .orderByChild("numOS").equalTo(sobrenome).on('value', dbPhoto => {
        if (dbPhoto.val() != null) {
          setContactObjects({
            ...dbPhoto.val()
          });
        } else {
