#!/usr/bin/env python

#A websocket server that manages the positions of a circle and a square, and
# also tracks currently connected users.

import asyncio
import json
import logging
import websockets

logging.basicConfig()

SQUARE = {"XPosition": 0, "YPosition":0}
CIRCLE = {"XPosition": 0, "YPosition":0}
LINES  = {"X1" : 0, "Y1" : 0, "X2" : 0, "Y2" : 0}

USERS = set()

def draw_lines(): #The ** operator unpacts LINES into key-value pairs
    return json.dumps({"type": "lines", **LINES})

def users_event():
    return json.dumps({"type": "users", "count": len(USERS)})

async def notify_lines():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = draw_lines()
        await asyncio.wait([user.send(message) for user in USERS])

async def notify_users():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = users_event()
        await asyncio.wait([user.send(message) for user in USERS])


async def register(websocket):
    USERS.add(websocket)
    await notify_users()

async def unregister(websocket):
    USERS.remove(websocket)
    await notify_users()


async def counter(websocket, path):
    # register(websocket) sends user_event() to websocket
    await register(websocket)
    try:
        await websocket.send(draw_lines())
        async for message in websocket:
            data = json.loads(message)
            print("message action is",data["action"]);
            if data["action"] == "mouseDown":
                LINES["X1"] = data["XPosition"]
                LINES["Y1"] = data["YPosition"]
            elif data["action"] == "mouseUp":
                LINES["X2"] = data["XPosition"]
                LINES["Y2"] = data["YPosition"]
                await notify_lines()
            else:
                logging.error("unsupported event: {}", data)
    finally:
        await unregister(websocket)


start_server = websockets.serve(counter, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()