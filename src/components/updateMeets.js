import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { connectAPI } from '../connection/connectAPI';

export function UpdateMeet({ id , infoAffair="",infoDateMeet="", infoRoom="" }) {

    const[affair, setAffair] = useState('');
    const[dateMeet, setDate] = useState('');
    const[room, setRoom] = useState('');
    const [meetData, setMeetData] = useState([])


  useEffect(() => {
    setAffair(infoAffair)
    setDate(infoDateMeet)
    setRoom(infoRoom)
  }, [])

  function send() {
    connectAPI
      .put(`/meets/${id}`, {
        id,
        affair,
        dateMeet,
        room:{id:room}
      })
      .then((response) => {
        if (response.status === 200) {
          connectAPI.get('/meets')
          .then(resp => {
                setMeetData(resp.data)   
           })
        }
    })
  }

  return (
    <>
        <Form>
            
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

            <Button variant="success" type='submit' 
                onClick={
                    send()
                } 
            >Save</Button>
        </Form>
    </>
  )
}