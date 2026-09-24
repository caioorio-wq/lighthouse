import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, movePlayer } from '../lib/game.ts';

test('Lamp Room stays locked until the player visits the Kitchen', () => {
  const start = createInitialState();
  const blocked = movePlayer(start, 'north');
  assert.equal(blocked.room.name, 'Rocks');
  assert.equal(blocked.message, 'The lamp room door is locked.');
  const kitchen = movePlayer(blocked, 'west');
  assert.equal(kitchen.room.name, 'Keeper’s Kitchen');
  const rocks = movePlayer(kitchen, 'east');
  assert.equal(rocks.room.name, 'Rocks');
  const unlocked = movePlayer(rocks, 'north');
  assert.equal(unlocked.room.name, 'Lamp Room');
  assert.equal(unlocked.message, '');
});

test('The Spiral Stair entrance also respects the Lamp Room lock', () => {
  const start = createInitialState();
  const stair = { ...start, room: { name: 'Spiral Stair', description: '', x: 0, y: 0, color: '' } };
  const blocked = movePlayer(stair, 'east');
  assert.equal(blocked.room.name, 'Spiral Stair');
  assert.equal(blocked.message, 'The lamp room door is locked.');
});
