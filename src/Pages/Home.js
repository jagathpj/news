import React, { useEffect, useState } from "react";
import { fetchCategory, fetchNews, fetchNextPage } from "../Api/allReq";
import "./home.css";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { Bookmark } from "react-feather";
import Spinner from "react-bootstrap/Spinner";

const Home = ({ searchResults, category }) => {
  const [news, setNews] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [pages, setPages] = useState([]);

  const getNextPage = async (pageId) => {
    const { data } = await fetchNextPage(pageId);
    setNextPage(data.nextPage);
    setNews(data.results);
    !pages.includes(data.nextPage) && setPages([...pages, data.nextPage]);
  };

  const getCategory = async () => {
    let { data } = await fetchCategory(category);
    setNews(data.results);
    setNextPage(data.nextPage);
    setPages([...pages, data.nextPage]);
  };

  useEffect(() => {
    if (searchResults.results?.length > 0) {
      setNews(searchResults.results);
      setNextPage(searchResults.nextPage);
      setPages([]);
      setPages([...pages, searchResults.nextPage]);
    } else if (category) {
      getCategory();
    }
  }, [searchResults, category]);
console.log(news);
  return (
    <div>
      <p className="head">Daily News Pulse: Stay Informed Every Day</p>
      <Container id="top">
        <Row>
          {news.length > 0 ? (
            news.map((i, index) => (
              <>
                <Col className="mb-3 mt-3" lg={3} md={4} key={index}>
                 <a style={{textDecoration:"none"}} href={i.link}>
                    <div className="card">
                      <div className="body">
                        <p className="textTitle">{i.title}</p>
                        <p className="text">
                          {i.description?.length > 100
                            ? i.description.slice(0, 100) + "..."
                            : i.description}{" "}
                        </p>
                        <span className="username">from: {i.creator}</span>
                        <span className="username"> {i.pubDate}</span>
                        <div className="footer">
                          <div>
                            <div>
                              <Bookmark></Bookmark> {i.source_priority}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                 </a>
                </Col>
              </>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
              </Spinner>
            </div>
          )}
        </Row>
      </Container>
      <div
        style={{
          width: "100%",
          textAlign: "end",
          paddingRight: "20px",
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination style={{ marginTop: "30px" }}>
          <Pagination.Prev
            href="#top"
            disabled={pages.length > 2 ? false : true}
            onClick={() => getNextPage(pages[pages.length - 3])}
          />
          <Pagination.Next onClick={() => getNextPage(nextPage)} href="#top" />
        </Pagination>
      </div>{" "}
    </div>
  );
};

export default Home;
