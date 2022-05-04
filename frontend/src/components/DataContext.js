import { createContext, useState,useEffect } from "react";
import axios from "axios";



// let MyDatabase=[
//     {name:"JSON",image1:"jason1.jpeg",image2:"jason2.jpeg",description:"JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays"},
//     {name:"JAVASCRIPT",image1:"javascript1.jpeg",image2:"javascript2.jpeg",description:"an object-oriented computer programming language commonly used to create interactive effects within web browsers."},
//     {name:"OOPS",image1:"oops1.jpeg",image2:"oops2.jpeg",description:"Object-oriented programming (OOP) is a computer programming model that organizes software design around data, or objects, rather than functions and logic"},
//     {name:"PROMISES",image1:"promise1.jpeg",image2:"promise2.jpeg",description:"Object-oriented programming (OOP) is a computer programming model that organizes software design around data, or objects, rather than functions and logic"},
//     {name:"REACT JS",image1:"react1.jpeg",image2:"react2.jpeg",description:"React is a free and open-source front-end JavaScript library for building user interfaces based on UI components"},
//     {name:"SCRUM",image1:"scrum1.jpeg",image2:"scrum2.jpeg",description:"Within project management, scrum, sometimes written Scrum or SCRUM, is a framework for developing, "},
//     {name:"WEB DEVELOPMENT",image1:"web1.jpeg",image2:"web2.jpeg",description:"Web development is the work involved in developing a website for the Internet or an intranet"},,
//     {name:"SQL",image1:"sql1.jpeg",image2:"sql2.jpeg"},
//     {name:"API COURSE",image1:"api1.jpeg",image2:"api2.jpeg"},
//     {name:"CLASSES AND OBJECTS",image1:"class1.jpeg",image2:"class2.jpeg"},
//     {name:"DATA SCIENCE",image1:"data1.jpeg",image2:"data2.jpeg"},
//     {name:"Full Stack",image1:"full1.jpeg",image2:"full2.jpeg"}
// ]

var MyDatabase = []




export  const DataContext = createContext({
    Data:[{
        
        image1:'',
        image2:'',
        name:'',
        description:'',
        course_id:''
       
    }],
   
    searchItem:()=>{},
    
});

export function DataProvider(props){
    
    
    
    const [currentdata, setcurrentdata] = useState([]);

    useEffect(async() =>  {
        
        await axios
          .get("/allcourses")
          .then((res) => {
              MyDatabase = res.data;
            setcurrentdata(res.data);
            // console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        // setcurrentdata(MyDatabase)
          
      }, [setcurrentdata]);
    
     //console.log(currentdata)

    const[search,setsearch]=useState('');
   
    const getValue=(val)=>{
        setsearch(val);
     }
     useEffect(() => {
        console.log(search);
        
        let searched='';
         if(search !==''){
             searched= MyDatabase.filter((data)=>{
                 return data.crs_name.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())
                
              });
              setcurrentdata(searched);
            
         }
        else{
            setcurrentdata(MyDatabase);
        }
   
     }, [search])
  
console.log(search)

    const context={
       Data:currentdata,
       getValue:getValue
    };

    return(
        <DataContext.Provider value={context}>
           {props.children}
        </DataContext.Provider>
    );
};
export default DataContext