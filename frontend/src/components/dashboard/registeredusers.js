import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Modal,
  Table,
} from "reactstrap";
import { toast } from "react-toastify";
import NavBar from "../navbar";
import moment from "moment";
const RegisteredUsers = () => {
  //Table Data
  const [TableData, setTableData] = useState("");
  //Variables
  const [UserImageUrl, setUserImageUrl] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [EveItem, setEveItem] = useState("");
  const [UserDOB, setUserDOB] = useState("");
  //Validations
  const [FirstNameValidation, setFirstNameValidation] = useState("");
  const [LastNameValidation, setLastNameValidation] = useState("");
  const [EmailValidation, setEmailValidation] = useState("");
  const [PasswordValidation, setPasswordValidation] = useState("");
  const [ConfirmPasswordValidation, setConfirmPasswordValidation] =
    useState("");

  //Get User Details
  const getAllData = () => {
    axios.get("http://localhost:8082/userprofile/get").then((response) => {
      setTableData(response.data);
    });
  };
  const [File, setFile] = useState("");
  const [Base64Url, setBase64Url] = useState("");
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;

        console.log(baseURL);
        setUserImageUrl(baseURL);
        console.log("Base", UserImageUrl);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };
  const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
    let { file } = File;

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;

        console.log("File Is", file);
        setBase64Url(result);
        setFile(file);
      })
      .catch((err) => {
        console.log(err);
      });
    setFile(e.target.file[0]);
  };
  //Delete User
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8082/userprofile/delete/${id}`)
      .then((response) => {
        console.log(response);
        getAllData();
      });
  };
  //Form Load
  useEffect(() => {
    if (!TableData) {
      getAllData();
    }
  });

  //Modal Variables
  const [show, setShow] = useState(false);
  //Modal Close
  const handleClose = () => setShow(false);
  //Modal Open
  const handleShow = (eventItem) => {
    setFirstName(eventItem.firstname);
    setLastName(eventItem.lastname);
    setEmail(eventItem.email);
    setPassword(eventItem.password);
    setConfirmPassword(eventItem.password);
    setUserImageUrl(eventItem.userimage);
    setEveItem(eventItem);
    setShow(true);
  };
  //Edit User
  const EditUser = (eventItem) => {
    const model = {
      firstname: FirstName,
      lastname: LastName,
      email: Email,
      password: Password,
      dob: UserDOB,
      userimage: UserImageUrl,
    };
    axios
      .put(`http://localhost:8082/userprofile/update/${eventItem._id}`, model)
      .then((response) => {
        if (response.status == 200) {
          getAllData();
          toast.success("Successfully Updated !!!");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          handleClose();
        }
      });
  };
  return (
    <Fragment>
      <NavBar></NavBar>
      <br></br>
      <br></br>
      <Card>
        <CardHeader>All User Details</CardHeader>
        <CardBody>
          <Table>
            <tr>
              <th>Record No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Authors</th>
              <th>Durations</th>
              <th>User Image</th>
              <th>Actions</th>
            </tr>
            {TableData &&
              TableData.map((eventItem, index) => {
                return (
                  <tr key={index}>
                    <td>{Number(index) + 1}</td>
                    <td>{eventItem.firstname}</td>
                    <td>{eventItem.lastname}</td>
                    <td>{eventItem.email}</td>
                    <td>{eventItem.dob}</td>
                    <td>
                      <img
                        style={{
                          width: "35px",
                          height: "35px",
                        }}
                        src={eventItem.userimage}
                      />
                    </td>

                    <td>
                      <Button onClick={() => handleShow(eventItem)}>
                        Edit
                      </Button>{" "}
                      &nbsp;
                      <Button
                        color="danger"
                        onClick={() => deleteUser(eventItem._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </Table>
        </CardBody>
      </Card>
      <br></br>
      <Card>
        <CardBody>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <FormGroup className="ml-5">
                <img
                  src={UserImageUrl}
                  alt="Avatar"
                  style={{
                    borderRadius: "50%",
                    width: "125px",
                    height: "125px",
                  }}
                ></img>
                <br></br>
                <br></br>
                <input
                  className="upload"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => handleFileInputChange(e)}
                />
              </FormGroup>
            </div>
            <div className="col-md-4"></div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={FirstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                {FirstNameValidation && (
                  <small style={{ color: "red" }}>{FirstNameValidation}</small>
                )}
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="text"
                  value={LastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                {LastNameValidation && (
                  <small style={{ color: "red" }}>{LastNameValidation}</small>
                )}
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label>Author</Label>
                <Input
                  value={Email}
                  type="text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {EmailValidation && (
                  <small style={{ color: "red" }}>{EmailValidation}</small>
                )}
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label>Duration</Label>
                <input
                  type="date"
                  className="form-control"
                  value={UserDOB}
                  onChange={(e) => {
                    setUserDOB(moment(e.target.value).format("yyyy-DD-MM"));
                  }}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label>Password</Label>
                <Input
                  value={Password}
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {PasswordValidation && (
                  <small style={{ color: "red" }}>{PasswordValidation}</small>
                )}
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={ConfirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                {ConfirmPasswordValidation && (
                  <small style={{ color: "red" }}>
                    {ConfirmPasswordValidation}
                  </small>
                )}
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5"></div>
            <div className="col-md-4">
              <Button
                color="primary"
                className="col-md-6"
                onClick={() => EditUser(EveItem)}
              >
                EditResource
              </Button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default RegisteredUsers;
