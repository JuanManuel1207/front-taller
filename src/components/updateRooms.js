import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { connectAPI } from '../connection/connectAPI';

export function UpdateRoom({ id , infoDescription="", infoCapacity="" }) {

  const [description, setDescription] = useState("")
  const [capacity, setCapacity] = useState("")
  const [roomData, setRoomData] = useState([]);


  useEffect(() => {
    setDescription(infoDescription)
    setCapacity(infoCapacity)
  }, [])

  function send() {
    connectAPI
      .put(`/rooms/${id}`, {
        id,
        description,
        capacity
      })
      .then((response) => {
        if (response.status === 200) {
          connectAPI.get('/rooms')
          .then(resp => {
                setRoomData(resp.data)   
           })
        }
    })
  }

  return (
    <>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicCapacity">
                <Form.Label>Capacity</Form.Label>
                <Form.Control type="number" placeholder="Enter capacity" min={0} value={capacity} onChange={(e)=>setCapacity(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
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