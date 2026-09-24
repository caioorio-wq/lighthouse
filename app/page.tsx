"use client";
import { useEffect, useReducer, type CSSProperties } from "react";
import { rooms, offsets, neighbour, createInitialState, movePlayer, type Direction } from "@/lib/game";
const directions = Object.keys(offsets) as Direction[];
const keys: Record<string, Direction> = {ArrowUp:"north",ArrowDown:"south",ArrowLeft:"west",ArrowRight:"east"};
export default function Lighthouse() {
 const [state, dispatch] = useReducer(movePlayer, undefined, createInitialState);
 const current = state.room;
 useEffect(() => {
  const onKey = (event: KeyboardEvent) => {
   const direction = keys[event.key];
   if (direction && !event.altKey && !event.ctrlKey && !event.metaKey) {event.preventDefault();dispatch(direction);}
  };
  document.addEventListener("keydown",onKey);
  return () => document.removeEventListener("keydown",onKey);
 },[]);
 return <main style={{"--accent":current.color} as CSSProperties}><header><span>LIGHTHOUSE</span><span>A TINY ADVENTURE · 01</span></header><div className="scene"><section aria-label="Current room"><svg id="art" viewBox="0 0 500 190" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M190 160L208 48H254L274 160M202 48V32H260V48ZM197 32L231 10L265 32M219 48V32M243 48V32M220 160V130H243V160M223 74H241V91H223ZM50 169Q100 143 150 165T250 168T350 163T460 169M65 184Q115 169 165 184T265 180T365 182T470 180M267 39L450 3M267 45L468 93M135 155L157 135L180 161M285 164L310 143L330 164"/></svg><div className="eyebrow">Somewhere on the coast</div><div aria-live="polite" aria-atomic="true"><h1 id="room-name">{current.name}</h1><p id="description">{current.description}</p><p id="exits">Exits: {directions.filter(d => neighbour(current,d)).join(" · ")}</p><p id="message">{state.message}</p></div></section><aside><div className="eyebrow">Your bearings</div><div className="map" id="map" aria-label="Room map">{rooms.map(room => <div key={room.name} className={"cell" + (room === current ? " active" : "")} aria-current={room === current ? "location" : undefined}>{room.name}</div>)}</div><p className="eyebrow">Explore</p><div className="controls"><span></span><button data-direction="north" onClick={() => dispatch("north")} aria-label="Move north">↑</button><span></span><button data-direction="west" onClick={() => dispatch("west")} aria-label="Move west">←</button><button data-direction="south" onClick={() => dispatch("south")} aria-label="Move south">↓</button><button data-direction="east" onClick={() => dispatch("east")} aria-label="Move east">→</button></div><p style={{fontSize:12,lineHeight:1.6}}>Use your arrow keys<br />or the buttons above.</p></aside></div><footer>Four rooms. A restless sea. Take your time.</footer></main>;
}
