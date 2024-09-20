import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
const Product = () => {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://66ebbc1e2b6cf2b89c5b759e.mockapi.io/dharma`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);
  const getData = () => {
    axios
      .get(`https://66ebbc1e2b6cf2b89c5b759e.mockapi.io/dharma`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://66ebbc1e2b6cf2b89c5b759e.mockapi.io/dharma/${id}`)
      .then(() => {
        getData();
      });
  };
  console.log(APIData);
  return (
    <>
      
      <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: 'grey', padding: '10px'}}>
        <div>Product Page</div>
        <Link className="btn btn-success" href="AddProducts">
          Add New Products
        </Link>
      </div>
      <div className="container">
      <div>
        {APIData.length !== 0 ? (
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>S.No</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Piece</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                {/* <Table.HeaderCell>Update</Table.HeaderCell> */}
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {APIData.map((data, index) => {
                return (
                  <Table.Row>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell>{data.price}</Table.Cell>
                    <Table.Cell>{data.piece}</Table.Cell>
                    <Table.Cell>
                      <img
                        style={{ width: "60px" }}
                        src={
                          "https://raw.githubusercontent.com/dharmagktr/fruits_images/main/" +
                          data.image
                        }
                        alt="images"
                      />
                    </Table.Cell>
                    <Table.Cell>{data.listingType}</Table.Cell>
                    {/* <Table.Cell><Button className='ui green button' >Update</Button></Table.Cell> */}
                    <Table.Cell>
                      <Button
                        className="ui red button"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        ) : (
          <>no data</>
        )}
      </div>
      </div>
    </>
  );
};

export default Product;
