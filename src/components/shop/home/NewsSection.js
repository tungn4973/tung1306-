import React, { Fragment } from "react";

const NewsSection = () => {
  return (
    <Fragment>
      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}
      >
        <div className="row">
          <div className="blog-outer-container">
            <div
              className="block-title"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  color: "#333",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                TIN TỨC CỬA HÀNG
              </h2>
            </div>
            <div
              className="blog-inner"
              style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
            >
              <div
                className="col-lg-6 col-md-6 col-sm-6"
                style={{ flex: "1", maxWidth: "48%", boxSizing: "border-box" }}
              >
                <div
                  className="entry-thumb image-hover2"
                  style={{
                    overflow: "hidden",
                    borderRadius: "10px",
                    marginBottom: "15px",
                    position: "relative",
                  }}
                >
                  <a href="#">
                    <img
                      alt="Blog"
                      src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/mobile_blog_2_cc74a8477a.jpg"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                      }}
                    />
                  </a>
                </div>
                <div
                  className="blog-preview_info"
                  style={{
                    backgroundColor: "#f9f9f9",
                    padding: "15px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h4 className="blog-preview_title">
                    <a
                      href="#"
                      style={{
                        color: "#333",
                        fontSize: "18px",
                        fontWeight: "bold",
                        textDecoration: "none",
                        display: "block",
                        marginBottom: "10px",
                      }}
                    >
                      Review balo laptop HGFD 13h
                    </a>
                  </h4>
                  <ul
                    className="post-meta"
                    style={{
                      listStyle: "none",
                      padding: "0",
                      margin: "10px 0 15px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    <li style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa fa-user"
                        style={{ marginRight: "5px" }}
                      ></i>
                      được đăng bởi <a href="#">admin</a>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa fa-comments"
                        style={{ marginRight: "5px" }}
                      ></i>
                      <a href="#">8 nhận xét</a>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa fa-clock-o"
                        style={{ marginRight: "5px" }}
                      ></i>
                      <span className="day">12</span>{" "}
                      <span className="tháng">Tháng hai</span>
                    </li>
                  </ul>
                  <div
                    className="blog-preview_desc"
                    style={{
                      color: "#555",
                      lineHeight: "1.6",
                      fontSize: "14px",
                      marginBottom: "15px",
                    }}
                  >
                    Cùng với đó là những chiếc balo laptop nhỏ gọn được khách
                    hàng lựa chọn hàng ngày. Một trong những ưu điểm nổi bật nhất
                    của balo laptop 13 inch là thiết kế nhỏ gọn và thân thiện.
                  </div>
                  <a
                    className="blog-preview_btn"
                    href="#"
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#ff5722",
                      color: "#fff",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    ĐỌC THÊM
                  </a>
                </div>
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-6"
                style={{ flex: "1", maxWidth: "48%", boxSizing: "border-box" }}
              >
                <div
                  className="entry-thumb image-hover2"
                  style={{
                    overflow: "hidden",
                    borderRadius: "10px",
                    marginBottom: "15px",
                    position: "relative",
                  }}
                >
                  <a href="#">
                    <img
                      alt="Blog"
                      src="https://tiki.vn/blog/wp-content/uploads/2023/02/nen-mua-dien-thoai-nao.jpg"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                      }}
                    />
                  </a>
                </div>
                <div
                  className="blog-preview_info"
                  style={{
                    backgroundColor: "#f9f9f9",
                    padding: "15px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h4 className="blog-preview_title">
                    <a
                      href="#"
                      style={{
                        color: "#333",
                        fontSize: "18px",
                        fontWeight: "bold",
                        textDecoration: "none",
                        display: "block",
                        marginBottom: "10px",
                      }}
                    >
                      Nên chọn balo màu gì để PHÙ HỢP dễ phối đồ nhất
                    </a>
                  </h4>
                  <ul
                    className="post-meta"
                    style={{
                      listStyle: "none",
                      padding: "0",
                      margin: "10px 0 15px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    <li style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa fa-user"
                        style={{ marginRight: "5px" }}
                      ></i>
                      được đăng bởi <a href="#">admin</a>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa fa-comments"
                        style={{ marginRight: "5px" }}
                      ></i>
                      <a href="#">4 nhận xét</a>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fa fa-clock-o"
                        style={{ marginRight: "5px" }}
                      ></i>
                      <span className="day">25</span>{" "}
                      <span className="tháng">Tháng 1</span>
                    </li>
                  </ul>
                  <div
                    className="blog-preview_desc"
                    style={{
                      color: "#555",
                      lineHeight: "1.6",
                      fontSize: "14px",
                      marginBottom: "15px",
                    }}
                  >
                    Trong cuộc sống thường ngày, balo gắn một vai trò vô cùng
                    quan trọng. Những mẫu mã và màu sắc của chiếc balo mà bạn sở
                    hữu cũng phản ánh thẩm mỹ và phong cách thời trang.
                  </div>
                  <a
                    className="blog-preview_btn"
                    href="#"
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#ff5722",
                      color: "#fff",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    ĐỌC THÊM
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewsSection;
