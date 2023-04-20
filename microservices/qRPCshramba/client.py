import grpc
import product_pb2
import product_pb2_grpc

def run():
    channel = grpc.insecure_channel('localhost:50051')
    stub = product_pb2_grpc.ProductServiceStub(channel)

    # Pridobivanje vseh izdelkov iz baze
    print("Pridobivanje vseh izdelkov:")
    products = stub.GetAllProducts(product_pb2.Empty())
    for product in products.products:
        print(f'izdelek: {product.naziv}, kolicina: {product.kolicina} {product.enota}, lokacija: {product.lokacija}')

    # Dodajanje izdelka v bazo
    print("\nDodajanje izdelka:")
    new_product = product_pb2.Product(naziv="Testni izdelek", kolicina="10", enota="kos", lokacija="Hladilnik")
    product_id = stub.AddProduct(new_product)
    print(f'Dodan izdelek z ID-jem: {product_id.id}')

    # Spreminjanje izdelka v bazi
    print("\nSpreminjanje izdelka:")
    updated_product = product_pb2.Product(id=product_id.id, naziv="Posodobljen izdelek", kolicina="15", enota="kos", lokacija="Skrinja")
    stub.UpdateProduct(updated_product)
    print(f'Izdelek z ID-jem {product_id.id} posodobljen.')

    # Brisanje izdelka iz baze
    print("\nBrisanje izdelka:")
    deleted_product = stub.DeleteProduct(product_pb2.ProductID(id=product_id.id))
    print(f'Izdelek z ID-jem {deleted_product.id} izbrisan.')

if __name__ == '__main__':
    run()
