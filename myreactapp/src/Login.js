import { useEffect,useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './common.css'

function Login(){
    //UI will be updated only when changes reflect in following variables via defined functions
    const [loginDetails,setloginDetails] = useState([]); //this array is to store complete data from database
    const [insertLogin,setlogin] =                       //this JSON object stores input text info
    useState({first_name :"",  last_name :"",
              email     :"",  password  :""});

    const [message,setmessage] = useState("");          // this string is to show messages to user on success/fail 
    const [idx ,setId ]= useState("");  // not for rendering

    //************************************************************************************* */
    useEffect(()=>{
        //debugger;
        var helper = new XMLHttpRequest();
        helper.open("GET","http://127.0.0.1:5000/login");
        helper.send();

        helper.onreadystatechange = ()=>{
            if(helper.readyState== 4 && helper.status ==200){
                var data = JSON.parse(helper.responseText);
                setloginDetails(data);
            }
            else{
                //something went wrong
            }
        }
    },[]) //this method works like ComponentDidMount when second parameter is empty

    var AddLogin=()=>{
        var helper = new XMLHttpRequest();
        helper.open("POST","http://127.0.0.1:5000/login");
        helper.setRequestHeader("content-type","application/json");
        helper.send(JSON.stringify(insertLogin));

        helper.onreadystatechange = ()=>{
            if(helper.readyState== 4 && helper.status ==200){
                var result =  JSON.parse(helper.responseText);
                ShowMessage("Record Added Successfully!")
                Refresh();  //get the latest data from server upon successful insersion in db
            }
            else{
                ShowMessage("Something went wrong!")
            }
        }
    }

    var Refresh = ()=>{
        var helper = new XMLHttpRequest();
        helper.open("GET","http://127.0.0.1:5000/login");
        helper.send();

        helper.onreadystatechange = ()=>{
            if(helper.readyState== 4 && helper.status ==200){
                var data = JSON.parse(helper.responseText);
                setloginDetails(data);
                setlogin({first_name :"",  last_name :"",
                            email     :"",  password  :""});
            }
        }
    }

    //only till here login

    var DeleteLogin =(RowID)=>{
        debugger;
        var helper = new XMLHttpRequest();
        helper.open("DELETE","http://127.0.0.1:5000/login/"+RowID);
        helper.send();

        helper.onreadystatechange = ()=>{
            if(helper.readyState== 4 && helper.status ==200){
                Refresh();
                ShowMessage("Record Deleted Successfully!")
            }
            else{
                ShowMessage("Something Went Wrong!")
            }
        }
    }

    var UpdateLogin =()=>{
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
            if(helper.readyState== 4 && helper.status ==200){
                Refresh();
                ShowMessage("Record Updated Successfully!")
            }
            else{
                ShowMessage("Something Went Wrong!")
            }
        }
        helper.open("PUT","http://127.0.0.1:5000/login/"+idx);
        helper.setRequestHeader("content-type","application/json");
        helper.send(JSON.stringify(insertLogin));
        debugger;
    }

    // var EditLogin =(RowID)=>{
    //     debugger;
    //     if(loginDetails!=null && loginDetails.length>0){ //
    //         for(var i=0;i<loginDetails.length;i++)
    //         {
    //             if(loginDetails[i].loginID==RowID)
    //             {
    //                 setlogin(loginDetails[i]);
    //                 break;
    //             }
    //         }
    //     }
    // }

    var ShowMessage=(displayMsg)=>{
        setmessage(displayMsg);

        window.setTimeout(()=>{
             setmessage("");
        }, 5000); //5secs
    }

    var onTextChanged=(args)=>{
        var copyOfInsertLogin = {...insertLogin};
        copyOfInsertLogin[args.target.name]=args.target.value;
        setlogin(copyOfInsertLogin);
        debugger;
    }

    //UI design
    return (
    <div className="container">
        <div className="myDivStyle">
            FirstName:
            <input type     ='text'
                   value    ={insertLogin.first_name} // this first_name should match with name attribute
                   name        = "first_name"
                   onChange = {onTextChanged}
            />
            <hr></hr>

            LastName:
            <input type     ='text'
                   value    ={insertLogin.last_name}
                   name     = "last_name"
                   onChange = {onTextChanged}
            />
            <hr></hr>

            EmailID:
            <input type     ='text'
                   value    ={insertLogin.email}
                   name     = "email"
                   onChange = {onTextChanged}
            />
            <hr></hr>

            {/* MobileNo:
            <input type     ='text'
                   value    ={insertLogin.mobileNo}
                   name     = "mobileNo"
                   onChange = {onTextChanged}
            />
            <hr></hr>

            Address
            <input type     ='text'
                   value    ={insertLogin.address}
                   name     = "address"
                   onChange = {onTextChanged}
            />
            <hr></hr> */}
            
            Password
            <input type     ='text'
                   value    ={insertLogin.password}
                   name     = "password"
                   onChange = {onTextChanged}
            />
            <hr></hr>

            <button className="btn btn-primary"
                    onClick={AddLogin}>
            Add
            </button>

            <button className="btn btn-success"
                    onClick={UpdateLogin}
            >
            Update
            </button>
        </div>

        <div className="table-responsive">
        <div className='alert alert-danger'>
            {message}
        </div>

        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>LoginID</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                    {/* <th>MobileNo</th>
                    <th>Address</th> */}
                    <th>Password</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>
            {  
                loginDetails.map((i)=>{
                    return <tr key={i.loginID}>
                        <td>{i.loginID}</td>
                        <td>{i.first_name}</td>
                        <td>{i.last_name}</td>
                        <td>{i.email}</td>
                        {/* <td>{i.mobileNo}</td>
                        <td>{i.address}</td> */}
                        <td>{i.password}</td>
                        <td>
                            <button className="btn btn-danger"
                            onClick={()=>{
                                debugger;
                                DeleteLogin(i.loginID) 
                            }}>
                            Delete
                            </button>

                            <button className="btn btn-info"
                                    onClick={()=>{
                                    //EditLogin(i.loginID)
                                    setlogin({first_name:i.first_name,
                                            last_name:i.last_name,
                                            email:i.email,
                                            // mobileNo:i.mobileNo,
                                            // address:i.address,
                                            password:i.password})
                                    setId(i.loginID)
                            }}>
                            Edit
                            </button>
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
        </div>
    </div>
    )
}

export default Login;