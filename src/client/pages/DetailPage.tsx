import React from 'react'
import { useParams } from 'react-router-dom';

export const DetailPage = () => {

  const { id } = useParams();

  console.log(id);

  return (
    <div>DetailPage</div>
  )
}
