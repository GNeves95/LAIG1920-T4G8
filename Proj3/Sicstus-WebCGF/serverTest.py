"""from aiohttp import web
import socketio
import sys

sio = socketio.AsyncServer()

app = web.Application()

sio.attach(app)

async def index(request):
    with open('index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

@sio.on('message')
async def print_message(sid, message):
    print("Socket ID: " , sid)
    print(message)
    if message == "quit":
        try:
            await sio.emit("message", "Goodbye")
            sys.exit()
        except Exception as e:
            print(f'ExceptionMessage: {e}')
    else:
        await sio.emit("message", message)

app.router.add_get('/', index)

if __name__ == '__main__':
    web.run_app(app)"""

#!/usr/bin/env python3

from http.server import BaseHTTPRequestHandler, HTTPServer
from json import dumps
import socketserver
import http.server
import socketio
import websockets
import threading
from io import BytesIO

def startHttpServer(handler):
    with socketserver.TCPServer(("127.0.0.1",8000), handler) as httpd:
        print(f'serving at port {8000}')
        httpd.serve_forever()

def startSocket(sio):
    print(f'socket at port {8081}')
    sio.serve_forever()

class MyTCPHandler(http.server.SimpleHTTPRequestHandler):

    '''def handle(self):
        self.data = self.request.recv(1024)
        print(f'{self.client_address} wrote {self.data}')
        self.request.sendall(self.data)'''

    '''def do_GET(self):
        print(f'{self.path}')'''
    
    def do_POST(self):
        message = self.path.split('/')
        print(f'{message[1]}')
        self.send_response(200)
        self.end_headers()
        response = BytesIO()
        response.write(b'')
        response.write(b'')
        response.write(message[1].encode())
        self.wfile.write(response.getvalue())

    

handler = http.server.SimpleHTTPRequestHandler

sio = socketserver.TCPServer(("127.0.0.1",8081), MyTCPHandler)

'''    print(f'socket at port {8081}')
    sio.serve_forever()
'''

x1 = threading.Thread(target=startHttpServer, args=(handler,))
x2 = threading.Thread(target=startSocket, args=(sio,))

x1.start()
x2.start()



'''print("Starting server")
httpd = HTTPServer(("127.0.0.1", 8000), BaseHTTPRequestHandler)
print("Hosting server on port 8000")
httpd.serve_forever()'''
