import { atom, useAtom } from "jotai"
import { useContext } from "react"
import LocaleContext from "./LocaleContext"
import allLocales from "./locale"
// import { useContext } from "react"
// import timeLocale from "./locale/en-US"

export const timeAtom = atom("12:30")
export const rtimeAtom = atom("00:30")
export const styleAtom = atom({
  fontSize: 30,
  width: 80,
  textAlign: "center",
})

function calculateDepartureTime(arrivalTime, advanceTime) {
  if (arrivalTime && advanceTime) {
    const [arrivalHour, arrivalMinute] = arrivalTime.split(":")
    const [advanceHour, advanceMinute] = advanceTime.split(":")

    let departureHour = parseInt(arrivalHour, 10)
    let departureMinute = parseInt(arrivalMinute, 10)

    departureHour -= parseInt(advanceHour, 10)
    departureMinute -= parseInt(advanceMinute, 10)

    if (departureMinute < 0) {
      departureHour -= 1
      departureMinute += 60
    }

    const formattedDepartureTime = `${departureHour.toString().padStart(2, "0")}:${departureMinute
      .toString()
      .padStart(2, "0")}`
    return formattedDepartureTime
  } else {
    return "00:00"
  }
}

export function App1() {
  const localeContext = useContext(LocaleContext)
  const timeLocale = allLocales[localeContext.locale]
  const [time, setTime] = useAtom(timeAtom)
  const [style] = useAtom(styleAtom)

  return (
    <h1>
      {timeLocale.arrivalTime}
      <input
        style={style}
        value={time}
        onChange={(e) => setTime(e.target.value)}></input>
    </h1>
  )
}

export function Bpp() {
  const localeContext = useContext(LocaleContext)
  const timeLocale = allLocales[localeContext.locale]
  const [rtime, setRtime] = useAtom(rtimeAtom)
  const [style] = useAtom(styleAtom)
  return (
    <h1>
      {timeLocale.advanceTime}
      <input
        style={style}
        value={rtime}
        onChange={(e) => setRtime(e.target.value)}></input>
    </h1>
  )
}

export function Cpp() {
  const localeContext = useContext(LocaleContext)
  const timeLocale = allLocales[localeContext.locale]
  const [time] = useAtom(timeAtom)
  const [rtime] = useAtom(rtimeAtom)
  return (
    <h1>
      {timeLocale.departureTime}
      {calculateDepartureTime(time, rtime)}
    </h1>
  )
}
