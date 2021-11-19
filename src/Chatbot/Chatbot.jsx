import "./Chatbot.scss"
import Textbar from "./Textbar/Textbar"
import Tag from "./Tag/Tag"
import Header from "./Header/Header"

import OpenAI from "openai-api"
const openai = new OpenAI(process.env.REACT_APP_OPENAI_API_KEY)
let msg = `Bonjour, je m’appelle Tac. Vous pouvez me poser des questions sur la maladie Covid-19. Comment puis-je vous aider ?\n\nQ: Le masque est-il obligatoire ?\nA: Oui il est obligatoire dans les lieux non soumis au pass sanitaire\n\nQ: Le covid est t-il un complot ?\nA: Non malheureusement la maladie est bien réel et n'a pas été développé par un quelconque laboratoire`

const date = new Date()

export async function Request() {
  const response = document.createElement("div")
  const content = document.querySelector(".msg-content")
  let inputValue = document.querySelector("input")

  response.innerHTML = inputValue.value
  response.classList.add("me-msg")
  content.appendChild(response)
  inputValue.value = ""

  msg += `\n\nQ: ${response.innerHTML}\nA:`
  console.log(msg)
  const gptResponse = await openai.complete({
    engine: "davinci",
    temperature: 0.9,
    prompt: msg,
    maxTokens: 100,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0.6,
    stop: ["\n", "A:", "Q:"],
  })
  const list = document.createElement("div")
  list.classList.add("bot-msg")
  list.innerHTML = gptResponse.data.choices[0].text
  content.appendChild(list)
  msg += list.innerHTML
  content.scrollTop = content.scrollHeight
}
function Chatbot() {
  return (
    <div className="chatbot" 
    // style={{ transform: "translateY(100%)" }}
    >
      <Header />
      <div className="msg-content">
        <div className="head">
          <span className="date">
            {date.getHours()}:{date.getMinutes().toString().padStart(2, "0")}
          </span>
          <span>
            Parlez avec Tac, <br />
            Le chatbot de l'application TousAntiCovid
          </span>
          <svg
            width="372"
            height="489"
            viewBox="0 0 372 489"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M186 488.21C288.272 488.21 371.18 405.302 371.18 303.03C371.18 200.758 288.272 117.85 186 117.85C83.7279 117.85 0.82 200.758 0.82 303.03C0.82 405.302 83.7279 488.21 186 488.21Z"
              fill="#5870BF"
            />
            <path
              d="M186 84.59C187.35 67.48 177.9 43.48 177.9 43.48"
              stroke="#5870BF"
              strokeWidth="7"
              strokeMiterlimit="10"
            />
            <path
              d="M328.8 222.46C328.8 300.48 265.55 319.91 187.53 319.91C109.51 319.91 46.26 300.48 46.26 222.46C46.26 144.44 109.51 81.2 187.53 81.2C265.55 81.2 328.8 144.44 328.8 222.46Z"
              fill="#D9DBEB"
            />
            <path
              d="M328.14 421.74C294.17 462.37 243.1 488.21 186 488.21C128.9 488.21 77.84 462.37 43.87 421.74C65.84 353.63 121.19 334.46 186 334.46C250.82 334.46 306.17 353.63 328.14 421.74Z"
              fill="#D9DBEB"
            />
            <path
              d="M292.03 197.48C292.03 244.01 245.24 255.6 187.53 255.6C129.82 255.6 83.03 244.01 83.03 197.48C83.03 150.95 129.82 113.23 187.53 113.23C245.24 113.23 292.03 150.95 292.03 197.48Z"
              fill="#5870BF"
            />
            <path
              d="M170.68 49.35C184.172 49.35 195.11 38.4123 195.11 24.92C195.11 11.4277 184.172 0.48999 170.68 0.48999C157.188 0.48999 146.25 11.4277 146.25 24.92C146.25 38.4123 157.188 49.35 170.68 49.35Z"
              fill="#D9DBEB"
            />
            <path
              d="M123.69 181.12C123.69 168.66 133.79 161.57 146.24 161.57C158.7 161.57 168.79 168.67 168.79 181.12"
              stroke="#D9DBEB"
              strokeWidth="7"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M203.97 215.31C203.97 224.39 196.61 229.56 187.53 229.56C178.45 229.56 171.09 224.39 171.09 215.31"
              stroke="#D9DBEB"
              strokeWidth="7"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M208.46 169.84H253.57"
              stroke="#D9DBEB"
              strokeWidth="7"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="bot-msg">
          Bonjour 👋 Je m’appelle Tac, <br /> l’assistant virtuel de l’appli
          TousAntiCovid
        </div>
        <div className="bot-msg">
          Vous pouvez me demander toutes les informations liées aux restrictions
          sanitaires
        </div>
        <div className="bot-msg">
          Vous pouvez cliquer sur les suggestions juste en bas ou alors taper
          directement votre demande
        </div>
        <div className="bot-msg">Comment puis-je vous aider ?</div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          Request()
        }}
      >
        <span className="tags-label">Suggestions de recherche :</span>
        <div className="tags">
          <Tag>Cinéma</Tag>
          <Tag>Restaurant</Tag>
          <Tag>Mariage</Tag>
          <Tag>Théâtre</Tag>
        </div>
        <Textbar />
      </form>
    </div>
  )
}

export default Chatbot
