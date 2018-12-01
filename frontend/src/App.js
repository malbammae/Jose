import React, { Component } from 'react';
import logo from './logo.svg';
import Botillerias from './Botillerias/botillerias'
import Usuarios from './usuarios/usuarios'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
        <a className="navbar-brand mr-1" href="main.html"><img src="images/logo.jpg" style={{width: 140, height: 60}} /></a>
        <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
          <i className="fas fa-bars" />
        </button>
        {/* Navbar Search */}
        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Buscar botillería..." aria-label="Search" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </form>
        {/* Navbar */}
        <ul className="navbar-nav ml-auto ml-md-0">
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-user-circle fa-fw" />
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
              <a className="dropdown-item" href="#">Cambiar Contraseña</a>
              {/* <a class="dropdown-item" href="#">Activity Log</a> */}
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Cerrar Sesión</a>
            </div>
          </li>
        </ul>
      </nav>
      <div id="wrapper">
        {/* Sidebar */}
        <ul className="sidebar navbar-nav">
          <li className="nav-item ">
            <a className="nav-link" href="index.html">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Buscar Botillerías</span>
            </a>
          </li>

          <li className="nav-item ">
            <a className="nav-link" href="index.html">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Gestionar Usuarios</span>
            </a>
          </li>
        
          <li className="nav-item ">
            <a className="nav-link" href="index.html">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Gestionar Botillerías</span>
            </a>
          </li>
        

        </ul>
        <div id="content-wrapper">
          <div className="container-fluid">
            {/* Breadcrumbs*/}
            {/* <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">Overview</li>
        </ol> */}
       



          <Botillerias />



          {/* <Usuarios /> */}
            {/* Sticky Footer */}
            <footer className="sticky-footer">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright Botix© 2019</span>
                </div>
              </div>
            </footer>
          </div>
          {/* /.content-wrapper */}




        </div>
        {/* /#wrapper */}
        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
        {/* Logout Modal*/}



      </div></div>
    );
  }
}

export default App;
