import React from 'react'
import Container from '../Container'

const BlogCard = ({date, title, description}) => {
  return (
  <Container className='col-lg-5 my-2'>
    <p className='fw-light text-dark'>{date}</p>
    <h3>{title}</h3>
    <p className='text-secondary text-break'>{description}</p>
  </Container>
  )
}

export default BlogCard