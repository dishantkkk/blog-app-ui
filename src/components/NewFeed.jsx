import React, { useState } from "react";
import { useEffect } from "react";
import { loadAllPosts } from "../services/post-service";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

const NewFeed = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 3) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });
        window.scroll(0, 0);
      })
      .catch((error) => {
        toast.error("Error in loading post !!!");
      });
  };

  const changePageInfinite = () => {
    console.log("page changed");
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 12,
          }}
        >
          <h1>Total Blogs: {postContent?.totalElements}</h1>

          <InfiniteScroll
            dataLength={postContent.content.length}
            next={changePageInfinite}
            hasMore={!postContent.lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {postContent.content.map((post, index) => (
              <Post post={post} key={index} />
            ))}
          </InfiniteScroll>

          {/* <Container className='mt-3'>
                <Pagination>
                    <PaginationItem>
                        <PaginationLink onClick={()=>changePage(0)} disabled={postContent.pageNumber === 0} first>
                            First
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber === 0} previous>
                            Previous
                        </PaginationLink>
                    </PaginationItem>
                    
                        {
                            [...Array(postContent.totalPages)].map((item, index) => (
                                <PaginationItem active={index===postContent.pageNumber} key={index}>
                                <PaginationLink onClick={()=> changePage(index)}>{index+1}</PaginationLink>
                                </PaginationItem>
                            ))
                        }
                    <PaginationItem >
                        <PaginationLink onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage} next>
                            Next
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={()=>changePage(postContent.totalPages-1)} disabled={postContent.lastPage} last>
                            Last
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </Container> */}
        </Col>
      </Row>
    </div>
  );
};

export default NewFeed;
