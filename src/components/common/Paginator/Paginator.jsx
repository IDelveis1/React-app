import React, { useState } from 'react';
import clas from './Paginator.module.css'




const Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let PortionCount = Math.ceil(pagesCount / props.portionSize);
    let [PortionNumber, SetPortionNumber] = useState(1);
    let LeftBorder = (PortionNumber - 1) * props.portionSize + 1;
    let RightBorder = PortionNumber * props.portionSize;


    return (
        <div className={clas.paginator}>
            {PortionNumber > 1 && <button onClick={() => {SetPortionNumber(PortionNumber - 1)} }>Previous</button>}
            
                {pages.filter(p => p >= LeftBorder && p <= RightBorder).map(p => {
                    return <span onClick={(e) => { props.onPageChanged(p) }} className={props.currentPage === p ? clas.selectedPage : clas.pageNumber}>{p}</span>
                })}
         {PortionCount > PortionNumber && <button onClick={() => {SetPortionNumber(PortionNumber + 1)} }>Next</button>}
        </div>
    )
}


export default Paginator;