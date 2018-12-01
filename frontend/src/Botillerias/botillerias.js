import React, { Component } from 'react';
import Botix from '../Botix';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import { Modal, Button } from 'antd';




const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={props.zoom||15}
    center={{ lat: props.lat , lng:  props.lng}}
    onClick={ (click)=>{ }}
  >


       {props.botillerias.map( (botilleria,key)=> <Marker

          onClick={() => { 

            Modal.info({
              title: `Botilleria :  ${botilleria.nombre}`,
              content: (
                <div>
                  <p>Nombre: {botilleria.nombre }  </p>
                  <p>Direccion: {botilleria.direccion }  </p>
                {botilleria.suscripcion ==2 ? 
                <div>
                  <p>Horario: {botilleria.horarios.join(", ") }  </p>
                  <p>Promociones: {botilleria.promociones.join(", ") }</p>
                  <p>Medio de pago: {botilleria.medio_pago.join(", ") }</p>
                 </div>:null}
              
                  </div>
              ),
              onOk() {},
            });


          } }
        
        position={{lat: botilleria.ubicacion.coordinates[1], lng:  botilleria.ubicacion.coordinates[0] }}
       /> ) }

  </GoogleMap>
);


class Botillerias extends Botix {

    constructor(props){
      super(props)

      this.state={botillerias: [] }
      this.Resources("botillerias").getAll().then(botillerias => { this.setState( { botillerias:botillerias }) } )

    }


  render() {

    return <div>

{this.state.botillerias.length  ?<MapWithAMarker
                  lat={ -33.452396 }
                  lng={    -70.661535}
                  
                  botillerias={this.state.botillerias}
    
                  containerElement={<div style={{ height: `700px` }} />}
                  mapElement={<div style={{ height: `100%` , width:`100%` }} />}
          />:null}



      
    </div>

  }
}

export default Botillerias;