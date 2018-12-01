import React, { Component } from 'react';
import Botix from '../Botix';


class Usuarios extends Botix {

    constructor(props){
      super(props)

      this.state={botillerias: [] }
      this.Resources("botillerias").getAll().then(botillerias => { this.setState( { botillerias:botillerias }) } )

    }


  render() {

    return <div> asdfads
      fa
    </div>

  } 


}

export default Usuarios
