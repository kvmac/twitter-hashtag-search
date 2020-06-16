import React, { useState } from 'react';
import { Spinner } from '@blueprintjs/core';


const ListTable = ({isLoading, hasError, tweets}) => {
  const [ page, setPage ] = useState(1);

  const columns = [
    "User",
    "Tweet",
    "Hashtags",
  ];


  if (hasError) {
    return (
      <div className="list-table">
        <div>error</div>
      </div>
    );
  }

  return (
    <div className="list-table">
      <table className="table-auto">

        <thead>
          <tr className="">
            <th className="w-8"></th>
            {columns.map((col) => <th className="px-4 py-2">{col}</th>)}
          </tr>
        </thead>

        {isLoading ?

          <Spinner /> :

          <tbody>
            {tweets.slice((page * 10), (page * 10) + 10).map((tweet) => {
              return (
                <tr className="border px-4 py-2">
                  <td className="border "><img src={tweet.img_uri || tweet.img_uri_https} alt="" /></td>
                  <td className="border px-4 py-2">
                    <span>{tweet.name}</span>
                    <span>{tweet.handle}</span>
                    <span>{tweet.location}</span>
                  </td>
                  <td className="border px-4 py-2">{tweet.text}</td>
                  <td className="border px-4 py-2">{tweet.hashtags.map((hashtag) => <span>{hashtag}</span>)}</td>
                </tr>
              );
            })}
          </tbody>}

          <tfoot>
            <div>
              <button
                className=""
                disabled={page === 1}
                onClick={setPage(page - 1)}
                >-</button>
              <label
                className=""
                >{page}</label>
              <button
                className=""
                disabled={page === 5}
                onClick={setPage(page + 1)}
                >+</button>
            </div>
          </tfoot>

      </table>
    </div>
  );
};


export default ListTable;