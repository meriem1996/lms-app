import React from "react";
import ListStudent from "../student/list-student";
import FormStudent from "../student/new-student";
import StudentModal from "../../modeles/student-model";
import axios from "../../utils/axios";

class Home extends React.Component {
  constructor() {
    //call the constructor of the parent class React.component
    super();
    //data exterieur
    this.state = {
      // id:"",
      nom: "",
      prenom: "",
      email: "",
      avatar: "",
      updateStudent_id: -1,
      list_student_data: [
        // new StudentModal("meriem","kadiri","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",true),
        // new StudentModal("mery","kadi","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",false),
        // new StudentModal("meriem","kadiri","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",true),
        // new StudentModal("mery","kadi","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",false),
        // new StudentModal("meriem","kadiri","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",true),
        // new StudentModal("mery","kadi","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",false),
        // new StudentModal("mimi","kad","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",true)
      ],
      textBtn: "add student",
      iconBtn: "fas fa-plus-circle",
      btn: "btn btn-warning",
      action: "ADD"
    }
    // console.log(this.state)
  }
  render() {
    return (
      <>
        <h1 className="text-center text-white mt-5">
          🧑‍🎓 LMS-APP : <span className="text-warning">Home</span> 🏠
        </h1>
        <div className="container-fluid d-flex p-4">
          <FormStudent
            handleAddSubmit={this.addStudent}
            handleEditSubmit={this.submitEditStudent}
            changeInput={this.changeInput}

            textBtn={this.state.textBtn}
            iconBtn={this.state.iconBtn}
            btn={this.state.btn}
            avatar={this.state.avatar}
            nom={this.state.nom}
            prenom={this.state.prenom}
            email={this.state.email}
            action={this.state.action}
          // changeInputNom={this.changeInputNom}
          // changeInputPren={this.changeInputPren}
          // changeInputAvatar={this.changeInputAvatar}
          // changeInputEmail={this.changeInputEmail}
          />
          <ListStudent
            dataList={this.state.list_student_data}
            handleDeleteStudent={this.deleteStudent}
            handleEditStudent={this.editStudent}
          />
        </div>
      </>

    )
  }

  changeInput = (event) => {
    let value = event.target.value;
    let input = event.target.name;
    // console.log(value, input)
    this.setState({ [input]: value })
  }
  addStudent = (event) => {
    //annuler le comportement par defaut =>preventDefault
    event.preventDefault();
    //validation formulaire

    if (this.state.nom == "" || this.state.prenom == "" || this.state.email == "" || this.state.avatar == "") {
      alert("veuillez remplir tous les champs")
    } else {

      //clear the form
      event.target.reset();
      //recuperer les infos
      let nvStudent = new StudentModal(
        // this.state.list_student_data.length + 1,
        0,
        this.state.nom,
        this.state.prenom,
        this.state.email,
        this.state.avatar,
        false
      );
      //vider tous les states

      this.setState({
        nom: "",
        prenom: "",
        email: "",
        avatar: "",
      })
      //ajouter student a la liste
      let newStudent = this.state.list_student_data;

      newStudent.push(nvStudent);
      this.setState({ list_student_data: newStudent });

      const data_student = {
        nom: nvStudent.nom,
        prenom: nvStudent.prenom,
        email: nvStudent.email,
        avatar: nvStudent.avatar,
        isPresent: nvStudent.isPresent
      }
      //ajouter un etudiant a la partie serveur "firebase" avec axios
      axios.post("students.json", data_student).then((response) => {

        let id_new_student = response.data.name;
        //chercher l'etudiant qui a l'id == 0 sur la liste
        let newStudent = this.state.list_student_data;
        newStudent.forEach(s => {
          if (s.id == 0) {
            s.id = id_new_student;
          }
          console.log(s)
        })
        this.setState({ list_student_data: newStudent })
      })




      // console.log(this.state.list_student_data)
      // console.log(nvStudent)
      // alert(this.state.nom+'\n '+this.state.prenom+'\n '+this.state.email)
    }


  }
  // recuperer la liste des etudiants depuis firebase onload page avec firebase

  componentDidMount() {
    axios.get("students.json").then((response) => {
      if (response.data != null) {
        //extraire toutes les cles du l'objet data
        let keys = Object.keys(response.data)
        //parcourir les keys
        let listEtudiant = keys.map((k) => {

          let ns = new StudentModal(
            k,
            response.data[k].nom,
            response.data[k].prenom,
            response.data[k].email,
            response.data[k].avatar,
            response.data[k].isPresent
          );
          return ns;
          //affichage des proprietes de l'objet data
          // console.log(k, response.data[k])

        });

        //ajouter la liste
        this.setState({ list_student_data: listEtudiant })

        console.log(listEtudiant)
      }
    })
  }
  // changeInputNom = (event)=> {
  //   this.setState({nom:event.target.value})
  // }
  // changeInputPren = (event)=> {
  //   this.setState({pren:event.target.value})
  // }
  // changeInputAvatar = (event)=> {
  //   this.setState({avatar:event.target.value})
  // }
  // changeInputEmail = (event)=> {
  //   this.setState({email:event.target.value})
  // }

  //handle delete student
  deleteStudent = (idStudent) => {

    let choice = window.confirm('Are you sure ?');
    if (choice == true) {
      //supp un etudiantdepuis firebase
      axios.delete("students/" + idStudent + ".json").then(() => {
        //supp dans html
        let newList = this.state.list_student_data.filter(
          (s) => s.id != idStudent
        )
        this.setState({ list_student_data: newList })
      })

    }
    // alert(idStudent)
  }
//lorsqu'on click sur btn edit icon
  editStudent = (editStudent) => {
    //changer le text du button newStudent
    this.setState({ textBtn: "Edit Student" })
    this.setState({ iconBtn: "fas fa-edit" })
    this.setState({ btn: "btn btn-success" })
    //changer l'action de state
    this.setState({ action: "EDIT" })
    //ajouter les infos au state
    this.setState({
      nom: editStudent.nom,
      prenom: editStudent.prenom,
      email: editStudent.email,
      avatar: editStudent.avatar,
      updateStudent_id: editStudent.id
    })
  }
//lorsqu'on change les infoson firebase
submitEditStudent = (event)=>{
  event.preventDefault();
  //partie data a envoyer a firebase
  const student_data = {
    nom:this.state.nom,
    prenom:this.state.prenom,
    email:this.state.email,
    avatar:this.state.avatar
  }
  //appe a la fonction put de axios
  axios.put("students/"+this.state.updateStudent_id+".json",student_data).then((response)=>{
    //changer les infos de l'etudiant
    let newList = this.state.list_student_data;
    newList.forEach((s)=>{
      if(s.id==this.state.updateStudent_id){

        s.nom=response.data.nom;
        s.prenom=response.data.prenom;
        s.email=response.data.email;
        s.avatar=response.data.avatar;
      }
    });
    //modifier la liste du state
    this.setState({list_student_data:newList})
    //vider le formulaire 
    event.target.reset();
    //vider les variables state
    this.setState({
      nom:"",
      prenom:"",
      email:"",
      avatar:"",
      updateStudent_id: -1,
      action:"ADD",
      textBtn: "add student",
      iconBtn: "fas fa-plus-circle",
      btn: "btn btn-warning"
    })
  })
}

}
export default Home;