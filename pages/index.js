import styles from '../styles/Home.module.css'
import FormularioCadastro from './FormularioCadastro.jsx'
import {Container, Typography } from "@material-ui/core"
export default function Home() {
  return (
    <Container component="article" maxWidth="xs">
      <Typography variant="h3" component="h1" align="center" >Consulta OS</Typography>
      <FormularioCadastro></FormularioCadastro>
    </Container>
  )
}
