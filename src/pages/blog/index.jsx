import Container from "@/components/Container";
import BlogCard from "@/components/blog/BlogCard";
import React from "react";

const index = () => {
  return (
    <Container className="col-lg-10 my-3">
      <h1>Blog</h1>
      <Container className="col-lg-8 d-flex flex-wrap mt-3">
        <BlogCard
          date={"10 Dec 2024"}
          title={"Hello World"}
          description={
            "aajlawlfkwjkalfjkawfjklawjklfjaklwfjklawkjlfawjklfajklwfjklawfjklawjklkwjdakjwldklaklwdkalwdklalalalal"
          }
        />
        <BlogCard
          date={"10 Dec 2024"}
          title={"Hello World"}
          description={"akwjdakjwldklaklwdkalwdklalalalal"}
        />
        <BlogCard
          date={"10 Dec 2024"}
          title={"Hello World"}
          description={"akwjdakjwldklaklwdkalwdklalalalal"}
        />
        <BlogCard
          date={"10 Dec 2024"}
          title={"Hello World"}
          description={"akwjdakjwldklaklwdkalwdklalalalal"}
        />
        <BlogCard
          date={"10 Dec 2024"}
          title={"Hello World"}
          description={"akwjdakjwldklaklwdkalwdklalalalal"}
        />
        <BlogCard
          date={"10 Dec 2024"}
          title={"Hello World"}
          description={"akwjdakjwldklaklwdkalwdklalalalal"}
        />
      </Container>
    </Container>
  );
};

export default index;
