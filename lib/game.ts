export type Direction = 'north' | 'south' | 'east' | 'west';
export type Room = {name:string; description:string; x:number; y:number; color:string};
export const rooms: Room[] = [
 {name:'Spiral Stair',description:'Iron steps curl upward through the cool stone tower. A thin ribbon of light leads east to the lantern, while the kitchen waits below to the south.',x:0,y:0,color:'#777058'},
 {name:'Lamp Room',description:'The great glass lens gathers the pale light above the sea. Through salt-streaked windows, you see the rocks below and a horizon that never ends.',x:1,y:0,color:'#aa793a'},
 {name:"Keeper’s Kitchen",description:'A copper kettle rests beside a stove still warm from breakfast. The scent of tea and old timber follows the stairs north into the tower.',x:0,y:1,color:'#936047'},
 {name:'Rocks',description:'Dark rocks rise through the surf at the foot of the lighthouse. Above you the lamp watches the water, and a sheltered path leads west to the keeper’s kitchen.',x:1,y:1,color:'#40676b'}
];
export const offsets:Record<Direction,[number,number]>={north:[0,-1],south:[0,1],west:[-1,0],east:[1,0]};
export function neighbour(room:Room,direction:Direction):Room|undefined {const [dx,dy]=offsets[direction];return rooms.find(r=>r.x===room.x+dx&&r.y===room.y+dy);}
