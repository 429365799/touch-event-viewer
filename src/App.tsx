import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

interface IEventItem {
  name: string
  touches: TouchList
  tag: 'A' | 'B' | 'C'
  count: number
}

const maxTouchPoints = navigator.maxTouchPoints

function App() {
  const [events, setEvents] = useState<IEventItem[]>([])
  const refA = useRef<HTMLDivElement>(null)
  const refB = useRef<HTMLDivElement>(null)
  const refC = useRef<HTMLDivElement>(null)
  
  const addEvent = useCallback((item: IEventItem) => {
    const first = events[0]
    if (first && first.tag === item.tag && first.name === item.name) {
      setEvents((events) => [
        {
          ...item,
          count: first.count + 1,
        },
        ...events.slice(1),
      ])
    } else {
      setEvents((events) => [
        item,
        ...events 
      ]) 
    }
  }, [events])
  
  useEffect(() => {
    if (!refA.current || !refB.current || !refC.current) {
      return () => {}
    }
    
    const handleTouchEvent = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      console.log(e)
      addEvent({
        name: e.type,
        touches: e.touches,
        tag: (e.target as Element)?.getAttribute('data-value') as 'A' | 'B' | 'C',
        count: 0,
      })
      
      return false
    }
    
    const doms = [refA.current, refB.current, refC.current]
    
    doms.forEach(dom => {
      dom.addEventListener('touchstart', handleTouchEvent)
      dom.addEventListener('touchmove', handleTouchEvent)
      dom.addEventListener('touchend', handleTouchEvent)
    })
    
    return () => {
      doms.forEach(dom => {
        dom.removeEventListener('touchstart', handleTouchEvent)
        dom.removeEventListener('touchmove', handleTouchEvent)
        dom.removeEventListener('touchend', handleTouchEvent)
      })
    }
  }, [addEvent])
  
  return (
    <div className='container'>
      <div>该设备允许最多同时触控点: {maxTouchPoints}个</div>
      <div className='touch-area'>
        <div className='area a' data-value='A' ref={refA}>
          {/* A */}
          <div className='area b' data-value='B' ref={refB}>
            {/* B */}
            <div className='area c' data-value='C' ref={refC}>
              {/* C */}
            </div>
          </div>
        </div>
      </div>
      <div className='events-list'>
        <button onClick={() => setEvents([])}>清空表格</button>
        <table border={1}>
          <thead>
            <tr>
              <th colSpan={3}></th>
              <th colSpan={3}>Target</th>
              
              {Array.from({length: maxTouchPoints}).map((_, index) => (
                <>
                  <th colSpan={7}>Touch {index + 1}</th>
                </>
              ))}
            </tr>
            <tr>
              <th>#</th>
              <th>Event Type</th>
              <th>Count</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              
              {Array.from({length: maxTouchPoints}).map(() => (
                <>
                  <th>screenX</th>
                  <th>screenY</th>
                  <th>clientX</th>
                  <th>clientY</th>
                  <th>rotationAngle</th>
                  <th>radiusX</th>
                  <th>radiusY</th>
                </>
              ))}
              
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className='event'>
                <td>{index}</td>
                <td>{event.name}</td>
                <td>{event.count || ''}</td>
                <td><span className='target-color' style={{backgroundColor: event.tag === 'A' ? 'rgb(6, 250, 250)' : ''}}></span></td>
                <td><span className='target-color' style={{backgroundColor: event.tag === 'B' ? 'rgb(141, 45, 231)' : ''}}></span></td>
                <td><span className='target-color' style={{backgroundColor: event.tag === 'C' ? 'rgb(238, 130, 238)' : ''}}></span></td>
                {
                  Array.from(event.touches).map((touch) => (
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
                      <td>
                        {touch.rotationAngle}
                      </td>
                      <td>
                        {touch.radiusX}
                      </td>
                      <td>
                        {touch.radiusY}
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
