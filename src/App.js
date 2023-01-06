
import { useState } from "react";
import "./App.css";
function App() {
  const [students, setStudents] = useState([]);
 
  const [checkin, setCheckin] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [present, setPresent] = useState(false);
  const handlesubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const roll = e.target[1].value;
    const classs = e.target[2].value;
    const section = e.target[3].value;

    const checkInTime=new Date().toLocaleTimeString();
    const student = {
      name,
      roll,
      classs,
      section,

      checkInTime,
    };
    setStudents([...students, student]);
    setCheckin(false);
  };
  const handlecheckout = (e) => {
    e.preventDefault();
    const roll = e.target[0].value;
    const student = students.find((student) => student.roll === roll);
    if (!student) {
      alert("Student not checked in");
      return;
    }
    const newstudents = students.filter((student) => student.roll !== roll);
    alert("Student "+student.name+" checked out At "+new Date().toLocaleTimeString());
    setStudents(newstudents);
    setCheckout(false);
  };

  return (
    <div class="text-bg-info">
    <div>
      <h1 class="studentHeader bg-primary">Student Attendance</h1>
    </div>
      <div>
        <button  type="button" class="checkinButton btn btn-success btn-lg" onClick={() => setCheckin(!checkin)}>Check In</button>
        <button type="button" class="checkoutButton btn btn-danger btn-lg" onClick={() => setCheckout(!checkout)}>Check Out</button>
        {checkin && (
          <form onSubmit={(e) => handlesubmit(e)}>
            <input type="text" placeholder="Enter Name" />
            <input type="text" placeholder="Enter Roll no." />
            <input type="text" placeholder="Enter Class" />
            <input type="text" placeholder="Enter Section" />
           
            <button class="submitButton btn btn-primary" type="submit">Submit</button>
          </form>
        )}
        <br />
        {checkout && (
          <form onSubmit={(e) => handlecheckout(e)}>
            <input type="text" placeholder="Enter Roll no." />
            <button class="submitButton btn btn-primary" type="submit">Submit</button>
          </form>
        )}
        <br />
        <button  type="button" class="presentButton btn btn-dark"
          onClick={() => {
            students.length > 0
              ? setPresent(!present)
              : alert("No students present");
          }}
        >
          Present
        </button>
        {present && (
          <table >
            <tr class="headingRow" >
              <th>Name</th>
              <th>Roll</th>
              <th>Class</th>
              <th>Section</th>
              <th>CheckInTime</th>
          
              
            </tr>
            {students.map((student) => (
              <tr>
                <td>{student.name}</td>
                <td>{student.roll}</td>
                <td>{student.classs}</td>
                <td>{student.section}</td>
                <td>{student.checkInTime}</td>
                
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
