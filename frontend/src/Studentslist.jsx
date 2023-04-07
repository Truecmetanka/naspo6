import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Studentslist = () => {
    const fetchStudents = async () => {
        const {data} = await axios.get('http://localhost:8088/students')
        setStuds(data)
    }

    const addStudent = async (student) => {
      const {data} = await axios.post('http://localhost:8088/students', student)
      setStuds([...studs, student])
    } 

    const [studs, setStuds] = useState([])
    const [stud, setStud] = useState({
      name: "",
      description: ""
    })

    useEffect(() => {
      fetchStudents()
      console.log(studs)
    }, [])

  return (
    <div>
        <form>
          <input type="text" value={stud.name}
            onChange = {(event) => setStud({...stud, name: event.target.value})}
          />
          <input type="text" value={stud.description}
            onChange = {(event) => setStud({...stud, description: event.target.value})}
          />
          <button onClick = {(event) => {
            event.preventDefault()
            addStudent(stud)
          }}>
            Добавить студента
          </button>
        </form>
        <p>Список студентов</p>
        {studs.map((stud) => <p key = {stud.name}>{stud.name} {stud.description}</p>)}
    </div>
  )
}

export default Studentslist