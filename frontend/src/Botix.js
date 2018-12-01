import React, { Component } from 'react';

let HOST
if(window.window.location.hostname == "localhost")
HOST = "http://localhost:3040";
else
HOST = "https://api.Botix.com";


HOST = "http://192.168.7.103:3040";




let user = JSON.parse(window.localStorage.getItem("user"));
let jwt = window.localStorage.getItem("jwt")

// const Socket = io("https://api.labmovil.cl/?token=" + window.token.vilab);
//const Socket = io(HOST+`/?token=${jwt}`);
// const Updates = {}

// const hola = () =>{ }

// Socket.on('updates', (data) => {
//     console.log(data);
//     //Updates[data.canal](data.msg);
// });
let check_version = ()=>{
   let fetchData = { method: "POST", body: JSON.stringify({}), headers: { Accept: "application/json", "Content-Type": "application/json" } };
        fetch(HOST + "/version", fetchData)
          .then(function(res) {
            return res.json();
          })
          .then((res)=>{
            if (window.localStorage.length){
            let version_anterior = +(window.localStorage.getItem("version"));
            if (!version_anterior || version_anterior < res.version){
              window.localStorage.setItem("version", res.version);
              window.location.reload(true);

            }

          }
          });

}
check_version();

const CallProcess = (ruta, parametros, method) => {

    console.log("DATA",ruta, parametros, method )
    return new Promise((resolve, reject) => {
        let fetchData = {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };

        console.log("MET",method,parametros)
        if (method == "DELETE")
            ruta = `${ruta}/${parametros.id}`

        else if (method != "GET" && method != "HEAD"){


            let new_object={}
            var query = Object.keys(parametros)
            .map(k => {
                if (k[0]!= "_")
                    new_object[k]=parametros[k] 
                 })  
            fetchData.body = JSON.stringify(new_object);

        }
        else if (method == "GET"){
            var esc = encodeURIComponent;
            var query = Object.keys(parametros)
            .map(k => esc(k) + '=' + esc(parametros[k]))
            .join('&');
            ruta = ruta+"?"+query

        }
            



        if (jwt) {
            fetchData.headers.Authorization = jwt || "";
        }
        fetch(HOST + "/" + ruta, fetchData).then(function (res) {
            //    return res.json();
            resolve(res.json());
        });
        //.then(callback);
    });
};



class Resources {
    constructor(resource) {
        this._proceso = resource;
    }
    new() {
        return new Promise((resolve, reject) => {
            resolve(this);
        });
    }
    set(obj) {
        for (let o of Object.keys(obj)) this[o] = obj[o];
    }
    update(){
        return new Promise((resolve, reject) => {
            CallProcess(this._proceso+"/"+this.id, this, 'PUT').then(res => {
                  let x = new Resources(this._proceso);
                x.set(res);
                resolve(x);
            })
        })
    }

    save() {

        return new Promise((resolve, reject) => {
            CallProcess(this._proceso, this, "POST").then(res => {
                let x = new Resources(this._proceso);
                x.set(res);
                resolve(x);
            })
        })

    }
    delete() {
        return new Promise((resolve, reject) => {
            for (let ix in this._padre._cadena) {
                //console.log(ix, this._padre._cadena[ix].key, this.key);
                if (this._padre._cadena[ix].key == this.key) {
                    this._padre._cadena.splice(ix, 1);
                    resolve(this._padre._cadena);
                    CallProcess(this._proceso, this, "DELETE")
                    return;
                }
            }
        });
    }
    get(id, params = {}) {
        return new Promise((resolve, reject) => {
            CallProcess(this._proceso + "/" + id, params, "GET").then(res => {
                let x = new Resources(this._proceso);
                x.set(res);
                resolve(x);
            })
        })
    }
    getMore() {

        return this.get(this.id)


    }
    getAll(params = {}) {
        return new Promise((resolve, reject) => {
            CallProcess(this._proceso, params, "GET").then(res => {
                let resources = [];
                for (let r in res) {
                    let x = new Resources(this._proceso);
                    x.set(res[r]);
                    x.key = r;
                    x._padre = this;
                    resources.push(x);
                }
                this._cadena = resources;
                resolve(resources);
            });
        });
    }
    reload() { }
}

if (!user){

    
}

class Botix extends Component {
  usuario = user;

  setLogin(res){
    user = res.user
    window.localStorage.setItem("user", JSON.stringify(res.user));
    window.localStorage.setItem("jwt", res.jwt);
    window.location="/"

  }
  CloseSession(){
      window.localStorage.clear();
      window.location = "/"
  }

isLogin(){
    if (!this.usuario)
    return false
    return true
}

      Resources(process) {
        return new Resources(process);
    }

  CallProcess(ruta, parametros, callback) {


        let fetchData = { method: "POST", body: JSON.stringify(parametros), headers: { Accept: "application/json", "Content-Type": "application/json" } };
        if (jwt) {
          fetchData.headers.Authorization = jwt;
        }
        fetch(HOST + "/" + ruta, fetchData)
          .then(function(res) {
            return res.json();
          })
          .then(callback);


  }

}

export default Botix;