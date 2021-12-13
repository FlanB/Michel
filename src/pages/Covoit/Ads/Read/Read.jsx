import "./Read.scss"

import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { fireContext } from "../../../../App"

import Btn from "../../../../components/Btn/Btn"

export default function Read() {
  let { adsId } = useParams()
  const { cookies, days, months } = useContext(fireContext)
  const navigate = useNavigate()
  const [adData, setAdData] = useState({})
  const [date, setDate] = useState({})

  useEffect(() => {
    setAdData(
      cookies.ads.find((ad) => {
        return ad.id === adsId
      })
    )
  }, [adsId, cookies])

  //parse date
  useEffect(() => {
    if (adData.when) {
      setDate({
        date: new Date(adData.when.seconds * 1000),
        duration: new Date(adData.duration * 1000),
        endDate: new Date((adData.when.seconds + adData.duration) * 1000),
      })
    }
  }, [adData])

  return (
    <div className="read">
      <Btn onClick={() => navigate("/covoit")}>Revenir aux trajets</Btn>
      {date ? (
        <>
          <h1>
            {days[date?.date?.getDay()]} {date?.date?.getDate()}{" "}
            {months[date?.date?.getMonth()]}
          </h1>
          <div className="infos">
            <span className="date-start">
              {date?.date?.getHours()}:
              {date?.date?.getMinutes().toString().padStart(2, "0")}
            </span>
            <div className="point point-start"></div>
            <span className="start">{adData.start}</span>
            <span className="duration">
              {date?.duration?.getHours() ? (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" />
                    <path d="M9 4.5V9L12 10.5" />
                  </svg>
                  {date?.duration?.getHours()} h
                  {date?.duration?.getMinutes().toString().padStart(2, "0")}
                </>
              ) : (
                "Trajet"
              )}
            </span>
            <div className="line-container">
              <div className="line" />
            </div>
            <span className="date-finish">
              {date?.duration?.getHours()
                ? date?.endDate?.getHours() +
                  ":" +
                  date?.endDate?.getMinutes().toString().padStart(2, "0")
                : "inconnu"}
            </span>
            <div className="point point-end"></div>
            <span className="finish">{adData.finish}</span>
          </div>
        </>
      ) : (
        <>
          <h1>Voyage Introuvable</h1>
        </>
      )}
    </div>
  )
}
