import Resources from "../../system/Resources"
import {SQL,Modelos} from "../../system/database"
export default class Botillerias extends Resources{
	constructor(props){
		super(props)
	}



	getAll(){

		SQL(`select nombre,telefono,direccion,medio_pago,horarios,suscripcion,fotos,promociones,ubicacion from botillerias
		left join 
		 ( select json_agg(promocion) as promociones,botilleria_id from publicidades GROUP BY botilleria_id ) as t1 
		 on
		 t1.botilleria_id = botillerias.id`).then(this.send)
	}
	
	



}
