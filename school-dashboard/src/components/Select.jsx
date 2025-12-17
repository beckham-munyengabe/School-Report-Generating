import { useEffect,useState } from "react";

function Student(){
    const [student,setStudent]=useState([])


    useEffect(()=>{
        fetch("http://localhost:5000/students")
        .then(res=>res.json())
        .then(data => setStudent(data))
        .catch(err => console.error(err))
    }, []);

    return(
        <div>
            <h2>Student List</h2>
            <ul>
                {student.map(student =>(
                    <li key={student.id}>
                        {student.username} - {student.email} - {student.password}
                        </li>
                ))}
            </ul>
        </div>
    )
}


export default Student;