import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import HomeImg from '../Images/Image1.jpg'
import WorkImg from '../Images/Image2.jpg'
import WorkImg2 from '../Images/image3.jpg'
import '../Styles/Home.css'
function Home() {
  return (
    
     <section>
      
      <Container className='Container' >
        <Row>
       
          <Col lg='5'>
            <h1 className='heading__main d-flex'>ABC unlimited</h1>
            <h2 className='subheading__main d-flex mt-5'>We help Students to get their dream job</h2>
            <button className='Start__btn'>Start</button>
          </Col>
          <Col lg='6'>
            <img src={HomeImg} alt="" className='HomeImg'/>
          </Col>
        </Row>

      </Container>
      
      
      <Container style={{marginBottom:"70px"}}>
      <Row>
       <Col lg='4'>
       <img src={WorkImg} alt="" className='WorkImg'/>
       </Col>
       <Col lg='8' >
         <div className='box__right'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni deserunt cupiditate, quis nobis excepturi ipsum et omnis accusantium similique ut magnam commodi dignissimos illum, placeat doloribus animi vel amet accusamus.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni deserunt cupiditate, quis nobis excepturi ipsum et omnis accusantium similique ut magnam commodi dignissimos illum, placeat doloribus animi vel amet accusamus.
          </p>
         </div>
       </Col>
     </Row>
      </Container>
      <Container className='box__2'>
        <Row className='box__21'>
        <Col lg='8'>
         <div className='box__left'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni deserunt cupiditate, quis nobis excepturi ipsum et omnis accusantium similique ut magnam commodi dignissimos illum, placeat doloribus animi vel amet accusamus.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni deserunt cupiditate, quis nobis excepturi ipsum et omnis accusantium similique ut magnam commodi dignissimos illum, placeat doloribus animi vel amet accusamus.
          </p>
         </div>
       </Col>
       <Col lg='4'>
       <img src={WorkImg2 } alt="" className='WorkImg2'/>
       </Col>
        </Row>
      </Container>
      </section>
      
  )
}

export default Home