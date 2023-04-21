import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setHoraireChaudiere,
  selectHoraireChaudiere,
} from "./HoraireChaudiereSlice";

const HoraireChaudiere = () => {
  const dispatch = useDispatch();
  const currentHoraire = useSelector(selectHoraireChaudiere);
  const [horaire, setHoraire] = useState("");

  const handleSubmit = (e: any) => {
    if (horaire === "") {
      alert("Veuillez entrer un horaire");
      e.preventDefault();
      return;
    }
    e.preventDefault();
    dispatch(setHoraireChaudiere(horaire));
    setHoraire("");
  };

  return (
    <div>
      <h1>Horaire de fonctionnement de la chaudière</h1>
      {currentHoraire.horaire.heureDebut !== 0 ? (
        <div>
          <p>
            Plage horaire actuelle: {currentHoraire.horaire.heureDebut}:
            {currentHoraire.horaire.minuteDebut} -{" "}
            {currentHoraire.horaire.heureFin}:{currentHoraire.horaire.minuteFin}
          </p>
        </div>
      ) : (
        <div>
          <p>
            Aucune plage horaire n'est enregistrée. Veuillez en entrer une dans
            le formulaire ci-dessous.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="horaire">Entrez les plages horaires:</label>
        <input
          type="text"
          id="horaire"
          placeholder="Ex : 18:10-19:30 "
          value={horaire}
          onChange={(event) => setHoraire(event.target.value)}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default HoraireChaudiere;
