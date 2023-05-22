import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../navbar";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";
import { Modal } from "react-bootstrap";


const ViewUsers = () => {
  //Table Data
  const [TableData, setTableData] = useState("");
  //Variable Data
  const [FirstName, setFirstName] = useState("");
  const [Question, setQuestion] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [EveItem, setEveItem] = useState("");
  //Validations
  const [FirstNameValidation, setFirstNameValidation] = useState("");
  const [LastNameValidation, setLastNameValidation] = useState("");
  const [EmailValidation, setEmailValidation] = useState("");
  const [PasswordValidation, setPasswordValidation] = useState("");
  const [ConfirmPasswordValidation, setConfirmPasswordValidation] =
    useState("");
  //Get User Details
  const getAllData = () => {
    axios.get("http://localhost:8082/staffprofile/get").then((response) => {
      setTableData(response.data);
    });
  };
  //Save User
  const saveUser = () => {
    const model = {
      firstname: FirstName,
      question: Question,
      email: Email,
    };
    console.log(model);
    setFirstNameValidation("");
    setLastNameValidation("");
    setEmailValidation("");
    //setPasswordValidation("");
    //setConfirmPasswordValidation("");
    if (FirstName == "") {
      setFirstNameValidation("Please Enter First Name !!");
    } else if (Question == "") {
      setLastNameValidation("Please Enter Question !!");
    } else if (Email == "") {
     // setEmailValidation("Please Enter Email !!");
    //} else if (Password == "") {
      //setPasswordValidation("Please Enter Password !!");
    //} else if (ConfirmPassword == "") {
      //setConfirmPasswordValidation("Please Enter Confrim Password !!");
    } else {
      axios
        .post("http://localhost:8082/staffprofile/add", model)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            getAllData();
            toast.success("Successfully Saved !!!");
            setFirstName("");
            setQuestion("");
            setEmail("");
            setPassword("");
          }
        });
    }
  };
  //Delete User
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8082/staffprofile/delete/${id}`)
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
  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (eventItem) => {
    setFirstName(eventItem.firstname);
    setQuestion(eventItem.Question);
    setEmail(eventItem.email);
    //setPassword(eventItem.password);
    setEveItem(eventItem);
    setShow(true);
  };
  //Edit User
  const EditUser = (eventItem) => {
    const model = {
      firstname: FirstName,
      question: Question,
      email: Email,
    };
    console.log(model);
    axios
      .put(`http://localhost:8082/staffprofile/update/${eventItem._id}`, model)
      .then((response) => {
        if (response.status == 200) {
          getAllData();
          toast.success("Successfully Updated !!!");
          setFirstName("");
          setQuestion("");
          setEmail("");
          //setPassword("");
          handleClose();
        }
      });
  };
  return (
    <Fragment>
      <NavBar></NavBar>
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-6">
                  <FormGroup>
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                    {FirstNameValidation && (
                      <small style={{ color: "red" }}>
                        {FirstNameValidation}
                      </small>
                    )}
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    <Label>Question</Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setQuestion(e.target.value);
                      }}
                    />
                    {LastNameValidation && (
                      <small style={{ color: "red" }}>
                        {LastNameValidation}
                      </small>
                    )}
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
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
              </div>
              <div className="row">
                <div className="col-md-6">
                  <FormGroup>
                    {/* <Label>Password</Label> */}
                    {/* <Input
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    /> */}
                    {/* {PasswordValidation && (
                      <small style={{ color: "red" }}>
                        {PasswordValidation}
                      </small>
                    )} */}
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    {/* <Label>Confirm Password</Label> */}
                    {/* <Input
                      type="password"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    /> */}
                    {/* {ConfirmPasswordValidation && (
                      <small style={{ color: "red" }}>
                        {ConfirmPasswordValidation}
                      </small>
                    )} */}
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5"></div>
                <div className="col-md-4">
                  <Button
                    color="primary"
                    className="col-md-6"
                    onClick={() => saveUser()}
                  >
                    Submit
                  </Button>
                </div>
                <div className="col-md-4"></div>
              </div>
            </CardBody>
          </Card>
          <br></br>
          <Card>
            <CardHeader>All User Details</CardHeader>
            <CardBody>
              <Table>
                <tr>
                  <th>Record No</th>
                  <th>First Name</th>
                  <th>Questions</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
                {TableData &&
                  TableData.map((eventItem, index) => {
                    console.log(eventItem);
                    return (
                      <tr>
                        <td>{Number(index) + 1}</td>
                        <td>{eventItem.firstname}</td>
                        <td>{eventItem.question}</td>
                        <td>{eventItem.email}</td>
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
        </div>
        <div className="col-md-3"></div>
      </div>
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    value={FirstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label>questions</Label>
                  <Input
                    value={Question}
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                  />
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    value={Email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                {/* <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={Password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormGroup> */}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                EditUser(EveItem);
              }}
            >
              Update User
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Fragment>
  );
};
export default ViewUsers;
