
import { Button, Card, Col, Container, Modal, Nav, Navbar, Row } from 'react-bootstrap'
import { database } from './Firebase/config'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'; // Import Alert from MUI
// quill

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function DemoHome() {
const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message



    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [val, setVal] = useState([])
    const [id, setId] = useState([])
    //const [showEdit, setShowEdit] = useState(false)
    const value = collection(database, "demo")

    // FOR MODAL CREATE 
    //const [show, setShow] = useState(false);



    useEffect(() => {
        const getData = async () => {
            const dbVal = await getDocs(value)
            setVal(dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getData()
    })


    //ADD NEW
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const handleSnackbarClose = () => setSnackbarOpen(false);
    const hanndleCreate = async () => {
        await addDoc(value, { name1: fname, name2: quillData })
        setFname("")
        setQuillData("")
        handleCloseAdd()
        setSnackbarMessage('Document added successfully'); // Set success message
        setSnackbarOpen(true); //

    }

    ///EDITINGGG

    const [showEdit, setShow] = useState(false);
    const handleCloseEdit = () => {
        setShow(false)
        setFname("")
        setQuillData("")
    };
    const handleShowEdit = () => setShow(true);
    const handleEditBtn = (id, name1, name2) => {
        handleShowEdit()
        setFname(name1)
        setQuillData(name2)
        setId(id)
    }

    const hanndleUpdate = async () => {
        handleCloseEdit()
        const updateData = doc(database, "demo", id)
        await updateDoc(updateData, { name1: fname, name2: quillData })
        setFname("")
        setQuillData("")

    }


    //DELETE
    const handleDelete = async (id) => {
        const deleteVal = doc(database, "demo", id)
        await deleteDoc(deleteVal)
    }

    // QUILL

    const [quillData, setQuillData] = useState('');

    return (
        <>
            <div className="div">
                {/* ADD BUTTON AND MODAL */}
                <Button variant="success" className='fw-bolder  mt-5 ms-5 btn ' onClick={handleShowAdd}>
                    <i class="fa-solid fa-plus "></i> ADD NEW
                </Button>
                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="">Name :</label>
                        <input className='form-control mt-2 mb-3' placeholder='Enter the document name.' value={fname} type="text" onChange={(e) => setFname(e.target.value)} />
                        {/* <input value={lname} type="text" onChange={(e) => setLname(e.target.value)} /> */}

                        <ReactQuill theme="snow" value={quillData} onChange={setQuillData} style={{ height: "300px" }} />

                    </Modal.Body>
                    <Modal.Footer className='mt-3 mb-3'>
                        <Button variant="secondary" onClick={handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={hanndleCreate}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>



                {/* SHOWING THE DOCS */}

                <Row className='d-flex p-5'>
                    {val.map(values =>

                        <Col className='mt-5' sm={12} md={6} lg={4} xl={3} >


                            <Card className='shadow'>
                                <Card.Header className='bg-dark text-light '>{values.name1}</Card.Header>
                                <Card.Body>
                                    {/* <Card.Title>{values.name1}</Card.Title> */}
                                    <Card.Text>

                                        <div dangerouslySetInnerHTML={{ __html: values.name2 }} />
                                        {/* {values.name2}      .slice(0,5)*/}
                                    </Card.Text>
                                    {/* BUTTON AND MODAL FOR EDITING DOCS*/}
                                    <Button variant="warning" onClick={() => handleEditBtn(values.id, values.name1, values.name2)} ><i class="fa-solid fa-file-pen me-1"></i>Edit</Button>
                                    <Modal show={showEdit} onHide={handleCloseEdit}>
                                        <Modal.Header closeButton>
                                            <Modal.Title><i class="fa-solid fa-file-pen me-1"></i>Edit</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body >
                                            <label htmlFor="">Name :</label>
                                            <input className='form-control mt-2 mb-3' placeholder='Enter the document name.' value={fname} type="text" onChange={(e) => setFname(e.target.value)} />
                                            {/* <input value={lname} type="text" onChange={(e) => setLname(e.target.value)} /> */}

                                            <ReactQuill theme="snow" value={quillData} onChange={setQuillData} style={{ height: "300px" }} />


                                        </Modal.Body>
                                        <Modal.Footer className='mt-3 mb-3'>
                                            <Button variant="secondary" onClick={handleCloseEdit}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={hanndleUpdate}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    {/* BUTTON TO DELETE DOCS */}
                                    <Button className='ms-3' variant="primary" onClick={() => handleDelete(values.id)} ><i class="fa-solid fa-trash-can me-1"></i>Delete</Button>
                                </Card.Body>
                            </Card>



                        </Col>

                    )
                    }
                </Row>
            </div>


        </>
    )
}


export default DemoHome





// <input value={fname} type="text" onChange={(e) => setFname(e.target.value)} />
// <input value={lname} type="text" onChange={(e) => setLname(e.target.value)} />
// {!showEdit ? <button onClick={hanndleCreate}>Create</button> :
//     <button onClick={hanndleUpdate}>Update</button>}