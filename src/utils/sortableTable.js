import React, { useState } from 'react';

const useSortableTable = () => {
  const [sorting, setSorting] = useState({});

  const applySorting = (key, ascending) => {
    console.log(key,{ [key]: { ascending }});
    setSorting(prevSorting => ({
 //     ...prevSorting,
      [key]: { ascending }
    }));
  };

  const SortableHeader = ({ columnKey, children }) => {
    return (
      <th scope="col" role="button" onClick={() => applySorting(columnKey, !sorting[columnKey]?.ascending)}>
        {children} {(sorting[columnKey]?.ascending === true) ? '▲' : (sorting[columnKey]?.ascending === false) ? '▼' : '▲▼'}
      </th>
    );
  };

  return { sorting, SortableHeader };
};

export default useSortableTable;
