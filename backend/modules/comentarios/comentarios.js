import Resources from "../../system/Resources"
import {SQL,Modelos} from "../../system/database"
export default class Comentarios extends Resources{
	constructor(props){
		super(props)
	}


	getAll(){
			SQL(`
			select nombre,apellido,comentarios,estrellas  from comentarios
				join usuarios on  comentarios.usuario_id = usuarios.id 
				where botilleria_id = ${+this.props.botilleria_id}	
			`).then(data => {  this.send(data ) } )  
				
	}
	
	



}
