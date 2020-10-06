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
LINE   = {"X1Position": 0, "Y1Position":0, "X2Position": 0, "Y2Position":0}

USERS = set()


def square_event(): #The ** operator unpacks SQUARE into key-value pairs
    return json.dumps({"type": "square", **SQUARE})

def circle_event(): #The ** operator unpacts CIRCLE into key-value pairs
    return json.dumps({"type": "circle", **CIRCLE})

def line_up_event():
    return json.dumps({"type": "line", **LINE})

def line_down_event():
    return json.dumps({"type": "line", **LINE})

def users_event():
    return json.dumps({"type": "users", "count": len(USERS)})


async def notify_square():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = square_event()
        await asyncio.wait([user.send(message) for user in USERS])

async def notify_circle():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = circle_event()
        await asyncio.wait([user.send(message) for user in USERS])
        
async def notify_up_line():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = line_up_event()
        await asyncio.wait([user.send(message) for user in USERS])
        
async def notify_down_line():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = line_down_event()
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
        await websocket.send(square_event())
        await websocket.send(circle_event())
        await websocket.send(line_up_event())
        await websocket.send(line_down_event())
        
        async for message in websocket:
            data = json.loads(message)
            print("message action is",data["action"]);
            
            if data["action"] == "square":
                SQUARE["XPosition"] = data["XPosition"]
                SQUARE["YPosition"] = data["YPosition"]
                await notify_square()
            elif data["action"] == "circle":
                CIRCLE["XPosition"] = data["XPosition"]
                CIRCLE["YPosition"] = data["YPosition"]
                await notify_circle()
            elif data["action"] == "line_down":
                LINE["X1Position"] = data["X1Position"]
                LINE["Y1Position"] = data["Y1Position"]
                print(data['X1Position'])
                await notify_down_line()
            elif data["action"] == "line_up":
                LINE["X2Position"] = data["X2Position"]
                LINE["Y2Position"] = data["Y2Position"]
                await notify_up_line()    
                print(data['X2Position'])
                
                
                
            else:
                logging.error("unsupported event: {}", data)
    finally:
        await unregister(websocket)


start_server = websockets.serve(counter, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()