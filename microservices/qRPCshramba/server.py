import grpc
import certifi
from concurrent import futures
import time
import pymongo
from bson.objectid import ObjectId
import json
import pika
import threading
import stomp

import product_pb2
import product_pb2_grpc

# Connection to MongoDB
mongo_uri = "mongodb+srv://jakobm:mYftim-fisdyt-0mursa@cluster0.qfbtnuv.mongodb.net/database?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE"
client = pymongo.MongoClient(mongo_uri, tlsCAFile=certifi.where())
db = client["ITA"]
collection = db["Izdelki"]

class ProductService(product_pb2_grpc.ProductServiceServicer):
    def GetAllProducts(self, request, context):
        products = collection.find({})
        product_list = []
        for product in products:
            product_list.append(product_pb2.Product(
                id=str(product["_id"]),
                naziv=product["naziv"],
                kolicina=product["kolicina"],
                enota=product["enota"],
                lokacija=product["lokacija"]
            ))
        return product_pb2.ProductList(products=product_list)

    def AddProduct(self, request, context):
        new_product = {
            "naziv": request.naziv,
            "kolicina": request.kolicina,
            "enota": request.enota,
            "lokacija": request.lokacija,
        }
        result = collection.insert_one(new_product)
        return product_pb2.ProductID(id=str(result.inserted_id))

    def UpdateProduct(self, request, context):
        product_data = {
            "naziv": request.naziv,
            "kolicina": request.kolicina,
            "enota": request.enota,
            "lokacija": request.lokacija,
        }
        collection.update_one({"_id": ObjectId(request.id)}, {"$set": product_data})
        return request

    def DeleteProduct(self, request, context):
        result = collection.find_one_and_delete({"_id": ObjectId(request.id)})
        if result:
            return product_pb2.Product(
                id=str(result["_id"]),
                naziv=result["naziv"],
                kolicina=result["kolicina"],
                enota=result["enota"],
                lokacija=result["lokacija"]
            )
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(f'Izdelek z ID-jem {request.id} ni bil najden.')
            return product_pb2.Product()

def handle_message(headers, message):
    message_data = json.loads(message)
    # Your code to handle the message_data

class MyListener(stomp.ConnectionListener):
    def __init__(self, message_handler):
        super().__init__()
        self.message_handler = message_handler

    def on_error(self, headers, message):
        print('Received an error "%s"' % message)

    def on_message(self, frame):
        headers = frame.headers
        message = frame.body
        print('Received a message "%s"' % message)
        self.message_handler(headers, message)

def listen_for_messages():
    def message_handler(headers, message):
        print(f'Handling message: {message}')

    conn = stomp.Connection([('localhost', 61613)])
    conn.set_listener('', MyListener(message_handler))
    conn.connect('admin', 'admin', wait=True)
    conn.subscribe(destination='/queue/ITA', id=1, ack='auto')

    while True:
        time.sleep(1)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    product_pb2_grpc.add_ProductServiceServicer_to_server(ProductService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("gRPC server is running on port 50051")

    message_listener_thread = threading.Thread(target=listen_for_messages)
    message_listener_thread.start()

    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    serve()

