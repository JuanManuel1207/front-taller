import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { connectAPI } from '../connection/connectAPI';
import { BsDashCircle, BsFillGearFill, BsPlusCircle} from "react-icons/bs";


const Room = ()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const [showUpd, setShowUpd] = useState(false);
    const handleCloseUpd = () => setShowUpd(false);
    const handleShowUpd = () => setShowUpd(true);

    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState(''); 
    const [roomData, setRoomData] = useState([]);
    const [oneRoom, setOneRoom] = useState('');
    const [idRoomUpd, setidRoomUpd] = useState('');

    function modalEditar(id){
        setidRoomUpd(id);
        updModal();
        setShowUpd(true);
    }

    function updModal(){
        connectAPI
        .get(`/rooms/${idRoomUpd}`)
        .then((response) => {
            if (response.data != '') {
                setOneRoom(response.data)
            }else{
                alert('Algo salio mal, intente de nuevo')                
            }
          })
    }

    function addRoom(){
        connectAPI
        .post("/rooms",{ description, capacity})
        .then((response) => {
            if (response.status === 200) {
                alert('Acción completada')
            }else{
                alert('Algo salio mal, revise sus datos e intente de nuevo')                
            }
          })
    }

    function delRoom(idRoom){
        function deleteRoom(){ 
            connectAPI.delete(`/rooms/${idRoom}`)
            .then((response) => {
                if (response.status === 200) {
                  console.log('ok')
                  connectAPI.get('/rooms')
                  .then(resp => {
                        setRoomData(resp.data)   
                   })
                }
            })
        }
        return (
            <Button size='sm' variant="danger" onClick={deleteRoom}>
              <BsDashCircle/>
            </Button>
        )
    }

    useEffect(() => {
        connectAPI.get('/rooms')
        .then(resp => {
            setRoomData(resp.data)   
        })
    },[])

    return(
        <div className='container'>
            <div className='row'>
                <div className='col-sm-3'>
                    <Button variant="success" onClick={handleShow}>
                        <BsPlusCircle/> Add Room
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
                        <Modal.Title>Add Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicCapacity">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control type="number" placeholder="Enter capacity" min={0} value={capacity} onChange={(e)=>setCapacity(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="success" type='submit' onClick={addRoom}>Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal
                    show={showUpd}
                    onHide={handleCloseUpd}
                    backdrop="static"
                    keyboard={false}
                >
            <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Upd Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicCapacity">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control type="number" placeholder="Enter capacity" min={0} value={oneRoom.capacity} /*onChange={(e)=>setCapacity(e.target.value)}*//>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" value={oneRoom.description} onChange={(e)=>setDescription(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpd}>
                            Cancel
                        </Button>
                        <Button variant="success" type='submit'>Save</Button>
                    </Modal.Footer>
                </Form>
                </Modal>

            <div className='row'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Capacity</th>
                            <th>Description</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomData.map(room => (
                            <tr key={room.id}>                            
                                <td>{room.id}</td>
                                <td>{room.capacity}</td>
                                <td>{room.description}</td>
                                <td>
                                    {delRoom(room.id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
        
    )
}

export default Room;