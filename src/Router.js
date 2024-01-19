import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'
import Inicio from './componentes/Home';
import Nav from './componentes/Menu';
import AgregarRegistro from './componentes/NuevoRegistro'
import ActualizarRegistro from './componentes/ActualizarRegistro';
import DetalleRegistro from './componentes/DetalleRegistro';
import ListarLibros from './componentes/ListarRegistros';
import BuscarRegistro from './componentes/BuscarRegistro';
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
			<Route path="/libro/nuevo" element={<AgregarRegistro />} />
			<Route path="/libro/actualizar/:id" element={<ActualizarRegistro />} /> 
			<Route exact path="/libro/detalle/:id" element={<DetalleRegistro />} /> 
			<Route path="/libro/listar" element={<ListarLibros />} />
			<Route exact path="/libro/buscar/:search" element={<BuscarRegistro/>} />
			<Route exact path="/redirect/:search" element={<Redirect/>}></Route>
		</Routes>

	</BrowserRouter>
	)
}
