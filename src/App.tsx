import { useState, useEffect, useRef } from 'react'
import './App.css'

interface IEventItem {
  name: string
  touches: TouchList
  tag: 'A' | 'B' | 'C'
}

const maxTouchPoints = navigator.maxTouchPoints

function App() {
  const [events, setEvents] = useState<IEventItem[]>([])
  const refA = useRef<HTMLDivElement>(null)
  const refB = useRef<HTMLDivElement>(null)
  const refC = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    refA.current?.addEventListener('touchstart', (e) => {
      console.log(e)
      setEvents((events) => [
        {
          name: e.type,
          touches: e.touches,
          tag: (e.target as Element)?.getAttribute('data-value') as 'A' | 'B' | 'C'
        },
        ...events 
      ])
    })
  }, [])
  
  return (
    <div className='container'>
      <div>Max touch points: {maxTouchPoints}</div>
      <div className='touch-area'>
        <div className='area a' data-value='A' ref={refA}>
          A
          <div className='area b' data-value='B' ref={refB}>
            B
            <div className='area c' data-value='C' ref={refC}>C</div>
          </div>
        </div>
      </div>
      <div className='events-list'>
        <table border={1}>
          <thead>
            <tr>
              <th colSpan={3}></th>
              <th colSpan={3}>Target</th>
              <th colSpan={99}>TouchList</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Event Type</th>
              <th>Count</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              
              <th>screenX</th>
              <th>screenY</th>
              <th>clientX</th>
              <th>clientY</th>
              
              <th>screenX</th>
              <th>screenY</th>
              <th>clientX</th>
              <th>clientY</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className='event'>
                <td>{index}</td>
                <td>{event.name}</td>
                <td>0</td>
                <td><span className='target-color' style={{backgroundColor: event.tag === 'A' ? 'rgb(6, 250, 250)' : ''}}></span></td>
                <td><span className='target-color' style={{backgroundColor: event.tag === 'B' ? 'rgb(141, 45, 231)' : ''}}></span></td>
                <td><span className='target-color' style={{backgroundColor: event.tag === 'C' ? 'rgb(238, 130, 238)' : ''}}></span></td>
                {
                  Array.from(event.touches).map((touch, index) => (
                    <>
                      <td>
                        {touch.screenX}
                      </td>
                      <td>
                        {touch.screenY}
                      </td>
                      <td>
                        {touch.clientX}
                      </td>
                      <td>
                        {touch.clientY}
                      </td>
                    </>
                  ))
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
