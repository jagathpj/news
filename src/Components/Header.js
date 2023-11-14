import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { fetchSearchResults } from "../Api/allReq";

const Header = ({
  setsearchResults,
  setcategory,
}) => {

    const [searchValue, setSearchValue] = useState("");

    const [isActive, setisActive] = useState()

  const searchTermFetch = async () => {
    let { data } = await fetchSearchResults(searchValue);
    setsearchResults(data);
  };

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const subjects = [
    "Top",
    "World",
    "Business",
    "Entertainment",
    "Food",
    "Health",
    "Politics",
    "Science",
    "Sports",
    "Technology",
  ];

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <img
            style={{ height: "25px", borderRadius: "2px" }}
            src="https://i.postimg.cc/MT8ZY9gv/news.jpg"
            alt=""
          />
          <Navbar.Brand href="#">DailyNews</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "400px" }}
              navbarScroll
            >
              {subjects.length > 0 &&
                subjects.map((item, ind) => (
                  <Nav.Link
                    key={ind}
                    style={{fontWeight:500}}
                    onClick={() => {
                      setsearchResults([])
                      setcategory(item);
                    }}
                  >
                    {item}
                  </Nav.Link>
                ))}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search content"
                className="me-2"
                aria-label="Search"
                onChange={(e) => handleInput(e)}
              />
              <Button variant="outline-success" onClick={searchTermFetch}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
