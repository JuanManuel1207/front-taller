import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { connectAPI } from '../connection/connectAPI';
import { BsDashCircle, BsPlusCircle} from "react-icons/bs";

import { BtnUpd } from './layouts/btnUpd';
import { UpdateMeet } from './updateMeets';

const Meet = ()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[affair, setAffair] = useState('');
    const[dateMeet, setDate] = useState('');
    const[room, setRoom] = useState('');

    const [meetData, setMeetData] = useState([])

    function addMeet(){
        connectAPI
        .post("/meets",{ affair, dateMeet, room:{id:room}})
        .then((response) => {
            console.log(response.data)
            if (response.data == '') {
                alert('Algo salió mal, revise sus datos e intente de nuevo')
            }else{
                console.log('entro')
                alert('Acción completada')
            }
        })
    }

    function delMeet(idMeet){
        function deleteMeet(){ 
            connectAPI.delete(`/meets/${idMeet}`)
            .then((response) => {
                if (response.status === 200) {
                  console.log('ok')
                  connectAPI.get('/meets')
                  .then(resp => {
                        setMeetData(resp.data)   
                   })
                }
            })
        }
        return (
            <Button size="sm" variant="danger" onClick={deleteMeet}>
                <BsDashCircle/>
            </Button>
        )
    }

    useEffect(() => {
        connectAPI.get('/meets')
        .then(resp => {
            setMeetData(resp.data)   
  
        })
    },[])

    return(
        <div className='container'>
            <div className='row'>
                <div className='col-sm-3'>
                    <Button variant="success" onClick={handleShow}>
                        <BsPlusCircle/> Add Meet
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
                        <Modal.Title>Add Meet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicAffair">
                            <Form.Label>Affair</Form.Label>
                            <Form.Control type="text" placeholder="Enter Affair" value={affair} onChange={(e)=>setAffair(e.target.value)}/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="datetime-local" value={dateMeet} onChange={(e)=>setDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRoom">
                            <Form.Label>Room</Form.Label>
                            <Form.Control type="number" placeholder="Enter Room Id" min={0} value={room} onChange={(e)=>setRoom(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="success" type='submit' onClick={addMeet}>Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            

            <div className='row'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Affair</th>
                            <th>Date</th>
                            <th>Room</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetData.map(meet => (
                            <tr key={meet.id}>
                                <td>{meet.id}</td>
                                <td>{meet.affair}</td>
                                <td>{meet.dateMeet}</td>
                                <td>{meet.room.id} | {meet.room.description}</td>
                                <td>
                                    {delMeet(meet.id)} | <BtnUpd dataUpdate={<UpdateMeet id={meet.id} infoAffair={meet.affair} infoDateMeet={meet.dateMeet} infoRoom={meet.room.id} />} title="Update Meet"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Meet;