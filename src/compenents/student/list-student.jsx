import Student from "./student";
export default function ListStudent(props) {
    // console.log(props)
    return (
        <div className="h-75 col-8 border p-5 overflow-scroll ">
            <input
                type="text"
                className="w-50 form-control mx-auto"
                placeholder="Filter students by firstname or lastname"
            />

            <div className="p-5 d-flex flex-wrap justify-content-center ">
                {/* <Student data={props.dataList[0]} />
                <Student data={props.dataList[1]} />
                <Student data={props.dataList[2]} /> */}
                {
                    props.dataList.map( (s , index) =><Student key={index} data={s} /> )
                }
            </div>
        </div>
    )
}
