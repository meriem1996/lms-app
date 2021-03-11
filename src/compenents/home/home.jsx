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
            handleSumbit={this.addStudent}
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
    console.log(value, input)
    this.setState({ [input]: value })
  }
  addStudent = (event) => {
    //annuler le comportement par defaut =>preventDefault
    event.preventDefault();
    //validation formulaire

    if(this.state.nom=="" || this.state.prenom=="" || this.state.email=="" || this.state.avatar=="") {
      alert("veuillez remplir tous les champs")
    }else{

    //clear the form
    event.target.reset();
    //recuperer les infos
    let nvStudent = new StudentModal(
      // this.state.list_student_data.length + 1,
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

    let newStudent = this.state.list_student_data;
    newStudent.push(nvStudent);
    this.setState({ list_student_data: newStudent });
    //ajouter un etudiant a la partie serveur "firebase" avec axios
    axios.post("students.json",nvStudent)

    // console.log(this.state.list_student_data)
    // console.log(nvStudent)
    // alert(this.state.nom+'\n '+this.state.prenom+'\n '+this.state.email)
  }
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