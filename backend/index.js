import cors from "cors";
import express from "express";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase-config.js";

const app = express();
//to be updated for sso
// middleware
app.use(express.json());
app.use(cors());

const tempData = [
  {
    name:"Course1",
    courseID:"CourseOneID",
    images:[]
  },
  {
    name:"Some Course2",
    courseID:"CourseTwoID",
    images:[]
  },
  {
    name:"Another Course3",
    courseID:"CourseThreeID",
    images:[]
  },
  {
    name:"Course4",
    courseID:"CourseFourID",
    images:[]
  },
  
  
];

const PORT = process.env.PORT || 5000;

const getData = async () => {
  const usersCollectionRef = collection(db, "slides");
  try {
    const data = await getDocs(usersCollectionRef);
    // console.log(data);

    return data;
  } catch (e) {
    console.log(e);
  }

  return null;
};

app.get("/getAllCourses", async (req, res) => {
  // const response = [];

  // const data = await getData();
  

  // if (data === null) {
  // } else {
  //   data.forEach((doc) => {
  //     response.push(doc.data());
  //   });

  //   res.send(response);
  // }
  res.send(tempData);
});

app.get("/users", (req, res) => {
  pool.query(`SELECT * FROM users`, (err, results) => {
    if (err) {
      res.status(400);
      throw err;
    }
    res.status(202);

    res.send(results.rows);
  });
  z;
});

app.post("/users/register", (req, res) => {
  // get the details from request body.
  const first_name = req.body.first_name;
  const user_id = req.body.user_id;
  const password = req.body.password;

  pool.query(
    `INSERT INTO users (user_id , password, first_name)
          VALUES ($1, $2, $3)`,
    [user_id, password, first_name], // use details to make a query to the database
    (err, results) => {
      if (err) {
        res.status(400); // client made a bad request
      }
      res.status(201); // USER CREATED
    }
  );
});

app.post("/users/login", (req, res) => {
  // get login details from request body
  const user_id_fromUser = req.body.user_id;
  const password_fromUser = req.body.password;

  pool.query(
    `SELECT user_id, password,first_name FROM users WHERE user_id = $1 `,
    [user_id_fromUser], // use details to make a query to the database
    (err, results) => {
      if (err) {
        res.status(400); // client made a bad request
        throw err;
      }

      // check if user details match the user form database
      if (results.rows.length !== 0) {
        console.log(results.rows[0].user_id + "from database");

        if (results.rows[0].password === password_fromUser) {
          res.send(results.rows[0].first_name);
        } else {
          res.send("Incorect passowrd");
        }
      } else if (results.rows.length == 0) {
        // noMatch
        res.send("no account");
      }
    }
  );
});

//enroll
app.post("/enroll", (req, res) => {
  const course_id = req.body.crs_id;
  const user_id = req.body.user_id;
  


  
});

app.post("/mycourses", (req, res) => {
  pool.query(
    "Select * from courses where crs_creator = $1",
    [req.body.user_id],
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/enrolled", (req, res) => {
  const user_id = req.body.user_id;
  // console.log(user_id)

  pool.query(
    "Select crs_code from enroll where user_id = $1",
    [user_id], // logged in user id
    (error, results) => {
      if (!error) {
        const data = []; // will add every object here
        console.log(results);

        // number of caurses the user is taking
        for (let i = 0; i < results.rowCount; i++) {
          var j = results.rows[i].crs_code;
          //get each course the user is doing
          pool.query(
            "Select * from courses where crs_id = $1",
            [j],
            (err, result) => {
              if (!err) {
                data.push(result.rows[0]); // adding all the enrolled course to one json

                if (i == results.rowCount - 1) {
                  res.send(data);
                }
              } else {
                console.log(err.message);
                console.log("hi");
              }
            }
          );
        }
      } else {
        console.log(err.message);
        console.log("hiHi");
      }
    }
  );
});

app.post("/CreateCourse", (req, res) => {
  const user_id = req.body.user_id;

  pool.query(
    `SELECT user_id, password,first_name FROM users WHERE user_id = $1 `,
    [user_id], // use details to make a query to the database
    (err, results) => {
      if (err) {
        console.log("client_not_working");
        // res.status(400); // client made a bad request
        // throw err;
      }

      // not registered, register by force
      else if (results.rows.length == 0) {
        pool.query(
          `INSERT INTO users (user_id , password, first_name)
                VALUES ($1, $2, $3)`,
          [user_id, "password", "first_name"], // use details to make a query to the database
          (error, result) => {
            if (error) {
              console.log("some error"); // client made a bad request
            } else {
              console.log("In"); // USER CREATED
            }
          }
        );
        // we in by force
      }
    }
  );

  var data =
    "INSERT INTO courses (crs_creator,crs_description,crs_id,crs_name) VALUES($1,$2,$3,$4);";

  pool.query(
    data,
    [req.body.user_id, "description", req.body.crs_id, req.body.crs_name],
    (err, results) => {
      if (err) {
        // course was not created
        throw err;
      } else {
        res.send("1 record inserted"); // course is created
      }
    }
  );
});

app.get("/allcourses", (req, res) => {
  pool.query("Select * from courses", (err, result) => {
    if (!err) {
      res.send(result.rows);
      console.log(result.rows);
    } else {
      res.send(err.message);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
