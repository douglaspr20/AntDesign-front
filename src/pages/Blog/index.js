import { SpecialtyItem } from "components";
import React from "react";

import "./style.scss";

const Blog = () => {
  return (
    <div className="blog-page">
      <div className="blog-page-header">
        <div className="bloh-page-title">
          <h1>Test title</h1>
        </div>
        <img
          src={
            "https://cdn.pixabay.com/photo/2022/04/13/01/40/plum-blossoms-7129214_960_720.jpg"
          }
          alt={"cover"}
        />
      </div>

      <div className="blog-page-content">
        <div className="blog-page-categories">
          <SpecialtyItem title={"test"} active={false} />

          <SpecialtyItem title={"test"} active={false} />

          <SpecialtyItem title={"test"} active={false} />
        </div>
        <div>
          <p>
            Repellendus voluptatum nostrum harum quae. Qui nesciunt itaque eaque
            iure. Enim voluptas excepturi fugiat dolores. Qui cumque fugiat.
            Pariatur dolorem voluptatibus. In ut natus delectus. Qui est
            exercitationem sed ab ex. Provident minus cupiditate reprehenderit
            delectus impedit aut tempora quasi eius. A harum alias similique. Ut
            exercitationem quia repellat rem voluptatibus quas. Sint ducimus id.
            Enim eaque cupiditate quo quaerat est assumenda itaque voluptates
            eos. Unde vero nobis repellat explicabo cumque debitis id at.
          </p>

          <p>
            Repellendus voluptatum nostrum harum quae. Qui nesciunt itaque eaque
            iure. Enim voluptas excepturi fugiat dolores. Qui cumque fugiat.
            Pariatur dolorem voluptatibus. In ut natus delectus. Qui est
            exercitationem sed ab ex. Provident minus cupiditate reprehenderit
            delectus impedit aut tempora quasi eius. A harum alias similique. Ut
            exercitationem quia repellat rem voluptatibus quas. Sint ducimus id.
            Enim eaque cupiditate quo quaerat est assumenda itaque voluptates
            eos. Unde vero nobis repellat explicabo cumque debitis id at.
          </p>

          <p>
            Repellendus voluptatum nostrum harum quae. Qui nesciunt itaque eaque
            iure. Enim voluptas excepturi fugiat dolores. Qui cumque fugiat.
            Pariatur dolorem voluptatibus. In ut natus delectus. Qui est
            exercitationem sed ab ex. Provident minus cupiditate reprehenderit
            delectus impedit aut tempora quasi eius. A harum alias similique. Ut
            exercitationem quia repellat rem voluptatibus quas. Sint ducimus id.
            Enim eaque cupiditate quo quaerat est assumenda itaque voluptates
            eos. Unde vero nobis repellat explicabo cumque debitis id at.
          </p>

          <p>
            Repellendus voluptatum nostrum harum quae. Qui nesciunt itaque eaque
            iure. Enim voluptas excepturi fugiat dolores. Qui cumque fugiat.
            Pariatur dolorem voluptatibus. In ut natus delectus. Qui est
            exercitationem sed ab ex. Provident minus cupiditate reprehenderit
            delectus impedit aut tempora quasi eius. A harum alias similique. Ut
            exercitationem quia repellat rem voluptatibus quas. Sint ducimus id.
            Enim eaque cupiditate quo quaerat est assumenda itaque voluptates
            eos. Unde vero nobis repellat explicabo cumque debitis id at.
          </p>
        </div>

        <div className="blog-page-date">Written on February 14, 2022</div>
      </div>
    </div>
  );
};

export default Blog;
