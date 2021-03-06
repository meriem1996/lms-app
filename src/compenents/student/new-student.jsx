import React from 'react'

export default function NewStudent(props) {
    return (
        <div className="col-4 border p-5">
          <div className="avatar border mx-auto mt-5 " style={{backgroundImage:`url(${props.avatar || 'https://i.stack.imgur.com/l60Hf.png'})`,backgroundSize:'cover'}}/>
          <form onSubmit={props.action=="ADD" ? props.handleAddSubmit : props.handleEditSubmit} autoComplete="off">
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input
              name="prenom"
              value={props.prenom}
                onChange={props.changeInput}
                placeholder="Firstname"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input
              name="nom"
              value={props.nom}
                onChange={props.changeInput}
                placeholder="Lastname"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input
              name="email"
              value={props.email}
                onChange={props.changeInput}
                placeholder="Email address"
                type="email"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input
              name="avatar"
              value={props.avatar}
                onChange={props.changeInput}
                placeholder="Url Avatar"
                type="url"
                className="form-control"
              />
            </div>
            <div className="text-center">
              <button type="submit" className={props.btn}>
               <i className={props.iconBtn} /> {props.textBtn}
              </button>
            </div>
          </form>
        </div>         
    )
}
