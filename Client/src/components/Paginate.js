import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

export const Paginate = (props) => {


let items = [];
for (let number = 1; number <= props.totalpage - 470 ; number++) {
    let active = props.page === number ? 'active': "";

  items.push(
    <Pagination.Item key={number} active={active} onClick={()=>props.nextPage(number)}>
      {number}
    </Pagination.Item>,
  );
}

const paginationBasic = (
  <div>
    <Pagination>{items}</Pagination>
  </div>
);
    return (
        <div className="container">
            {paginationBasic}
        </div>
    )
}

export default Paginate
