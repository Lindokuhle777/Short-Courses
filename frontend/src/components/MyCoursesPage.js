import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EnrolledAppBar from "./EnrolledAppBar";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Button,Dialog, DialogTitle, DialogContent, DialogActions,DialogContentText} from '@mui/material';
import MyCourseCard from "./CoursesUI/MyCourseCard";
import { useContext } from "react";
import { UserDataContext } from "./ContextAPI/UserDataContext";


function MyCourses() {

  const navigate = useNavigate();
  const {user} = useContext(UserDataContext);
  const [courses, setCourses] = useState([]);

  const [openDel, setOpenDel] = useState(false);

  useEffect(async()=>{
    // return all the courses created by the user...
    getCreatedCourses();
  });

  const getCreatedCourses = async()=>{
    axios.post("/getCreatedCourses", {userID: user.userID})
    .then((response)=> {setCourses(response.data)})
    .catch((err)=> console.log(err));
  }

  const handleShow = () => {
    navigate("/CreateCourse");
  };

  const onClose = ()=>{
    setOpenDel(false);
  }

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');


  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <EnrolledAppBar title="My Courses" modal={true} />
      <div style = {{display: 'flex', marginTop: '10%'}}>
      {courses.map((course, index)=>
        <MyCourseCard 
        key = {index}
        ourseID = {course.courseID}
        courseName = {course.courseName}
        images = {course.images}
        openDel = {openDel}
        setOpenDel = {setOpenDel}
        />
      )}
      </div>

      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={openDel} onClose={onClose}>
            <DialogTitle>DELETE COURSE</DialogTitle>
            <DialogContent>
            <DialogContentText>
                This action cannot be reversed
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant = 'text' onClick={onClose}>Cancel</Button>
                <Button variant = 'text' onClick={onClose}>Delete</Button>
            </DialogActions>
      </Dialog>

      <Fab
        color="primary"
        aria-label="add"
        style={fabStyle}
        onClick={handleShow}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

const fabStyle = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
  backgroundColor: "#d9c93b",
};

export default MyCourses;
