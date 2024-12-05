import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/stylenest.svg";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useRef, useState } from "react";
import "../../styles/footer.css";
function Footer() {
  const currentYear = new Date().getFullYear();
  const emailRef = useRef();
  const [showError, setShowError] = useState(false);
  const [subscription, setSubscription] = useState({
    status: "none",
    msg: "",
  });
  async function submitMail(e) {
    e.preventDefault();

    const formElem = new FormData(e.target);
    const email = formElem.get("email");
    console.log(emailRef.current.validity.valid, "value");
    if (!emailRef.current.validity.valid) {
      setShowError(true);

      return;
    }
    setShowError(false);
    try {
      const resp = await fetch(
        "https://www.greatfrontend.com/api/projects/challenges/newsletter",
        {
          method: "POST",
          body: JSON.stringify({ email }),
        }
      );
      if (!resp.ok) throw new Error("Subscription failed");
      const respData = await resp.json();
      setSubscription({
        status: "pass",
        msg: respData.message,
      });
    } catch (e) {
      console.dir(e);
      setSubscription({
        status: "fail",
        msg: e.message,
      });
    } finally {
      setTimeout(() => {
        setSubscription({
          status: "none",
          msg: "",
        });
      }, 15000);
    }
  }
  function invalidMail(e) {
    console.log(e.target.validity, "invalidMail");
    const emailEl = e.target;
    e.preventDefault();
    if (emailEl.validity.typeMismatch) {
      emailEl.setCustomValidity("I am expecting an email address!");
    } else emailEl.setCustomValidity("");
  }
  return (
    <div className="footer">
      {subscription.status === "pass" && (
        <div className="pass-sub">
          <span className="pass-sub-pass-text">Success</span>
          <div> {subscription.msg}</div>
        </div>
      )}
      {subscription.status === "fail" && (
        <div className="fail-sub">
          <span className="fail-sub-fail-text">Fail</span>
          <div> {subscription.msg}</div>
        </div>
      )}
      {/* <div className="footer-mail"> */}
      <div className="email-text">
        <h3>Join our newsletter</h3>
        <div>We’ll send you a nice letter once per week. No spam</div>
      </div>
      <div className="email-form">
        <form onSubmit={submitMail} noValidate>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Enter email"
            aria-label="email"
            required
            autoComplete="email"
            onInput={invalidMail}
            ref={emailRef}
            disabled={subscription.status !== "none"}
          />
          <button disabled={subscription.status !== "none"}>Subscribe</button>
          {showError && <div style={{ color: "red" }}>Invalid Email</div>}
        </form>
      </div>
      {/* </div> */}
      {/* <div className="footer-cat"> */}
      <div className="logo">
        <img src={logo} alt="" />
        <div>
          Craft stunning style journeys that weave more joy into every thread.
        </div>
      </div>
      {/* <div className="footer-cat-child"> */}
      <div className="shop-category">
        <h3>SHOP CATEGORIES</h3>
        <div>Unisex</div>
        <div>Women</div>
        <div>Men</div>
      </div>

      <div className="shop-collection">
        <h3>SHOP COLLECTIONS</h3>
        <div>Latest arrivals</div>
        <div>Urban Oasis</div>
        <div>Cozy Comfort</div>
        <div>Fresh Fusion</div>
      </div>
      {/* </div> */}
      {/* </div> */}

      <hr className="footer-break" />
      {/* <div className="footer-link"> */}
      <div className="copyright-detail">
        © {currentYear} StyleNest, Inc. All rights reserved.
      </div>
      <div className="my-links">
        <a href="https://github.com/sb007ty">
          <FontAwesomeIcon icon={faGithub} />
        </a>

        <a href="https://www.linkedin.com/in/spandan-banerjee-1119b5172/">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>

      {/* </div> */}
    </div>
  );
}

export default Footer;
