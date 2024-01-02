import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'
import Inicio from './componentes/Home';
import Nav from './componentes/Menu';
import AgregarPaciente from './componentes/NuevoRegistro'
import ActualizarPaciente from './componentes/ActualizarRegistro';
import DetallePaciente from './componentes/DetalleRegistro';
import ListarPacientes from './componentes/ListarRegistros';
import BuscarPaciente from './componentes/BuscarRegistro';
import Redirect from './componentes/BusquedaPersonalizada';
//import Error from './componentes/Error'; // Import Error component*/

export default function Enrouter() {
	return (
		/*En las versiones actuales, <Routes> reemplaza a <Switch>*/
	<BrowserRouter>
		<Nav></Nav>
		<Routes>
			<Route exact path="/" element={<Inicio />} />
			<Route exact path="/inicio" element={<Inicio />} />
			<Route path="/paciente/nuevo" element={<AgregarPaciente />} />
			<Route path="/paciente/actualizar/:id" element={<ActualizarPaciente />} /> 
			<Route exact path="/paciente/detalle/:id" element={<DetallePaciente />} /> 
			<Route path="/paciente/listar" element={<ListarPacientes />} />
			<Route exact path="/paciente/buscar/:search" element={<BuscarPaciente/>} />
			<Route exact path="/redirect/:search" element={<Redirect/>}></Route>
		</Routes>

	</BrowserRouter>
	)
}
