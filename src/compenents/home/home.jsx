import React from "react";
import ListStudent from "../student/list-student";
import NewStudent from "../student/new-student";
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
      list_student_data: [
        // new StudentModal("meriem","kadiri","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",true),
        // new StudentModal("mery","kadi","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",false),
        // new StudentModal("meriem","kadiri","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",true),
        // new StudentModal("mery","kadi","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",false),
        // new StudentModal("meriem","kadiri","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",true),
        // new StudentModal("mery","kadi","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",false),
        // new StudentModal("mimi","kad","mery-mimi-96@gmail.com","https://i.stack.imgur.com/l60Hf.png",true)
      ]
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
          <NewStudent
            handleSubmit={this.addStudent}
            changeInput={this.changeInput}
          // changeInputNom={this.changeInputNom}
          // changeInputPren={this.changeInputPren}
          // changeInputAvatar={this.changeInputAvatar}
          // changeInputEmail={this.changeInputEmail}
          />
          <ListStudent dataList={this.state.list_student_data} />
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
        this.setState({list_student_data:newStudent})
      })




      // console.log(this.state.list_student_data)
      // console.log(nvStudent)
      // alert(this.state.nom+'\n '+this.state.prenom+'\n '+this.state.email)
    }


  }
  // recuperer la liste des etudiants depuis firebase onload page avec firebase

  componentDidMount() {
    axios.get("students.json").then((response) => {
      //extraire toutes les cles du l'objet data
      let keys = Object.keys(response.data)
      //parcourir les keys
    let listEtudiant =  keys.map((k) => {

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
      this.setState({list_student_data:listEtudiant})

      console.log(listEtudiant)
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
}
export default Home;