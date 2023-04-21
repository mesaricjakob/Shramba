import stomp
import json

def send_message(action, product=None, product_id=None):
    conn = stomp.Connection([('localhost', 61613)])
    conn.connect('admin', 'admin', wait=True)

    message = {
        "action": action,
        "product": product,
        "product_id": product_id
    }

    conn.send(destination='/queue/ITA', body=json.dumps(message))
    print(f"Sent {action} message to product_queue")
    conn.disconnect()

def run():
    # Create a product
    send_message("create", {
        "id": "507f1f77bcf86cd799439011",
        "naziv": "Mleko",
        "kolicina": "1",
        "enota": "L",
        "lokacija": "Hladilnik"
    })

    # Update a product
    send_message("update", {
        "id": "507f1f77bcf86cd799439011",
        "naziv": "Mleko",
        "kolicina": "2",
        "enota": "L",
        "lokacija": "Hladilnik"
    })

    # Delete a product
    send_message("delete", product_id="507f1f77bcf86cd799439011")

if __name__ == '__main__':
    run()
