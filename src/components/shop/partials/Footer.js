import React, { Fragment } from "react";
import moment from "moment";

const Footer = (props) => {
  return (
    <Fragment>
      <footer style={{ backgroundColor: "#333", color: "#fff", padding: "20px 0" }}>
        {/* Newsletter Section */}
        <div
          className="newsletter-wrap"
          style={{
            backgroundColor: "#444",
            padding: "20px 0",
            textAlign: "center",
          }}
        >
          <div className="container">
            <h4 style={{ color: "#ffcc00", marginBottom: "15px" }}>Bản tin</h4>
            <form>
              <input
                type="text"
                placeholder="Nhập địa chỉ email của bạn"
                style={{
                  padding: "10px",
                  width: "60%",
                  marginRight: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ffcc00",
                  border: "none",
                  borderRadius: "5px",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
        {/* Footer Middle Section */}
        <div className="footer-middle" style={{ padding: "30px 0" }}>
          <div className="container">
            <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Column */}
              <div className="footer-column" style={{ width: "23%" }}>
                <h4 style={{ color: "#ffcc00" }}>Hướng dẫn mua sắm</h4>
                <ul style={{ listStyle: "none", padding: "0" }}>
                  <li><a href="blog.html" style={linkStyle}>Blog</a></li>
                  <li><a href="faq.html" style={linkStyle}>Câu hỏi thường gặp</a></li>
                  <li><a href="#" style={linkStyle}>Thanh toán</a></li>
                  <li><a href="#" style={linkStyle}>Chuyến hàng</a></li>
                  <li><a href="#" style={linkStyle}>Đơn hàng của tôi ở đâu?</a></li>
                  <li><a href="#" style={linkStyle}>Chính sách hoàn trả</a></li>
                </ul>
              </div>
              {/* Other Columns */}
              <div className="footer-column" style={{ width: "23%" }}>
                <h4 style={{ color: "#ffcc00" }}>Cố vấn phong cách</h4>
                <ul style={{ listStyle: "none", padding: "0" }}>
                  <li><a href="login.html" style={linkStyle}>Tài khoản của bạn</a></li>
                  <li><a href="#" style={linkStyle}>Thông tin</a></li>
                  <li><a href="#" style={linkStyle}>Địa chỉ</a></li>
                  <li><a href="#" style={linkStyle}>Giảm giá</a></li>
                  <li><a href="#" style={linkStyle}>Lịch sử đơn hàng</a></li>
                  <li><a href="#" style={linkStyle}>Theo dõi đơn hàng</a></li>
                </ul>
              </div>
              <div className="footer-column" style={{ width: "23%" }}>
                <h4 style={{ color: "#ffcc00" }}>Thông tin</h4>
                <ul style={{ listStyle: "none", padding: "0" }}>
                  <li><a href="sitemap.html" style={linkStyle}>Sơ đồ trang web</a></li>
                  <li><a href="#" style={linkStyle}>Cụm từ tìm kiếm</a></li>
                  <li><a href="#" style={linkStyle}>Tìm kiếm nâng cao</a></li>
                  <li><a href="about_us.html" style={linkStyle}>Giới thiệu</a></li>
                  <li><a href="contact_us.html" style={linkStyle}>Liên hệ với chúng tôi</a></li>
                  <li><a href="#" style={linkStyle}>Nhà cung cấp</a></li>
                </ul>
              </div>
              <div className="footer-column" style={{ width: "23%" }}>
                <h4 style={{ color: "#ffcc00" }}>Liên hệ với chúng tôi</h4>
                <address style={{ fontStyle: "normal", marginBottom: "10px" }}>
                  269 Lạc Long Quân, Tây Hồ, Hà Nội
                </address>
                <p style={{ margin: "0 0 5px" }}>📞 +(012) 365-6531</p>
                <p style={{ margin: "0" }}>
                  ✉️ <a href="mailto:abc@magikcommerce.com" style={linkStyle}>abc@magikcommerce.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div
          className="footer-bottom"
          style={{
            backgroundColor: "#222",
            color: "#ccc",
            padding: "10px 0",
            textAlign: "center",
          }}
        >
          <p style={{ margin: "0" }}>
            &copy; {moment().format("YYYY")} Magikc Commerce. Đã đăng ký bản quyền.
          </p>
        </div>
      </footer>
    </Fragment>
  );
};

// Common style for links
const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  display: "block",
  margin: "5px 0",
};

export default Footer;
