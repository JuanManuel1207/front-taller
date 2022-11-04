import { useEffect, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { connectAPI } from '../connection/connectAPI';

export function UpdateAct({ id , infoDescription="", infoMeet="" }) {

    const [description, setDescription] =  useState('')
    const [meet, setMeet] = useState('')

    const [actData, setActData] = useState([])

  useEffect(() => {
    setDescription(infoDescription)
    setMeet(infoMeet)
  }, [])

  function send() {
    connectAPI
      .put(`/acts/${id}`, {
        id,
        description,
        meet:{id:meet}
      })
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
    <>
        <Form>
            
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

            <Button variant="success" type='submit' 
                onClick={
                    send()
                } 
            >Save</Button>
        </Form>
    </>
  )
}