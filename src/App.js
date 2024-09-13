import React, { useEffect, useState } from "react";
import Day2 from "./Day2";
import Day3 from "./Day3";
import Day4 from "./Day4";
import Day5 from "./Day5";
import Day6 from "./Day6";
import Day7 from "./Day7";
import Day8 from "./Day8";
import Day9 from "./Day9";
import Day10 from "./Day10";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// Main Component
const App = () => {
  const days = [1,2,3,4,5,6,7,8,,9,10]
  const [currentDay, setCurrentDay] = useState(10);
  const navigate = useNavigate ()

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/authentication');
    }
  }, []);

  const handleDayClick =(day) => {
    setCurrentDay(day);
  };
  const handleLogout= async () => {
    const result = await Swal.fire({
      title: "Are You Sure?",
      icon:"warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!",
      cancelButtonText: "Cancel",
    });
    if(result.isConfirmed) {
      localStorage.removeItem('token');
      Swal.fire({
        icon: "success",
        title: "Log Out",
        tetx: "Thanks!",
        timer: 1500,
      });
      navigate('/authentication')
    };}
  const DayContent = ({day}) => {
    switch (day) {
      case 2:
        return <Day2></Day2>
      case 3:
        return <Day3></Day3>
      case 4:
        return <Day4></Day4>
      case 5:
        return <Day5></Day5>
      case 6:
        return <Day6></Day6>
      case 7:
        return <Day7></Day7>
      case 8:
        return <Day8></Day8>
      case 9:
        return <Day9></Day9>
      case 10:
        return <Day10></Day10>
      default:
        return null;
    }
  }
  
  
  return (
    <div className="app">
      {days.map((day) =>(
      <button onClick={() =>{
        handleDayClick(day);
      }}
      className={currentDay == day ?"active-btn":"inactive-btn"}
      >
         day {day}</button>
      ))}

      <DayContent day={currentDay}></DayContent>
      <button onClick={async () =>{
        await handleLogout()
      }}>Log Out</button>
      <style jsx> 
        {`
          .app {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
          button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin: 15px;
            box-shadow: 4px 3px rgba(0, 0, 0, 0.3);
          }
          .active-btn{
          background-color: green;
          }
        .inactive-btn{
          background-color: gray;
          }
        `}

      </style>
    </div>
  );
};
export default App;
