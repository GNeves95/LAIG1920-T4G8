from http.server import BaseHTTPRequestHandler, HTTPServer
from json import dumps
import socketserver
import http.server
from io import BytesIO

def startSocket(sio):
    print(f'socket at port {8080}')
    sio.serve_forever()

class MyTCPHandler(http.server.SimpleHTTPRequestHandler):
    
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

sio = socketserver.TCPServer(("127.0.0.1",8080), MyTCPHandler)
startSocket(sio)
