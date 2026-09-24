type Direction = 'north' | 'south' | 'east' | 'west';
type Room = {name:string; description:string; x:number; y:number; color:string};
const rooms: Room[] = [
 {name:'Spiral Stair',description:'Iron steps curl upward through the cool stone tower. A thin ribbon of light leads east to the lantern, while the kitchen waits below to the south.',x:0,y:0,color:'#777058'},
 {name:'Lamp Room',description:'The great glass lens gathers the pale light above the sea. Through salt-streaked windows, you see the rocks below and a horizon that never ends.',x:1,y:0,color:'#aa793a'},
 {name:"Keeper’s Kitchen",description:'A copper kettle rests beside a stove still warm from breakfast. The scent of tea and old timber follows the stairs north into the tower.',x:0,y:1,color:'#936047'},
 {name:'Rocks',description:'Dark rocks rise through the surf at the foot of the lighthouse. Above you the lamp watches the water, and a sheltered path leads west to the keeper’s kitchen.',x:1,y:1,color:'#40676b'}
];
const offsets:Record<Direction,[number,number]>={north:[0,-1],south:[0,1],west:[-1,0],east:[1,0]};
let current = rooms[3];
function neighbour(room:Room,direction:Direction):Room|undefined {const [dx,dy]=offsets[direction];return rooms.find(r=>r.x===room.x+dx&&r.y===room.y+dy);}
function render(message=''):void {
 document.getElementById('room-name')!.textContent=current.name;
 document.getElementById('description')!.textContent=current.description;
 document.getElementById('exits')!.textContent='Exits: '+(Object.keys(offsets) as Direction[]).filter(d=>neighbour(current,d)).join(' · ');
 document.getElementById('message')!.textContent=message;
 document.body.style.setProperty('--accent',current.color);
 const map=document.getElementById('map')!;map.replaceChildren();
 rooms.forEach(room=>{const cell=document.createElement('div');cell.className='cell'+(room===current?' active':'');cell.textContent=room.name;if(room===current)cell.setAttribute('aria-current','location');map.append(cell);});
}
function move(direction:Direction):void {const next=neighbour(current,direction);if(next){current=next;render();}else{render(direction==='south'||direction==='east'?'The open sea blocks your way. Stay on the lighthouse paths.':'The outer stone wall blocks your way. Try another direction.');}}
const keys:Record<string,Direction>={ArrowUp:'north',ArrowDown:'south',ArrowLeft:'west',ArrowRight:'east'};
document.addEventListener('keydown',event=>{const direction=keys[event.key];if(direction&&!event.altKey&&!event.ctrlKey&&!event.metaKey){event.preventDefault();move(direction);}});
document.querySelectorAll<HTMLButtonElement>('[data-direction]').forEach(button=>button.addEventListener('click',()=>move(button.dataset.direction as Direction)));
render();
