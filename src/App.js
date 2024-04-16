import { atom, useAtom } from "jotai"

const timeAtom = atom("12:30")
const rtimeAtom = atom("00:30")
const styleAtom = atom({
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

function Bpp() {
  const [rtime, setRtime] = useAtom(rtimeAtom)
  const [style] = useAtom(styleAtom)
  return (
    <h1>
      提前多少分钟：
      <input
        style={style}
        value={rtime}
        onChange={(e) => setRtime(e.target.value)}></input>
    </h1>
  )
}

function Cpp() {
  const [time] = useAtom(timeAtom)
  const [rtime] = useAtom(rtimeAtom)
  return <h1>出发时间：{calculateDepartureTime(time, rtime)}</h1>
}

function App() {
  const [time, setTime] = useAtom(timeAtom)
  const [style] = useAtom(styleAtom)
  return (
    <div>
      <h1>
        到达时间：
        <input
          style={style}
          value={time}
          onChange={(e) => setTime(e.target.value)}></input>
      </h1>
      <Bpp></Bpp>
      <Cpp></Cpp>
    </div>
  )
}
export default App
