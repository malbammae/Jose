import Resources from "../../system/Resources"
import {SQL,Modelos} from "../../system/database"
export default class Colmenas extends Resources{
	constructor(props){
		super(props)
	}

	getAll(){
		SQL(`
		select nombre,apellido,correo
			from usuarios
		`).then(data => {  this.send(data ) } )  
			
}




}
