import Behance from "../../assets/behance.svg";
import Dribble from "../../assets/dribble.svg";
import Facebook from "../../assets/facebook.svg";
import Instagram from "../../assets/instagram.svg";
import Twitter from "../../assets/teitter.svg";
import React, { Component } from "react";
import AppLink from "../AppLink/AppLink";
import Logo from "../../assets/logo.svg";
import AppTitle3 from "../AppTitle/AppTitle3";

export default class AppFooter extends Component {
  socialLinksList = [
    {
      link: "",
      icon: Behance,
    },
    {
      link: "",
      icon: Dribble,
    },
    {
      link: "",
      icon: Twitter,
    },
    {
      link: "",
      icon: Instagram,
    },
    {
      link: "",
      icon: Facebook,
    },
  ];

  render() {
    return (
      <footer className="container app_footer_1">
        <div className="app_footer_bottom">
          <AppLink to="#">
            <img
              src={Logo}
              alt=""
              className="app_image_icon_1"
              style={{ width: "200px" }}
            />
          </AppLink>

          <AppTitle3
            text="For Support : mftbc_information_security@mitsubishi-fuso.com | Privacy Policy"
            otherClassNames="mb-0"
            customStyles={{ wordBreak: "break-all" }}
          />

          <div className="social_icons">
            {this.socialLinksList.map((value, index) => (
              <AppLink
                otherClassNames={`d-inline ${index >= 1 ? "ms-3" : ""}`}
                key={index}
                href={value.link}
              >
                <img src={value.icon} alt="" />
              </AppLink>
            ))}
          </div>
        </div>
      </footer>
    );
  }
}
