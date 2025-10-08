from sqlalchemy.orm import Session
from datetime import date
from database import SessionLocal, engine, Base
import models

# Drop and recreate all tables (for clean seeding)
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

def seed_data():
    db: Session = SessionLocal()

    # Clear existing data (optional, for clean seeding)
    db.query(models.OrderItem).delete()
    db.query(models.Order).delete()
    db.query(models.Cart).delete()
    db.query(models.Review).delete()
    db.query(models.PriceAndStock).delete()
    db.query(models.Product).delete()
    db.query(models.User).delete()
    db.commit()

    # -------------------
    # USERS
    # -------------------
    users = [
        models.User(
            username="hassan",
            email="hassan@example.com",
            name="Hassan Imran",
            hashed_password="hashed_pw_1",
            disabled=False,
        ),
        models.User(
            username="nayab",
            email="nayab@example.com",
            name="Nayab Irfan",
            hashed_password="hashed_pw_2",
            disabled=False,
        ),
        models.User(
            username="ahmad",
            email="ahmad@example.com",
            name="Muhammad Ahmad",
            hashed_password="hashed_pw_3",
            disabled=False,
        ),
    ]
    db.add_all(users)
    db.commit()

    # -------------------
    # PRODUCTS
    # -------------------
    products = [
        models.Product(
            id="eid-1",
            name="Eid Bloom Kurta",
            image="https://i.postimg.cc/example1.jpg",
            images=[
                "https://i.postimg.cc/example1a.jpg",
                "https://i.postimg.cc/example1b.jpg"
            ],
            collection="Eid Collection",
        ),
        models.Product(
            id="eid-2",
            name="Festive Grace Kurti",
            image="https://i.postimg.cc/example2.jpg",
            images=[
                "https://i.postimg.cc/example2a.jpg",
                "https://i.postimg.cc/example2b.jpg"
            ],
            collection="Eid Collection",
        ),
        models.Product(
            id="ind-1",
            name="Azadi Kurta Green",
            image="https://i.postimg.cc/example3.jpg",
            images=[
                "https://i.postimg.cc/example3a.jpg",
                "https://i.postimg.cc/example3b.jpg"
            ],
            collection="14 August Independence Collection",
        ),
    ]
    db.add_all(products)
    db.commit()

    # -------------------
    # PRICE AND STOCK
    # -------------------
    price_stocks = [
        models.PriceAndStock(
            S_price=2000, M_price=2200, L_price=2400,
            S_stock=10, M_stock=15, L_stock=5,
            kids=False, product_id="eid-1"
        ),
        models.PriceAndStock(
            S_price=2500, M_price=2700, L_price=3000,
            S_stock=20, M_stock=18, L_stock=8,
            kids=False, product_id="eid-2"
        ),
        models.PriceAndStock(
            S_price=1800, M_price=2000, L_price=2200,
            S_stock=25, M_stock=30, L_stock=10,
            kids=True, product_id="ind-1"
        ),
    ]
    db.add_all(price_stocks)
    db.commit()

    # -------------------
    # REVIEWS
    # -------------------
    reviews = [
        models.Review(
            stars=4.5,
            time=date.today(),
            user_id=1,
            product_id="eid-1"
        ),
        models.Review(
            stars=5.0,
            time=date.today(),
            text="Absolutely loved the design and quality!",
            user_id=2,
            product_id="eid-1"
        ),
        models.Review(
            stars=3.5,
            time=date.today(),
            user_id=3,
            product_id="eid-2"
        ),
        models.Review(
            stars=4.0,
            time=date.today(),
            user_id=1,
            product_id="ind-1"
        ),
    ]
    db.add_all(reviews)
    db.commit()

    # -------------------
    # CARTS
    # -------------------
    carts = [
        models.Cart(user_id=1, product_id="eid-1", size="M", quantity=1),
        models.Cart(user_id=1, product_id="eid-2", size="S", quantity=2),  # Additional product for hassan
        models.Cart(user_id=1, product_id="ind-1", size="L", quantity=1),  # Additional product for hassan
        models.Cart(user_id=2, product_id="eid-2", size="L", quantity=3),
        models.Cart(user_id=3, product_id="ind-1", size="S", quantity=1),
    ]
    db.add_all(carts)
    db.commit()

    # -------------------
    # ORDERS
    # -------------------
    orders = [
        models.Order(
            status="Delivered",
            time=date.today(),
            user_id=1
        ),
        models.Order(
            status="Processing",
            time=date.today(),
            user_id=2
        ),
    ]
    db.add_all(orders)
    db.commit()

    # -------------------
    # ORDER ITEMS
    # -------------------
    order_items = [
        models.OrderItem(
            order_id=1,
            product_id="eid-1",
            size="M",
            quantity=1
        ),
        models.OrderItem(
            order_id=2,
            product_id="eid-2",
            size="L",
            quantity=2
        ),
        models.OrderItem(
            order_id=2,
            product_id="ind-1",
            size="S",
            quantity=1
        ),
    ]
    db.add_all(order_items)
    db.commit()

    db.close()
    print("✅ Database seeded successfully!")

if __name__ == "__main__":
    seed_data()