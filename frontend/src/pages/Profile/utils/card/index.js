import React from "react";
import "./styles.css";

import parse from "html-react-parser";
import Stars from "../stars/stars";

import * as _ from "lodash";
import { FaIndustry, FaRegHandshake } from "react-icons/fa";
import { AiTwotoneGold } from "react-icons/ai";
import ContactDialog from "../contact-dialog";

const stringSimilarity = require("string-similarity");

export default function Card({ profile, searchTerm }) {
  const {
    name,
    isProducer,
    isProvider,
    email,
    materials,
    contact,
    phone,
    cidade,
    uf,
  } = profile;

  const generateSpotlightText = (textFromProfile) => {
    let finalTextToJoin = (textFromProfile || "")
      .split(" ")
      .map((wordFromProfile, i) => {
        if (wordFromProfile !== "") {
          let tChanged = wordFromProfile;
          searchTerm.split(" ").every((wordFromSearch) => {
            const x = stringSimilarity.compareTwoStrings(
              wordFromProfile.toLowerCase(),
              wordFromSearch.toLowerCase()
            );
            if (x > 0.8) {
              tChanged = `<span class="spotlight">${wordFromProfile}</span>`;
              return false;
            }
            return true;
          });
          return tChanged;
        }
      });
    return parse(finalTextToJoin.join(" "));
  };

  return (
    <li>
      <div className="card-title">
        <strong>{_.truncate(name, { length: 57 })}</strong>
        {isProvider ? <AiTwotoneGold size={23} color="#000" /> : null}
        {isProducer ? <FaIndustry size={23} color="#000" /> : null}
      </div>
      <div className="card-content">
        <div className="company-info">
          <p>{email}</p>
          {materials.map((m, j) =>
            j < 3 ? (
              <span key={j}>
                {generateSpotlightText(_.upperFirst(_.toLower(m.name)))}
                <br />
              </span>
            ) : null
          )}
          {materials.length > 3 ? (
            <a href="#">E mais outros {materials.length - 3}!</a>
          ) : null}
          <p>{contact}</p>
        </div>
        <ContactDialog
          profileToId={profile._id}
          name={name}
          email={email}
          phone={phone}
        ></ContactDialog>
      </div>

      <div className={"profile-container-botton-info "}>
        <p>
          {generateSpotlightText(_.startCase(_.toLower(cidade)))} -
          {generateSpotlightText(uf)}
        </p>
      </div>
      <Stars></Stars>
    </li>
  );
}
