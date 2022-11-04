import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { connectAPI } from '../connection/connectAPI';
import { FloatingLabel } from 'react-bootstrap';

import { BsDashCircle, BsPlusCircle} from "react-icons/bs";


const Act = ()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actData, setActData] = useState([])
    const [description, setDescription] =  useState('')
    const [meet, setMeet] = useState('')

    function addAct(){
        connectAPI
        .post("/acts",{ description, meet:{id:meet}})
        .then((response) => {
            if (response.data == '') {
                alert('Algo salió mal, revise sus datos e intente de nuevo')
            }else{
                alert('Acción completada')
            }
          })
    }

    function delAct(idAct){
        function deleteAct(){ 
            connectAPI.delete(`/acts/${idAct}`)
            .then((response) => {
                if (response.status === 200) {
                  connectAPI.get('/acts')
                  .then(resp => {
                        setActData(resp.data)   
                   })
                }
            })
        }
        return (
            <Button size='sm' variant="danger" onClick={deleteAct}>
                <BsDashCircle/>
            </Button>
        )
    }

    useEffect(() => {
        connectAPI.get('/acts')
        .then(resp => {
            setActData(resp.data)   
  
        })
    },[])

    return(
        <div className='container'>
            <div className='row'>
                <div className='col-sm-3'>
                    <Button variant="success" onClick={handleShow}>
                        <BsPlusCircle/> Add Act
                    </Button>
                </div>
            </div>                

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Act</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <FloatingLabel controlId="formBasicDescription" label="Description">
                                <Form.Control
                                as="textarea"
                                placeholder="Enter Description"
                                style={{ height: '100px' }}
                                value={description} onChange={(e)=>setDescription(e.target.value)}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicMeet">
                            <Form.Label>Meet</Form.Label>
                            <Form.Control type="number" placeholder="Enter Meet Id" min={0} value={meet} onChange={(e)=>setMeet(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="success" type='submit' onClick={addAct}>Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            
            <div className='row'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Meet</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actData.map(act => (
                            <tr key={act.id}>
                                <td>{act.id}</td>
                                <td>{act.description}</td>
                                <td>{act.meet.id} | {act.meet.affair}</td>
                                <td>
                                    {delAct(act.id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Act;