import React, { useEffect } from "react";
import { useState } from "react";
import { loadAllCategories } from "../services/category-service";
import { ListGroup, ListGroupItem } from "reactstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CategorySideMenu = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading categories !!!");
      });
  }, []);
  return (
    <div>
      <ListGroup>
        <ListGroupItem tag={Link} to="/" action={true} className="border-0">
          All Blogs
        </ListGroupItem>
        {categories &&
          categories.map((category, index) => {
            return (
              <ListGroupItem
                tag={Link}
                to={"/categories/" + category.categoryId}
                className="border-0 shadow-0 mt-1"
                key={index}
                action={true}
              >
                {category.categoryTitle}
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
};

export default CategorySideMenu;
