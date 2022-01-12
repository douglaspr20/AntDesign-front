import { Affix, Avatar } from "antd";
import moment from "moment";
import React from "react";
import Conversation from "./Conversation";
import FormMessage from "./FormMessage";

import "./style.scss";

const Chat = () => {
  return (
    <Affix
      offsetBottom={50}
      style={{
        position: "absolute",
        left: "75%",
        bottom: "-150%",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          width: "500px",
          height: "400px",
          borderRadius: "10px 10px 0px 0px",
          border: "1px solid #f5f5f8",
          boxShadow: "0px 0px 3px #f5f5f8",
          display: "flex",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRight: "1px solid #e1e2ee",
            maxHeight: "100%",
            overflowY: "scroll",
            maxWidth: "35%",
          }}
        >
          <Conversation
            user={{
              firstName: "Douglas",
              lastName: "Perez",
              img: "https://joeschmoe.io/api/v1/random",
            }}
          />
          <Conversation
            user={{
              firstName: "Eduardo",
              lastName: "Rivas",
              img: "https://joeschmoe.io/api/v1/random",
            }}
          />
          <Conversation
            user={{
              firstName: "Eduardo",
              lastName: "Rivas",
              img: "https://joeschmoe.io/api/v1/random",
            }}
          />
          <Conversation
            user={{
              firstName: "Eduardo",
              lastName: "Rivas",
              img: "https://joeschmoe.io/api/v1/random",
            }}
          />
          <Conversation
            user={{
              firstName: "Eduardo",
              lastName: "Rivas",
              img: "https://joeschmoe.io/api/v1/random",
            }}
          />
          <Conversation
            user={{
              firstName: "Eduardo",
              lastName: "Rivas",
              img: "https://joeschmoe.io/api/v1/random",
            }}
          />
        </div>

        <div style={{ width: "65%", position: "relative" }}>
          <div style={{ textAlign: "center", padding: "10px" }}>
            <p
              style={{
                fontSize: ".8rem",
                color: "#697077",
                letterSpacing: "0",
              }}
            >
              {moment().format("MMM DD YYYY hh:mm")}
            </p>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  background: "#f5f5f8",
                  padding: "5px",
                  marginLeft: "5px",
                  maxWidth: "250px",
                  borderRadius: "5px 5px 0px 0px",
                }}
              >
                <p
                  style={{
                    textAlign: "left",
                    fontSize: ".8rem",
                    letterSpacing: "0",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque eu vehicula justo. Donec tristique tortor non nisl
                  congue, non ornare dolor porta.
                </p>
              </div>
              <Avatar
                src="https://joeschmoe.io/api/v1/random"
                alt="Eduardo Rivas"
                size={25}
                style={{ marginTop: "10px" }}
              />
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  background: "#fe5621",
                  color: "#fff",
                  padding: "5px",
                  marginLeft: "auto",
                  marginRight: "10px",
                  maxWidth: "250px",
                  borderRadius: "5px 5px 0px 0px",
                }}
              >
                <p
                  style={{
                    textAlign: "left",
                    fontSize: ".8rem",
                    letterSpacing: "0",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque eu vehicula justo.
                </p>
              </div>
              <Avatar
                src="https://joeschmoe.io/api/v1/random"
                alt="Eduardo Rivas"
                size={25}
                style={{ marginTop: "10px" }}
              />
            </div>
          </div>
          <FormMessage />
        </div>
      </div>
    </Affix>
  );
};

export default Chat;
