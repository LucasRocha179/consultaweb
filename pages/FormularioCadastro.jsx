import React, { Fragment, useState, useEffect } from "react";
import { TextField, Button, Switch, FormControlLabel } from "@material-ui/core";
import fireDb from '../firebase';

function FormularioCadastro() {
    const [idUsuario, setIdUsuario] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");

    async function recuperarcdloja() {
        fireDb.child('usuarios')
            .orderByChild("cdloja").equalTo(nome).on('value', dbPhoto => {
                //console.log(nome);
                //console.log(dbPhoto.val());
                
                if (dbPhoto.val() != null) {
                    const cdloja = JSON.stringify(dbPhoto.val());        
                    const caracteres = cdloja.length;
                    const resultado = cdloja.substring(cdloja.indexOf(":")+1);
                    const resultado2 = resultado.length;
                    const final = cdloja.substring(2,caracteres-resultado2-2);
            
                    atualizarTabela(final);
                }
                else{
                    console.warn("Não foi possível encontrar sua OS");
                }
        })
    }


let [contactObjects, setContactObjects] = useState({});

function atualizarTabela(recuperado) {
    // fireDb.child('pacientes').orderByChild("email").equalTo(nome).on('value', dbPhoto => {
    const fire = fireDb.child('OS');
    fire.child(recuperado)
        .child(sobrenome)
        .orderByChild("numOS").equalTo(sobrenome).on('value', dbPhoto => {

            if (dbPhoto.val() != null) {
                setContactObjects({
                    ...dbPhoto.val()
                })
            } else {
                setContactObjects({})
            }
        })
}


return (

    <Fragment>
        <form
            onSubmit={(event) => {
                event.preventDefault();
                recuperarcdloja();
                
            }}
        >
            <TextField
                value={nome}
                onChange={(event) => {
                    let tmpNome = event.target.value;
                    if (tmpNome.length >= 50) {
                        tmpNome = tmpNome.substr(0, 50);
                    }

                    setNome(tmpNome);
                }}
                id="nome"
                label="Código do Estabelecimento"
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField
                value={sobrenome}
                onChange={(event) => {
                    setSobrenome(event.target.value);
                }}
                id="sobrenome"
                label="Número da OS"
                variant="outlined"
                margin="normal"
                fullWidth
            />

            <Button type="submit" variant="contained" color="primary">
                Consultar OS
            </Button>
        </form>

        <div className="col-md-7">
            <table className="table table-borderless table-stripped">
                <thead className="thead-light">
                    <tr>
                        <th> Data             </th>
                        <th> Status           </th>
                        <th> OBS </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        Object.keys(contactObjects).map(id => {
                            return <tr key={id}>
                                {/* <td> {contactObjects[id].fullName} </td>
                                        <td> {contactObjects[id].celPhone} </td>
                                        <td> {contactObjects[id].email} </td> */}
                                <td> {contactObjects[id].data} </td>
                                <td> {contactObjects[id].lancamento} </td>
                                <td> {contactObjects[id].obs} </td>
                            </tr>

                        })
                    }
                </tbody>
            </table>
        </div>
    </Fragment>
);
}

export default FormularioCadastro;
